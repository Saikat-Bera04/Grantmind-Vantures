// While backend is inactive, force local Next.js API routes.
// If you later want to use an external backend (e.g., http://localhost:5000/api),
// set NEXT_PUBLIC_FORCE_EXTERNAL_API=true and NEXT_PUBLIC_API_BASE_URL accordingly.
const FORCE_EXTERNAL = process.env.NEXT_PUBLIC_FORCE_EXTERNAL_API === 'true'
const API_BASE = FORCE_EXTERNAL ? (process.env.NEXT_PUBLIC_API_BASE_URL || '') : ''

export async function submitProposal(formData: FormData): Promise<any> {
  const url = API_BASE ? `${API_BASE}/proposals` : `/api/proposals`
  const res = await fetch(url, {
    method: 'POST',
    body: formData,
  });
  const data = await res.json();
  return data;
}

export async function analyzeProposal(payload: { title: string; description: string; amount: number }) {
  const url = API_BASE ? `${API_BASE}/analysis` : `/api/analysis`
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function analyzeIdea(idea: string) {
  const url = API_BASE ? `${API_BASE}/analysis/idea` : `/api/analyze-idea`
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idea }),
  });
  return res.json();
}

export async function getTreasury() {
  const url = API_BASE ? `${API_BASE}/dao/treasury` : `/api/dao/treasury`
  const res = await fetch(url);
  return res.json();
}

export async function getProposals(params?: { page?: number; limit?: number }) {
  const pg = params?.page ?? 1;
  const lim = params?.limit ?? 10;
  const url = API_BASE ? `${API_BASE}/proposals?page=${pg}&limit=${lim}` : `/api/proposals?page=${pg}&limit=${lim}`
  const res = await fetch(url);
  return res.json();
}
