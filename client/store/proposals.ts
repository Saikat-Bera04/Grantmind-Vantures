import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type AIScore = { category: string; score: number }
export type ProposalItem = {
  _id?: string
  title: string
  description: string
  amount: number
  walletAddress?: string
  aiSummary?: string
  aiScores?: AIScore[]
  status?: 'submitted' | 'approved' | 'rejected' | 'funded'
  createdAt?: string
}

export type ProposalsState = {
  proposals: ProposalItem[]
  addProposal: (p: ProposalItem) => void
  setProposals: (items: ProposalItem[]) => void
  updateProposal: (id: string, patch: Partial<ProposalItem>) => void
  markStatus: (id: string, status: NonNullable<ProposalItem['status']>) => void
  clear: () => void
}

export const useProposalsStore = create<ProposalsState>()(
  persist(
    (
      set: (
        partial: Partial<ProposalsState> | ((state: ProposalsState) => Partial<ProposalsState>),
        replace?: boolean
      ) => void,
      get: () => ProposalsState
    ) => ({
      proposals: [],
      addProposal: (p: ProposalItem) =>
        set({
          proposals: [
            {
              ...p,
              _id:
                p._id ||
                (typeof crypto !== 'undefined' && 'randomUUID' in crypto
                  ? (crypto as any).randomUUID()
                  : Math.random().toString(36).slice(2)),
            },
            ...get().proposals,
          ],
        }),
      setProposals: (items: ProposalItem[]) => set({ proposals: items }),
      updateProposal: (id: string, patch: Partial<ProposalItem>) =>
        set({
          proposals: get().proposals.map((it) => (it._id === id ? { ...it, ...patch } : it)),
        }),
      markStatus: (id: string, status: NonNullable<ProposalItem['status']>) =>
        set({
          proposals: get().proposals.map((it) => (it._id === id ? { ...it, status } : it)),
        }),
      clear: () => set({ proposals: [] }),
    }),
    {
      name: 'gm-proposals',
      storage: createJSONStorage(() => localStorage),
      partialize: (state: ProposalsState) => ({ proposals: state.proposals }),
    }
  )
)
