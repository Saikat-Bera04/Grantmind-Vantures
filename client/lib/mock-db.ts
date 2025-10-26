// Simple in-memory store for proposals while backend is inactive.
// WARNING: Resets on dev server restart or deployment.
export type MemoryProposal = {
  _id: string
  title: string
  description: string
  amount: number
  walletAddress?: string
  aiSummary?: string
  aiScores?: { category: string; score: number }[]
  status?: string
  createdAt?: string
  hasFile?: boolean
}

const store: MemoryProposal[] = []

export function addProposal(p: MemoryProposal) {
  store.unshift(p)
}

export function listProposals(page = 1, limit = 10) {
  const start = (page - 1) * limit
  return {
    items: store.slice(start, start + limit),
    total: store.length,
    page,
  }
}

export function getProposal(id: string) {
  return store.find((p) => p._id === id) || null
}
