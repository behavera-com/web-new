type CalculatorPayload = {
  positions?: number;
  timeToHireDays?: number;
  estimatedAnnualCostCzk?: number;
  estimatedAnnualSavingCzk?: number;
};

type LeadBody = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  employees?: number;
  scores?: Array<{ label: string; score: number }>;
  overallScore?: number;
  source?: string;
  calculator?: CalculatorPayload;
};

function fmtCzk(n?: number) {
  if (typeof n !== "number") return "—";
  return Math.round(n).toLocaleString("cs-CZ").replace(/ /g, " ") + " Kč";
}

function buildSlackMessage(body: LeadBody): string {
  const { source } = body;

  if (source === "startupjobs") {
    const c = body.calculator ?? {};
    return (
      `📥 Nový lead z LP Behavera × StartupJobs!\n` +
      `Email: ${body.email ?? "neuvedeno"}\n` +
      `— ROI kalkulačka:\n` +
      `  • Otevřených pozic ročně: ${c.positions ?? "—"}\n` +
      `  • Time-to-hire: ${c.timeToHireDays ?? "—"} dní\n` +
      `  • Roční náklad pomalého náboru: ${fmtCzk(c.estimatedAnnualCostCzk)}\n` +
      `  • Potenciální úspora s Behaverou: ${fmtCzk(c.estimatedAnnualSavingCzk)}`
    );
  }

  if (source === "startupjobs-report") {
    return (
      `📄 Žádost o report zdarma (LP Behavera × StartupJobs)!\n` +
      `Email: ${body.email ?? "neuvedeno"}\n` +
      `Telefon: ${body.phone ?? "neuvedeno"}\n` +
      `Firma: ${body.company ?? "neuvedeno"}`
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
    calculator:
      r.calculator && typeof r.calculator === "object"
        ? (r.calculator as CalculatorPayload)
        : undefined,
  };

  const webhookUrl = process.env.WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: buildSlackMessage(body) }),
      });
    } catch (err) {
      console.error("Webhook failed:", err);
    }
  }

  return Response.json({ success: true });
}
