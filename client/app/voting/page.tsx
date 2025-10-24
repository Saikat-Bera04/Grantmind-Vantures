"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useState } from "react"

export default function VotingPage() {
  const [userVotes, setUserVotes] = useState<{ [key: number]: string }>({})
  const [votingPower] = useState(100)
  const [userVotingPower] = useState(100)

  const activeProposals = [
    {
      id: 1,
      title: "AI-Powered Analytics Platform",
      description:
        "A comprehensive analytics platform powered by AI to help DAO members analyze grant performance and impact metrics.",
      creator: "0x1234...5678",
      creatorName: "Alex Chen",
      startDate: "2024-01-15",
      endDate: "2024-01-29",
      votesFor: 45,
      votesAgainst: 12,
      votesAbstain: 8,
      totalVotes: 65,
      requiredQuorum: 50,
      fundingAmount: 50000,
      category: "Infrastructure",
    },
    {
      id: 2,
      title: "DeFi Yield Optimizer",
      description:
        "Optimize DeFi yields with machine learning algorithms to maximize treasury returns while minimizing risk exposure.",
      creator: "0x8765...4321",
      creatorName: "Sarah Johnson",
      startDate: "2024-01-16",
      endDate: "2024-01-30",
      votesFor: 78,
      votesAgainst: 5,
      votesAbstain: 3,
      totalVotes: 86,
      requiredQuorum: 50,
      fundingAmount: 75000,
      category: "Finance",
    },
    {
      id: 3,
      title: "Web3 Education Hub",
      description: "Interactive learning platform for Web3 developers with courses, tutorials, and hands-on projects.",
      creator: "0x5555...6666",
      creatorName: "Marcus Lee",
      startDate: "2024-01-17",
      endDate: "2024-01-31",
      votesFor: 32,
      votesAgainst: 18,
      votesAbstain: 5,
      totalVotes: 55,
      requiredQuorum: 50,
      fundingAmount: 30000,
      category: "Education",
    },
    {
      id: 4,
      title: "Carbon Credit Marketplace",
      description:
        "Transparent carbon credit trading platform on blockchain with real-time pricing and automated settlement.",
      creator: "0x9999...0000",
      creatorName: "Emma Wilson",
      startDate: "2024-01-18",
      endDate: "2024-02-01",
      votesFor: 95,
      votesAgainst: 2,
      votesAbstain: 1,
      totalVotes: 98,
      requiredQuorum: 50,
      fundingAmount: 100000,
      category: "Sustainability",
    },
  ]

  const votingHistory = [
    { id: 101, title: "NFT Marketplace Integration", vote: "For", date: "2024-01-10", status: "Passed" },
    { id: 102, title: "Community Treasury Allocation", vote: "For", date: "2024-01-08", status: "Passed" },
    { id: 103, title: "Governance Token Upgrade", vote: "Abstain", date: "2024-01-05", status: "Passed" },
    { id: 104, title: "Partnership with Protocol X", vote: "Against", date: "2024-01-02", status: "Failed" },
  ]

  const handleVote = (proposalId: number, voteType: string) => {
    setUserVotes((prev) => ({
      ...prev,
      [proposalId]: voteType,
    }))
  }

  const getVotePercentage = (votes: number, total: number) => {
    return total === 0 ? 0 : (votes / total) * 100
  }

  const getQuorumStatus = (totalVotes: number, requiredQuorum: number) => {
    return totalVotes >= requiredQuorum ? "Quorum Met" : "Quorum Pending"
  }

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20 md:pt-40 md:pb-32 container">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-sentient mb-4">DAO Voting</h1>
          <p className="font-mono text-foreground/60">Vote on proposals and shape the future of the DAO</p>
        </div>

        {/* Voting Power Card */}
        <Card className="p-6 border border-primary/50 bg-primary/5 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="font-mono text-xs text-foreground/60 mb-2">Your Voting Power</p>
              <p className="font-sentient text-3xl text-primary">{userVotingPower}</p>
              <p className="font-mono text-xs text-foreground/40 mt-1">votes available</p>
            </div>
            <div>
              <p className="font-mono text-xs text-foreground/60 mb-2">Total DAO Members</p>
              <p className="font-sentient text-3xl">342</p>
              <p className="font-mono text-xs text-foreground/40 mt-1">active participants</p>
            </div>
            <div>
              <p className="font-mono text-xs text-foreground/60 mb-2">Active Proposals</p>
              <p className="font-sentient text-3xl">{activeProposals.length}</p>
              <p className="font-mono text-xs text-foreground/40 mt-1">voting now</p>
            </div>
          </div>
        </Card>

        {/* Active Proposals */}
        <div className="mb-16">
          <h2 className="font-sentient text-2xl mb-8">Active Proposals</h2>
          <div className="space-y-6">
            {activeProposals.map((proposal) => {
              const forPercentage = getVotePercentage(proposal.votesFor, proposal.totalVotes)
              const againstPercentage = getVotePercentage(proposal.votesAgainst, proposal.totalVotes)
              const abstainPercentage = getVotePercentage(proposal.votesAbstain, proposal.totalVotes)
              const userVote = userVotes[proposal.id]

              return (
                <Card key={proposal.id} className="p-6 border border-border hover:border-primary/50 transition-all">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-sentient text-xl mb-2">{proposal.title}</h3>
                      <p className="font-mono text-sm text-foreground/60">
                        by {proposal.creatorName} ({proposal.creator})
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className="bg-blue-500/20 text-blue-400">{proposal.category}</Badge>
                      <Badge
                        className={
                          getQuorumStatus(proposal.totalVotes, proposal.requiredQuorum) === "Quorum Met"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }
                      >
                        {getQuorumStatus(proposal.totalVotes, proposal.requiredQuorum)}
                      </Badge>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="font-mono text-sm text-foreground/70 mb-6">{proposal.description}</p>

                  {/* Voting Results */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 pb-6 border-b border-border">
                    {/* For */}
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="font-mono text-xs text-foreground/60">For</span>
                        <span className="font-mono text-sm text-green-400">
                          {proposal.votesFor} ({forPercentage.toFixed(1)}%)
                        </span>
                      </div>
                      <Progress value={forPercentage} className="h-2 bg-green-500/20" />
                    </div>

                    {/* Against */}
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="font-mono text-xs text-foreground/60">Against</span>
                        <span className="font-mono text-sm text-red-400">
                          {proposal.votesAgainst} ({againstPercentage.toFixed(1)}%)
                        </span>
                      </div>
                      <Progress value={againstPercentage} className="h-2 bg-red-500/20" />
                    </div>

                    {/* Abstain */}
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="font-mono text-xs text-foreground/60">Abstain</span>
                        <span className="font-mono text-sm text-yellow-400">
                          {proposal.votesAbstain} ({abstainPercentage.toFixed(1)}%)
                        </span>
                      </div>
                      <Progress value={abstainPercentage} className="h-2 bg-yellow-500/20" />
                    </div>
                  </div>

                  {/* Proposal Details */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 pb-6 border-b border-border">
                    <div>
                      <p className="font-mono text-xs text-foreground/60 mb-1">Total Votes</p>
                      <p className="font-mono text-sm">{proposal.totalVotes}</p>
                    </div>
                    <div>
                      <p className="font-mono text-xs text-foreground/60 mb-1">Required Quorum</p>
                      <p className="font-mono text-sm">{proposal.requiredQuorum}</p>
                    </div>
                    <div>
                      <p className="font-mono text-xs text-foreground/60 mb-1">Funding Amount</p>
                      <p className="font-mono text-sm text-primary">{proposal.fundingAmount.toLocaleString()} CELO</p>
                    </div>
                    <div>
                      <p className="font-mono text-xs text-foreground/60 mb-1">Ends</p>
                      <p className="font-mono text-sm">{proposal.endDate}</p>
                    </div>
                  </div>

                  {/* Voting Buttons */}
                  <div className="flex gap-3">
                    <Button
                      onClick={() => handleVote(proposal.id, "For")}
                      className={`flex-1 ${
                        userVote === "For"
                          ? "bg-green-500 hover:bg-green-600 text-white"
                          : "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                      }`}
                    >
                      {userVote === "For" ? "✓ Voted For" : "Vote For"}
                    </Button>
                    <Button
                      onClick={() => handleVote(proposal.id, "Against")}
                      className={`flex-1 ${
                        userVote === "Against"
                          ? "bg-red-500 hover:bg-red-600 text-white"
                          : "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                      }`}
                    >
                      {userVote === "Against" ? "✓ Voted Against" : "Vote Against"}
                    </Button>
                    <Button
                      onClick={() => handleVote(proposal.id, "Abstain")}
                      className={`flex-1 ${
                        userVote === "Abstain"
                          ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                          : "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
                      }`}
                    >
                      {userVote === "Abstain" ? "✓ Abstained" : "Abstain"}
                    </Button>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Voting History */}
        <div>
          <h2 className="font-sentient text-2xl mb-8">Your Voting History</h2>
          <Card className="p-6 border border-border">
            <div className="space-y-4">
              {votingHistory.map((vote) => (
                <div
                  key={vote.id}
                  className="flex items-center justify-between pb-4 border-b border-border last:border-0"
                >
                  <div className="flex-1">
                    <p className="font-mono text-sm font-semibold mb-1">{vote.title}</p>
                    <p className="font-mono text-xs text-foreground/60">{vote.date}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge
                      className={
                        vote.vote === "For"
                          ? "bg-green-500/20 text-green-400"
                          : vote.vote === "Against"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-yellow-500/20 text-yellow-400"
                      }
                    >
                      {vote.vote}
                    </Badge>
                    <Badge
                      className={
                        vote.status === "Passed" ? "bg-blue-500/20 text-blue-400" : "bg-red-500/20 text-red-400"
                      }
                    >
                      {vote.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </main>
  )
}
