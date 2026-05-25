type PipedriveColor =
  | "green"
  | "blue"
  | "red"
  | "yellow"
  | "purple"
  | "gray"
  | "brown";

type LeadLabel = { name: string; color: PipedriveColor };

type LeadInput = {
  title: string;
  personName: string;
  email?: string;
  phone?: string;
  companyName?: string;
  note?: string;
  labels?: LeadLabel[];
};

type PipedriveResult = { ok: boolean; leadId?: string; error?: string };

function getConfig() {
  const apiToken = process.env.PIPEDRIVE_API_TOKEN;
  const domain = process.env.PIPEDRIVE_DOMAIN;
  if (!apiToken || !domain) return null;
  return { apiToken, baseUrl: `https://${domain}.pipedrive.com/api/v1` };
}

async function pdFetch<T = unknown>(
  baseUrl: string,
  apiToken: string,
  path: string,
  init: RequestInit = {},
): Promise<{ ok: boolean; data?: T; error?: string }> {
  const url = `${baseUrl}${path}${path.includes("?") ? "&" : "?"}api_token=${encodeURIComponent(apiToken)}`;
  try {
    const res = await fetch(url, {
      ...init,
      headers: { "Content-Type": "application/json", ...(init.headers || {}) },
    });
    const body = (await res.json().catch(() => ({}))) as { data?: T; error?: string };
    if (!res.ok || (body as { success?: boolean }).success === false) {
      return { ok: false, error: body.error || `HTTP ${res.status}` };
    }
    return { ok: true, data: body.data };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "unknown" };
  }
}

/* ---------- Lead label cache (in-memory, per process) ---------- */

const labelCache = new Map<string, string>(); // name → id (UUID)

async function ensureLabelId(
  baseUrl: string,
  apiToken: string,
  label: LeadLabel,
): Promise<string | null> {
  const cached = labelCache.get(label.name);
  if (cached) return cached;

  const list = await pdFetch<Array<{ id: string; name: string; color: string }>>(
    baseUrl,
    apiToken,
    "/leadLabels",
  );
  if (list.ok && Array.isArray(list.data)) {
    for (const l of list.data) labelCache.set(l.name, l.id);
    const found = labelCache.get(label.name);
    if (found) return found;
  }

  const created = await pdFetch<{ id: string; name: string }>(
    baseUrl,
    apiToken,
    "/leadLabels",
    {
      method: "POST",
      body: JSON.stringify({ name: label.name, color: label.color }),
    },
  );
  if (created.ok && created.data?.id) {
    labelCache.set(label.name, created.data.id);
    return created.data.id;
  }
  return null;
}

/* ---------- Main entry ---------- */

export async function createLead(input: LeadInput): Promise<PipedriveResult> {
  const cfg = getConfig();
  if (!cfg) return { ok: false, error: "missing PIPEDRIVE_API_TOKEN/PIPEDRIVE_DOMAIN" };
  const { baseUrl, apiToken } = cfg;

  let orgId: number | undefined;
  if (input.companyName) {
    const org = await pdFetch<{ id: number }>(baseUrl, apiToken, "/organizations", {
      method: "POST",
      body: JSON.stringify({ name: input.companyName }),
    });
    if (org.ok && org.data?.id) orgId = org.data.id;
  }

  const personPayload: Record<string, unknown> = { name: input.personName };
  if (input.email) personPayload.email = [{ value: input.email, primary: true }];
  if (input.phone) personPayload.phone = [{ value: input.phone, primary: true }];
  if (orgId) personPayload.org_id = orgId;

  const person = await pdFetch<{ id: number }>(baseUrl, apiToken, "/persons", {
    method: "POST",
    body: JSON.stringify(personPayload),
  });
  if (!person.ok || !person.data?.id) {
    return { ok: false, error: `person: ${person.error}` };
  }

  const labelIds: string[] = [];
  if (input.labels?.length) {
    for (const label of input.labels) {
      const id = await ensureLabelId(baseUrl, apiToken, label);
      if (id) labelIds.push(id);
    }
  }

  const leadPayload: Record<string, unknown> = {
    title: input.title,
    person_id: person.data.id,
  };
  if (orgId) leadPayload.organization_id = orgId;
  if (labelIds.length) leadPayload.label_ids = labelIds;

  const lead = await pdFetch<{ id: string }>(baseUrl, apiToken, "/leads", {
    method: "POST",
    body: JSON.stringify(leadPayload),
  });
  if (!lead.ok || !lead.data?.id) {
    return { ok: false, error: `lead: ${lead.error}` };
  }

  if (input.note) {
    await pdFetch(baseUrl, apiToken, "/notes", {
      method: "POST",
      body: JSON.stringify({ content: input.note, lead_id: lead.data.id }),
    });
  }

  return { ok: true, leadId: lead.data.id };
}
