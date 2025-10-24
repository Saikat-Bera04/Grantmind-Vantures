"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const dashboardStats = [
  { label: "Total Proposals", value: "1,234", change: "+12%" },
  { label: "Active Grants", value: "45", change: "+3%" },
  { label: "Total Funded", value: "$2.5M", change: "+28%" },
  { label: "Success Rate", value: "68%", change: "+5%" },
]

const proposalData = [
  { month: "Jan", proposals: 120, funded: 85 },
  { month: "Feb", proposals: 150, funded: 102 },
  { month: "Mar", proposals: 180, funded: 125 },
  { month: "Apr", proposals: 165, funded: 110 },
  { month: "May", proposals: 200, funded: 145 },
  { month: "Jun", proposals: 220, funded: 165 },
]

const categoryData = [
  { name: "AI/ML", value: 35 },
  { name: "DeFi", value: 25 },
  { name: "Infrastructure", value: 20 },
  { name: "Gaming", value: 15 },
  { name: "Other", value: 5 },
]

const COLORS = ["#ffc700", "#ff9500", "#ff6b6b", "#4ecdc4", "#95e1d3"]

const recentProposals = [
  { id: 1, title: "AI-Powered Analytics Platform", status: "Approved", amount: "$150K", date: "2 days ago" },
  { id: 2, title: "DeFi Yield Optimizer", status: "Pending", amount: "$200K", date: "5 days ago" },
  { id: 3, title: "Web3 Gaming Engine", status: "Approved", amount: "$100K", date: "1 week ago" },
  { id: 4, title: "Blockchain Infrastructure", status: "Rejected", amount: "$250K", date: "2 weeks ago" },
]

export default function Dashboard() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-12 container">
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-sentient mb-4">Dashboard</h1>
          <p className="text-foreground/60 font-mono">Track proposals, grants, and funding metrics in real-time.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {dashboardStats.map((stat, idx) => (
            <Card key={idx} className="p-6">
              <p className="text-foreground/60 font-mono text-sm mb-2">{stat.label}</p>
              <p className="text-3xl font-sentient mb-2">{stat.value}</p>
              <p className="text-primary font-mono text-xs">{stat.change}</p>
            </Card>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Proposals Over Time */}
          <Card className="lg:col-span-2 p-6">
            <h3 className="text-xl font-sentient mb-6">Proposals & Funding Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={proposalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,215,0,0.1)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", border: "1px solid #ffc700" }} />
                <Legend />
                <Line type="monotone" dataKey="proposals" stroke="#ffc700" strokeWidth={2} />
                <Line type="monotone" dataKey="funded" stroke="#ff9500" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Category Distribution */}
          <Card className="p-6">
            <h3 className="text-xl font-sentient mb-6">By Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", border: "1px solid #ffc700" }} />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Recent Proposals */}
        <Card className="p-6 mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-sentient">Recent Proposals</h3>
            <Link href="/proposals">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </div>
          <div className="space-y-4">
            {recentProposals.map((proposal) => (
              <div
                key={proposal.id}
                className="flex items-center justify-between p-4 border border-border/50 rounded-lg hover:border-primary/50 transition-colors"
              >
                <div>
                  <p className="font-mono font-semibold">{proposal.title}</p>
                  <p className="text-sm text-foreground/60 font-mono">{proposal.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-mono ${
                      proposal.status === "Approved"
                        ? "bg-green-500/20 text-green-400"
                        : proposal.status === "Pending"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {proposal.status}
                  </span>
                  <p className="font-mono font-semibold text-primary">{proposal.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/submit">
            <Button className="w-full" size="lg">
              [🚀 Submit Proposal]
            </Button>
          </Link>
          <Link href="/analysis">
            <Button className="w-full bg-transparent" size="lg" variant="outline">
              [📊 AI Analysis]
            </Button>
          </Link>
          <Link href="/dao">
            <Button className="w-full bg-transparent" size="lg" variant="outline">
              [🏛️ DAO Governance]
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
