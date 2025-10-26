"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { useMemo, useState } from "react"
import { useProposalsStore, type ProposalItem } from "@/store/proposals"

export default function ProposalsPage() {
  const [filter, setFilter] = useState("all")
  const proposals = useProposalsStore((s: { proposals: ProposalItem[] }) => s.proposals)
  const filteredProposals = useMemo(() => {
    if (filter === 'all') return proposals
    return (proposals || []).filter((p) => (p.status || 'submitted') === filter)
  }, [proposals, filter])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-400"
      case "approved":
        return "bg-blue-500/20 text-blue-400"
      case "funded":
        return "bg-green-500/20 text-green-400"
      default:
        return "bg-foreground/10 text-foreground"
    }
  }

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20 md:pt-40 md:pb-32 container">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-sentient mb-4">Proposals</h1>
          <p className="font-mono text-foreground/60">Browse and vote on community proposals</p>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-12 flex-wrap">
          {["all", "submitted", "approved", "funded"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded border font-mono text-sm transition-colors ${
                filter === f
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-foreground/60 hover:text-foreground"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Proposals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProposals.length === 0 && (
            <p className="font-mono text-sm text-foreground/60">No proposals yet. Try adding one from Analysis or Submit pages.</p>
          )}
          {filteredProposals.map((proposal) => (
            <Link key={proposal._id} href={`/proposal/${proposal._id}`}>
              <Card className="p-6 border border-border hover:border-primary/50 transition-all cursor-pointer h-full">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-sentient text-xl flex-1">{proposal.title}</h3>
                  <Badge className={getStatusColor(proposal.status || 'submitted')}>{proposal.status || 'submitted'}</Badge>
                </div>

                <p className="font-mono text-sm text-foreground/60 mb-4">by {proposal.walletAddress || 'N/A'}</p>

                <p className="font-mono text-sm text-foreground/70 mb-6">{proposal.description}</p>

                <div className="space-y-4">
                  {/* AI Score */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-mono text-xs text-foreground/60">AI Score</span>
                      <span className="font-mono text-sm text-primary">{(proposal.aiScores?.[0]?.score ?? 0)}%</span>
                    </div>
                    <Progress value={(proposal.aiScores?.[0]?.score ?? 0)} className="h-2" />
                  </div>

                  {/* Placeholder for votes until wired to on-chain */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-mono text-xs text-foreground/60">Votes</span>
                      <span className="font-mono text-sm">N/A</span>
                    </div>
                    <Progress value={0} className="h-2" />
                  </div>

                  {/* Amount */}
                  <div className="flex justify-between pt-2 border-t border-border">
                    <span className="font-mono text-xs text-foreground/60">Requested</span>
                    <span className="font-mono text-sm text-primary">{Number(proposal.amount).toLocaleString()} CELO</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
