"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { useState } from "react"

export default function ProposalsPage() {
  const [filter, setFilter] = useState("all")

  const proposals = [
    {
      id: 1,
      title: "AI-Powered Analytics Platform",
      creator: "0x1234...5678",
      aiScore: 92,
      status: "pending",
      votes: 45,
      totalVotes: 100,
      amount: 50000,
      description: "A comprehensive analytics platform powered by AI",
    },
    {
      id: 2,
      title: "DeFi Yield Optimizer",
      creator: "0x8765...4321",
      aiScore: 87,
      status: "approved",
      votes: 78,
      totalVotes: 100,
      amount: 75000,
      description: "Optimize DeFi yields with machine learning",
    },
    {
      id: 3,
      title: "Web3 Education Hub",
      creator: "0x5555...6666",
      aiScore: 79,
      status: "pending",
      votes: 32,
      totalVotes: 100,
      amount: 30000,
      description: "Interactive learning platform for Web3 developers",
    },
    {
      id: 4,
      title: "Carbon Credit Marketplace",
      creator: "0x9999...0000",
      aiScore: 95,
      status: "funded",
      votes: 95,
      totalVotes: 100,
      amount: 100000,
      description: "Transparent carbon credit trading on blockchain",
    },
  ]

  const filteredProposals = filter === "all" ? proposals : proposals.filter((p) => p.status === filter)

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
          {["all", "pending", "approved", "funded"].map((f) => (
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
          {filteredProposals.map((proposal) => (
            <Link key={proposal.id} href={`/proposal/${proposal.id}`}>
              <Card className="p-6 border border-border hover:border-primary/50 transition-all cursor-pointer h-full">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-sentient text-xl flex-1">{proposal.title}</h3>
                  <Badge className={getStatusColor(proposal.status)}>{proposal.status}</Badge>
                </div>

                <p className="font-mono text-sm text-foreground/60 mb-4">by {proposal.creator}</p>

                <p className="font-mono text-sm text-foreground/70 mb-6">{proposal.description}</p>

                <div className="space-y-4">
                  {/* AI Score */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-mono text-xs text-foreground/60">AI Score</span>
                      <span className="font-mono text-sm text-primary">{proposal.aiScore}%</span>
                    </div>
                    <Progress value={proposal.aiScore} className="h-2" />
                  </div>

                  {/* Votes */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-mono text-xs text-foreground/60">Votes</span>
                      <span className="font-mono text-sm">
                        {proposal.votes}/{proposal.totalVotes}
                      </span>
                    </div>
                    <Progress value={(proposal.votes / proposal.totalVotes) * 100} className="h-2" />
                  </div>

                  {/* Amount */}
                  <div className="flex justify-between pt-2 border-t border-border">
                    <span className="font-mono text-xs text-foreground/60">Requested</span>
                    <span className="font-mono text-sm text-primary">{proposal.amount.toLocaleString()} CELO</span>
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
