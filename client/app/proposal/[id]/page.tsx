"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useState } from "react"

export default function ProposalDetailPage({ params }: { params: { id: string } }) {
  const [hasVoted, setHasVoted] = useState(false)
  const [voteType, setVoteType] = useState<"approve" | "reject" | null>(null)

  // Mock proposal data
  const proposal = {
    id: params.id,
    title: "AI-Powered Analytics Platform",
    creator: "0x1234...5678",
    description:
      "A comprehensive analytics platform powered by AI that helps businesses make data-driven decisions. Our platform uses advanced machine learning algorithms to analyze large datasets and provide actionable insights.",
    aiScore: 92,
    status: "pending",
    approveVotes: 45,
    rejectVotes: 15,
    totalVotes: 100,
    amount: 50000,
    createdAt: "2024-01-15",
    details: {
      team: "3 members",
      timeline: "6 months",
      category: "AI/ML",
    },
  }

  const handleVote = (type: "approve" | "reject") => {
    setHasVoted(true)
    setVoteType(type)
  }

  const approvePercentage = (proposal.approveVotes / proposal.totalVotes) * 100
  const rejectPercentage = (proposal.rejectVotes / proposal.totalVotes) * 100

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20 md:pt-40 md:pb-32 container">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-4xl md:text-5xl font-sentient flex-1">{proposal.title}</h1>
              <Badge className="bg-yellow-500/20 text-yellow-400">{proposal.status}</Badge>
            </div>
            <p className="font-mono text-foreground/60">
              Submitted by {proposal.creator} on {proposal.createdAt}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <Card className="p-6 border border-border">
                <h2 className="font-sentient text-xl mb-4">Overview</h2>
                <p className="font-mono text-foreground/70 leading-relaxed">{proposal.description}</p>
              </Card>

              {/* Details */}
              <Card className="p-6 border border-border">
                <h2 className="font-sentient text-xl mb-4">Project Details</h2>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="font-mono text-xs text-foreground/60 mb-1">Team Size</p>
                    <p className="font-mono text-sm">{proposal.details.team}</p>
                  </div>
                  <div>
                    <p className="font-mono text-xs text-foreground/60 mb-1">Timeline</p>
                    <p className="font-mono text-sm">{proposal.details.timeline}</p>
                  </div>
                  <div>
                    <p className="font-mono text-xs text-foreground/60 mb-1">Category</p>
                    <p className="font-mono text-sm">{proposal.details.category}</p>
                  </div>
                </div>
              </Card>

              {/* AI Evaluation */}
              <Card className="p-6 border border-border">
                <h2 className="font-sentient text-xl mb-4">AI Evaluation</h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-mono text-sm">Impact Score</span>
                      <span className="font-mono text-sm text-primary font-bold">{proposal.aiScore}%</span>
                    </div>
                    <Progress value={proposal.aiScore} className="h-3" />
                  </div>
                  <p className="font-mono text-xs text-foreground/60 pt-2">
                    This proposal has been evaluated by our AI system and scored highly for potential impact and
                    feasibility.
                  </p>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Funding Info */}
              <Card className="p-6 border border-border">
                <h3 className="font-sentient text-lg mb-4">Funding</h3>
                <div className="mb-4">
                  <p className="font-mono text-xs text-foreground/60 mb-1">Requested Amount</p>
                  <p className="font-sentient text-2xl text-primary">{proposal.amount.toLocaleString()}</p>
                  <p className="font-mono text-xs text-foreground/60">CELO</p>
                </div>
              </Card>

              {/* Voting */}
              <Card className="p-6 border border-border">
                <h3 className="font-sentient text-lg mb-4">Community Vote</h3>

                <div className="space-y-4 mb-6">
                  {/* Approve */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-mono text-sm">Approve</span>
                      <span className="font-mono text-sm text-green-400">{proposal.approveVotes}</span>
                    </div>
                    <Progress value={approvePercentage} className="h-2 bg-green-500/20" />
                    <p className="font-mono text-xs text-foreground/40 mt-1">{approvePercentage.toFixed(0)}%</p>
                  </div>

                  {/* Reject */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-mono text-sm">Reject</span>
                      <span className="font-mono text-sm text-red-400">{proposal.rejectVotes}</span>
                    </div>
                    <Progress value={rejectPercentage} className="h-2 bg-red-500/20" />
                    <p className="font-mono text-xs text-foreground/40 mt-1">{rejectPercentage.toFixed(0)}%</p>
                  </div>
                </div>

                {/* Vote Buttons */}
                {!hasVoted ? (
                  <div className="space-y-3">
                    <Button
                      onClick={() => handleVote("approve")}
                      className="w-full bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/50"
                    >
                      [✅ Approve]
                    </Button>
                    <Button
                      onClick={() => handleVote("reject")}
                      className="w-full bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/50"
                    >
                      [❌ Reject]
                    </Button>
                  </div>
                ) : (
                  <div className="p-4 bg-primary/10 border border-primary/30 rounded text-center">
                    <p className="font-mono text-sm text-primary">
                      You voted to {voteType === "approve" ? "approve" : "reject"}
                    </p>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
