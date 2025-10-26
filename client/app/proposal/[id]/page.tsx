"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from "react"
import { useAccount, useSendTransaction } from 'wagmi'
import { parseEther } from 'viem'

export default function ProposalDetailPage({ params }: { params: { id: string } }) {
  const [hasVoted, setHasVoted] = useState(false)
  const [voteType, setVoteType] = useState<"approve" | "reject" | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [proposal, setProposal] = useState<any | null>(null)
  const [fundAmount, setFundAmount] = useState("") // CELO amount as string
  const { address, isConnected } = useAccount()
  const { sendTransaction } = useSendTransaction()
  const DAO_TREASURY = process.env.NEXT_PUBLIC_DAO_ADDRESS || process.env.NEXT_PUBLIC_DAO_TREASURY || ""

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        // Reuse list API for simplicity; in real app add getProposal(id)
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api'}/proposals/${params.id}`)
        const data = await res.json()
        if (!data.ok) throw new Error(data.error || 'Failed to load')
        setProposal(data.proposal)
      } catch (e: any) {
        setError(e.message || 'Failed to load proposal')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [params.id])

  const handleVote = (type: "approve" | "reject") => {
    setHasVoted(true)
    setVoteType(type)
  }

  const approvePercentage = 0
  const rejectPercentage = 0

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20 md:pt-40 md:pb-32 container">
        {loading && <p className="font-mono text-sm text-foreground/60">Loading...</p>}
        {error && <p className="font-mono text-sm text-red-400">{error}</p>}
        {!loading && !error && proposal && (
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-4xl md:text-5xl font-sentient flex-1">{proposal.title}</h1>
              <Badge className="bg-yellow-500/20 text-yellow-400">{proposal.status || 'submitted'}</Badge>
            </div>
            <p className="font-mono text-foreground/60">
              Submitted by {proposal.walletAddress || 'N/A'} on {new Date(proposal.createdAt).toLocaleDateString()}
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
                    <p className="font-mono text-sm">{proposal?.details?.team ?? 'N/A'}</p>
                  </div>
                  <div>
                    <p className="font-mono text-xs text-foreground/60 mb-1">Timeline</p>
                    <p className="font-mono text-sm">{proposal?.details?.timeline ?? 'N/A'}</p>
                  </div>
                  <div>
                    <p className="font-mono text-xs text-foreground/60 mb-1">Category</p>
                    <p className="font-mono text-sm">{proposal?.details?.category ?? 'N/A'}</p>
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
                      <span className="font-mono text-sm text-primary font-bold">{(proposal.aiScores?.[0]?.score ?? 0)}%</span>
                    </div>
                    <Progress value={(proposal.aiScores?.[0]?.score ?? 0)} className="h-3" />
                  </div>
                  <p className="font-mono text-xs text-foreground/60 pt-2">
                    {proposal.aiSummary || 'This proposal has been evaluated by AI.'}
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
                  <p className="font-sentient text-2xl text-primary">{Number(proposal.amount).toLocaleString()}</p>
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

              {/* Fund This Proposal */}
              <Card className="p-6 border border-border">
                <h3 className="font-sentient text-lg mb-4">Fund This Proposal</h3>
                <div className="space-y-3">
                  {!DAO_TREASURY && (
                    <p className="font-mono text-xs text-red-400">Missing NEXT_PUBLIC_DAO_ADDRESS in env. Set it to enable funding.</p>
                  )}
                  <input
                    type="number"
                    step="0.0001"
                    placeholder="Amount in CELO"
                    value={fundAmount}
                    onChange={(e) => setFundAmount(e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-border rounded text-sm font-mono focus:outline-none focus:border-primary"
                  />
                  <Button
                    disabled={!isConnected || !DAO_TREASURY || !fundAmount || Number(fundAmount) <= 0}
                    onClick={() => {
                      if (!DAO_TREASURY) return
                      try {
                        sendTransaction({ to: DAO_TREASURY as `0x${string}`, value: parseEther(fundAmount) })
                      } catch (e) {
                        // ignore in UI, wallet will show errors
                      }
                    }}
                    className="w-full"
                  >
                    {isConnected ? '[💰 Fund with CELO]' : '[Connect Wallet to Fund]'}
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
        )}
      </section>

      <Footer />
    </main>
  )
}
