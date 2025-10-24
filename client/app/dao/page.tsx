"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function DAOPage() {
  const [isAdmin] = useState(true) // Mock admin status

  const daoStats = {
    treasury: 1250000,
    members: 342,
    proposals: 28,
    funded: 12,
  }

  const activityLog = [
    { id: 1, action: "Proposal Finalized", proposal: "AI Analytics Platform", status: "approved", date: "2024-01-20" },
    { id: 2, action: "Proposal Submitted", proposal: "DeFi Yield Optimizer", status: "pending", date: "2024-01-19" },
    { id: 3, action: "Proposal Finalized", proposal: "Web3 Education Hub", status: "rejected", date: "2024-01-18" },
    {
      id: 4,
      action: "Proposal Submitted",
      proposal: "Carbon Credit Marketplace",
      status: "pending",
      date: "2024-01-17",
    },
  ]

  const pendingProposals = [
    { id: 1, title: "AI Analytics Platform", votes: 45, status: "ready" },
    { id: 2, title: "DeFi Yield Optimizer", votes: 78, status: "ready" },
  ]

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20 md:pt-40 md:pb-32 container">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-sentient mb-4">DAO Dashboard</h1>
          <p className="font-mono text-foreground/60">Governance, treasury, and community management</p>
        </div>

        {/* Treasury Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <Card className="p-6 border border-border">
            <p className="font-mono text-xs text-foreground/60 mb-2">Treasury Balance</p>
            <p className="font-sentient text-2xl text-primary">{(daoStats.treasury / 1000000).toFixed(1)}M</p>
            <p className="font-mono text-xs text-foreground/40 mt-1">CELO</p>
          </Card>
          <Card className="p-6 border border-border">
            <p className="font-mono text-xs text-foreground/60 mb-2">DAO Members</p>
            <p className="font-sentient text-2xl">{daoStats.members}</p>
            <p className="font-mono text-xs text-foreground/40 mt-1">Active</p>
          </Card>
          <Card className="p-6 border border-border">
            <p className="font-mono text-xs text-foreground/60 mb-2">Total Proposals</p>
            <p className="font-sentient text-2xl">{daoStats.proposals}</p>
            <p className="font-mono text-xs text-foreground/40 mt-1">Submitted</p>
          </Card>
          <Card className="p-6 border border-border">
            <p className="font-mono text-xs text-foreground/60 mb-2">Funded Projects</p>
            <p className="font-sentient text-2xl text-green-400">{daoStats.funded}</p>
            <p className="font-mono text-xs text-foreground/40 mt-1">Completed</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Activity Log */}
          <div className="lg:col-span-2">
            <Card className="p-6 border border-border">
              <h2 className="font-sentient text-xl mb-6">Governance Activity</h2>
              <div className="space-y-4">
                {activityLog.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-start justify-between pb-4 border-b border-border last:border-0"
                  >
                    <div className="flex-1">
                      <p className="font-mono text-sm font-semibold mb-1">{log.action}</p>
                      <p className="font-mono text-xs text-foreground/60">{log.proposal}</p>
                    </div>
                    <div className="text-right">
                      <Badge
                        className={`mb-2 ${
                          log.status === "approved"
                            ? "bg-green-500/20 text-green-400"
                            : log.status === "rejected"
                              ? "bg-red-500/20 text-red-400"
                              : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {log.status}
                      </Badge>
                      <p className="font-mono text-xs text-foreground/40">{log.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Admin Panel */}
          <div>
            {isAdmin && (
              <Card className="p-6 border border-primary/50 bg-primary/5">
                <h2 className="font-sentient text-lg mb-4 text-primary">Admin Panel</h2>
                <p className="font-mono text-xs text-foreground/60 mb-6">Pending proposals ready for finalization</p>
                <div className="space-y-3">
                  {pendingProposals.map((proposal) => (
                    <div key={proposal.id} className="p-3 border border-border rounded">
                      <p className="font-mono text-sm mb-2">{proposal.title}</p>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1 text-xs h-8">
                          [Finalize]
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Member Role */}
            <Card className="p-6 border border-border mt-6">
              <h3 className="font-sentient text-lg mb-4">Your Role</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-mono text-xs text-foreground/60 mb-1">Status</p>
                  <Badge className="bg-blue-500/20 text-blue-400">{isAdmin ? "Admin" : "Member"}</Badge>
                </div>
                <div>
                  <p className="font-mono text-xs text-foreground/60 mb-1">Voting Power</p>
                  <p className="font-mono text-sm">100 votes</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
