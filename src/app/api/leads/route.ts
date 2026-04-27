export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, phone, company, employees, scores, overallScore } = body;

  // Send to Slack webhook if configured
  const webhookUrl = process.env.WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text:
            `🎯 Nový lead z HR Risk Scanner!\n` +
            `Jméno: ${name}\n` +
            `Email: ${email}\n` +
            `Telefon: ${phone || "neuvedeno"}\n` +
            `Firma: ${company}\n` +
            `Zaměstnanců: ${employees}\n` +
            `Celkové riziko: ${overallScore}/100\n` +
            `Top riziko: ${scores?.[0]?.label ?? "N/A"} (${scores?.[0]?.score ?? "N/A"}/100)`,
        }),
      });
    } catch (err) {
      console.error("Webhook failed:", err);
    }
  }

  return Response.json({ success: true });
}
