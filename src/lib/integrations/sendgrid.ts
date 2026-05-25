type Attachment = {
  filename: string;
  contentBase64: string;
  type: string;
};

type SendArgs = {
  to: string;
  toName?: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  attachments?: Attachment[];
};

const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || "hello@behavera.com";
const FROM_NAME = process.env.SENDGRID_FROM_NAME || "Behavera";

export async function sendEmail(args: SendArgs): Promise<{ ok: boolean; status?: number; error?: string }> {
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) {
    return { ok: false, error: "missing SENDGRID_API_KEY" };
  }

  const payload = {
    personalizations: [
      {
        to: [{ email: args.to, ...(args.toName ? { name: args.toName } : {}) }],
        subject: args.subject,
      },
    ],
    from: { email: FROM_EMAIL, name: FROM_NAME },
    ...(args.replyTo ? { reply_to: { email: args.replyTo } } : {}),
    content: [
      ...(args.text ? [{ type: "text/plain", value: args.text }] : []),
      { type: "text/html", value: args.html },
    ],
    ...(args.attachments?.length
      ? {
          attachments: args.attachments.map((a) => ({
            content: a.contentBase64,
            filename: a.filename,
            type: a.type,
            disposition: "attachment",
          })),
        }
      : {}),
  };

  try {
    const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      return { ok: false, status: res.status, error: body.slice(0, 500) };
    }
    return { ok: true, status: res.status };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "unknown" };
  }
}
