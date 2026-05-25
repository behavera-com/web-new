import { readFile } from "node:fs/promises";
import path from "node:path";
import { sendEmail } from "@/lib/integrations/sendgrid";
import { createLead } from "@/lib/integrations/pipedrive";
import {
  autoReplyEmail,
  internalEmail,
  pipedriveLeadInput,
} from "@/lib/integrations/email-templates";
import type { ConsultPayload, LeadBody } from "@/lib/integrations/lead-types";

const STARTUPJOBS_SOURCES = new Set([
  "startupjobs-consult",
  "startupjobs-report",
]);

const INTERNAL_NOTIFICATION_TO = "david.skoupy@behavera.com";
const REPORT_PDF_PATH = "public/startupjobs/behavera-report-sample.pdf";

let cachedReportPdf: string | null = null;
async function loadReportPdfBase64(): Promise<string | null> {
  if (cachedReportPdf) return cachedReportPdf;
  try {
    const filePath = path.join(process.cwd(), REPORT_PDF_PATH);
    const buf = await readFile(filePath);
    cachedReportPdf = buf.toString("base64");
    return cachedReportPdf;
  } catch (err) {
    console.error("[leads] failed to load report PDF:", err);
    return null;
  }
}

function buildSlackMessage(body: LeadBody): string {
  const { source } = body;

  if (source === "startupjobs-report") {
    return (
      `📄 Žádost o report zdarma (LP Behavera + StartupJobs)!\n` +
      `Jméno: ${body.name ?? "neuvedeno"}\n` +
      `Email: ${body.email ?? "neuvedeno"}\n` +
      `Telefon: ${body.phone ?? "neuvedeno"}\n` +
      `Firma: ${body.company ?? "neuvedeno"}`
    );
  }

  if (source === "startupjobs-consult") {
    const c = body.consult ?? {};
    return (
      `🔥 Žádost o konzultaci (LP Behavera + StartupJobs)!\n` +
      `Jméno: ${body.name ?? "neuvedeno"}\n` +
      `Email: ${body.email ?? "neuvedeno"}\n` +
      `Telefon: ${body.phone ?? "neuvedeno"}\n` +
      `Firma: ${body.company ?? "neuvedeno"}\n` +
      `Zaměstnanců: ${c.employees ?? "—"}\n` +
      `Náborů ročně: ${c.hiresPerYear ?? "—"}` +
      (c.message ? `\n— Zpráva:\n${c.message}` : "")
    );
  }

  return (
    `🎯 Nový lead z HR Risk Scanner!\n` +
    `Jméno: ${body.name ?? "neuvedeno"}\n` +
    `Email: ${body.email ?? "neuvedeno"}\n` +
    `Telefon: ${body.phone || "neuvedeno"}\n` +
    `Firma: ${body.company ?? "neuvedeno"}\n` +
    `Zaměstnanců: ${body.employees ?? "—"}\n` +
    `Celkové riziko: ${body.overallScore ?? "—"}/100\n` +
    `Top riziko: ${body.scores?.[0]?.label ?? "N/A"} (${body.scores?.[0]?.score ?? "N/A"}/100)`
  );
}

function sanitize(value: unknown, max = 200): string | undefined {
  if (typeof value !== "string") return undefined;
  return value.replace(/[\r\n\t]+/g, " ").trim().slice(0, max);
}

function sanitizeMultiline(value: unknown, max = 1000): string | undefined {
  if (typeof value !== "string") return undefined;
  return value.replace(/\r/g, "").trim().slice(0, max);
}

function sanitizeConsult(v: unknown): ConsultPayload | undefined {
  if (!v || typeof v !== "object") return undefined;
  const r = v as Record<string, unknown>;
  return {
    employees: typeof r.employees === "number" ? r.employees : undefined,
    hiresPerYear: typeof r.hiresPerYear === "number" ? r.hiresPerYear : undefined,
    message: sanitizeMultiline(r.message, 1000),
  };
}

async function sendSlack(body: LeadBody) {
  const webhookUrl = process.env.WEBHOOK_URL;
  if (!webhookUrl) return;
  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: buildSlackMessage(body) }),
    });
  } catch (err) {
    console.error("[leads] Slack webhook failed:", err);
  }
}

async function sendInternalNotification(body: LeadBody) {
  const { subject, html, text } = internalEmail(body);
  const res = await sendEmail({
    to: INTERNAL_NOTIFICATION_TO,
    subject,
    html,
    text,
    replyTo: body.email,
  });
  if (!res.ok) console.error("[leads] internal email failed:", res.error);
}

async function sendAutoReply(body: LeadBody) {
  const tpl = autoReplyEmail(body);
  if (!tpl || !body.email) return;

  const attachments = [];
  if (body.source === "startupjobs-report") {
    const pdf = await loadReportPdfBase64();
    if (pdf) {
      attachments.push({
        filename: "behavera-report-sample.pdf",
        contentBase64: pdf,
        type: "application/pdf",
      });
    }
  }

  const res = await sendEmail({
    to: body.email,
    toName: body.name,
    subject: tpl.subject,
    html: tpl.html,
    text: tpl.text,
    replyTo: INTERNAL_NOTIFICATION_TO,
    attachments: attachments.length ? attachments : undefined,
  });
  if (!res.ok) console.error("[leads] auto-reply failed:", res.error);
}

async function pushPipedrive(body: LeadBody) {
  const input = pipedriveLeadInput(body);
  if (!input) return;
  const res = await createLead(input);
  if (!res.ok) console.error("[leads] pipedrive failed:", res.error);
}

export async function POST(req: Request) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return Response.json({ success: false, error: "invalid json" }, { status: 400 });
  }
  if (!raw || typeof raw !== "object") {
    return Response.json({ success: false, error: "invalid body" }, { status: 400 });
  }
  const r = raw as Record<string, unknown>;
  const body: LeadBody = {
    name: sanitize(r.name),
    email: sanitize(r.email),
    phone: sanitize(r.phone),
    company: sanitize(r.company),
    employees: typeof r.employees === "number" ? r.employees : undefined,
    scores: Array.isArray(r.scores) ? (r.scores as LeadBody["scores"]) : undefined,
    overallScore: typeof r.overallScore === "number" ? r.overallScore : undefined,
    source: sanitize(r.source, 50),
    consult: sanitizeConsult(r.consult),
    event_id: sanitize(r.event_id, 64),
  };

  const isStartupjobs = body.source ? STARTUPJOBS_SOURCES.has(body.source) : false;

  const tasks: Array<Promise<unknown>> = [sendSlack(body)];

  if (isStartupjobs) {
    tasks.push(sendInternalNotification(body));
    tasks.push(sendAutoReply(body));
    tasks.push(pushPipedrive(body));
  }

  await Promise.allSettled(tasks);

  return Response.json({ success: true, event_id: body.event_id });
}
