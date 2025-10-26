const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api';

export async function submitProposal(formData: FormData): Promise<any> {
  const res = await fetch(`${BASE_URL}/proposals`, {
    method: 'POST',
    body: formData,
  });
  const data = await res.json();
  return data;
}

export async function analyzeProposal(payload: { title: string; description: string; amount: number }) {
  const res = await fetch(`${BASE_URL}/analysis`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function analyzeIdea(idea: string) {
  const res = await fetch(`${BASE_URL}/analysis/idea`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idea }),
  });
  return res.json();
}

export async function getTreasury() {
  const res = await fetch(`${BASE_URL}/dao/treasury`);
  return res.json();
}

export async function getProposals(params?: { page?: number; limit?: number }) {
  const pg = params?.page ?? 1;
  const lim = params?.limit ?? 10;
  const res = await fetch(`${BASE_URL}/proposals?page=${pg}&limit=${lim}`);
  return res.json();
}
