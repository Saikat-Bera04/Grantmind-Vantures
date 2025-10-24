"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function ProfilePage() {
  const userStats = {
    wallet: "0x1234...5678",
    tokens: 2500,
    proposals: 3,
    votes: 28,
  }

  const userProposals = [
    {
      id: 1,
      title: "AI Analytics Platform",
      status: "approved",
      aiScore: 92,
      votes: 78,
      amount: 50000,
    },
    {
      id: 2,
      title: "Data Visualization Tool",
      status: "pending",
      aiScore: 85,
      votes: 45,
      amount: 35000,
    },
    {
      id: 3,
      title: "Smart Contract Auditor",
      status: "funded",
      aiScore: 88,
      votes: 92,
      amount: 60000,
    },
  ]

  const votingHistory = [
    { id: 1, proposal: "Web3 Education Hub", vote: "approve", date: "2024-01-20" },
    { id: 2, proposal: "Carbon Credit Marketplace", vote: "approve", date: "2024-01-19" },
    { id: 3, proposal: "DeFi Yield Optimizer", vote: "reject", date: "2024-01-18" },
  ]

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20 md:pt-40 md:pb-32 container">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-sentient mb-4">Your Profile</h1>
          <p className="font-mono text-foreground/60">Track your proposals and voting activity</p>
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <Card className="p-6 border border-border">
            <p className="font-mono text-xs text-foreground/60 mb-2">Wallet Address</p>
            <p className="font-mono text-sm font-mono">{userStats.wallet}</p>
          </Card>
          <Card className="p-6 border border-border">
            <p className="font-mono text-xs text-foreground/60 mb-2">$GRANT Tokens</p>
            <p className="font-sentient text-2xl text-primary">{userStats.tokens.toLocaleString()}</p>
          </Card>
          <Card className="p-6 border border-border">
            <p className="font-mono text-xs text-foreground/60 mb-2">Proposals</p>
            <p className="font-sentient text-2xl">{userStats.proposals}</p>
          </Card>
          <Card className="p-6 border border-border">
            <p className="font-mono text-xs text-foreground/60 mb-2">Votes Cast</p>
            <p className="font-sentient text-2xl">{userStats.votes}</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Your Proposals */}
          <div className="lg:col-span-2">
            <Card className="p-6 border border-border">
              <h2 className="font-sentient text-xl mb-6">Your Proposals</h2>
              <div className="space-y-4">
                {userProposals.map((proposal) => (
                  <div
                    key={proposal.id}
                    className="p-4 border border-border rounded hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-mono text-sm font-semibold flex-1">{proposal.title}</h3>
                      <Badge
                        className={`${
                          proposal.status === "approved"
                            ? "bg-green-500/20 text-green-400"
                            : proposal.status === "funded"
                              ? "bg-blue-500/20 text-blue-400"
                              : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {proposal.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-xs">
                      <div>
                        <p className="text-foreground/60 mb-1">AI Score</p>
                        <div className="flex items-center gap-2">
                          <Progress value={proposal.aiScore} className="h-1 flex-1" />
                          <span className="text-primary font-mono">{proposal.aiScore}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-foreground/60 mb-1">Votes</p>
                        <p className="font-mono">{proposal.votes}</p>
                      </div>
                      <div>
                        <p className="text-foreground/60 mb-1">Amount</p>
                        <p className="font-mono text-primary">{proposal.amount.toLocaleString()} CELO</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Voting History */}
          <div>
            <Card className="p-6 border border-border">
              <h2 className="font-sentient text-lg mb-6">Voting History</h2>
              <div className="space-y-4">
                {votingHistory.map((vote) => (
                  <div key={vote.id} className="pb-4 border-b border-border last:border-0">
                    <p className="font-mono text-sm mb-2">{vote.proposal}</p>
                    <div className="flex items-center justify-between">
                      <Badge
                        className={
                          vote.vote === "approve" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                        }
                      >
                        {vote.vote === "approve" ? "✅ Approved" : "❌ Rejected"}
                      </Badge>
                      <p className="font-mono text-xs text-foreground/40">{vote.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
