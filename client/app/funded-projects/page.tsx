"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const fundedProjects = [
  {
    id: 1,
    name: "AI-Powered Grant Matching",
    description: "Intelligent system that matches projects with suitable funding opportunities using machine learning.",
    fundingGoal: 150000,
    fundingRaised: 142500,
    fundedBy: 234,
    category: "AI/ML",
    status: "Active",
    image: "🤖",
  },
  {
    id: 2,
    name: "Decentralized Voting Platform",
    description: "Secure blockchain-based voting system for transparent DAO governance and decision-making.",
    fundingGoal: 200000,
    fundingRaised: 198000,
    fundedBy: 456,
    category: "Blockchain",
    status: "Active",
    image: "🗳️",
  },
  {
    id: 3,
    name: "Community Grant Dashboard",
    description: "Real-time analytics dashboard for tracking grant distribution and impact metrics across communities.",
    fundingGoal: 100000,
    fundingRaised: 100000,
    fundedBy: 189,
    category: "Analytics",
    status: "Completed",
    image: "📊",
  },
  {
    id: 4,
    name: "Web3 Education Initiative",
    description: "Comprehensive educational platform teaching blockchain and Web3 technologies to developers.",
    fundingGoal: 120000,
    fundingRaised: 95400,
    fundedBy: 312,
    category: "Education",
    status: "Active",
    image: "📚",
  },
  {
    id: 5,
    name: "Sustainable Impact Tracker",
    description: "Track and measure environmental and social impact of funded projects with real-time metrics.",
    fundingGoal: 80000,
    fundingRaised: 76200,
    fundedBy: 145,
    category: "Impact",
    status: "Active",
    image: "🌱",
  },
  {
    id: 6,
    name: "Developer Tools Suite",
    description: "Open-source tools and libraries for building on decentralized platforms and Web3 applications.",
    fundingGoal: 180000,
    fundingRaised: 165300,
    fundedBy: 278,
    category: "Developer Tools",
    status: "Active",
    image: "🛠️",
  },
]

export default function FundedProjects() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [fundAmount, setFundAmount] = useState("")

  const handleFund = (projectId: number) => {
    if (fundAmount && Number.parseFloat(fundAmount) > 0) {
      alert(`Successfully funded $${fundAmount} to project ${projectId}!`)
      setFundAmount("")
      setSelectedProject(null)
    }
  }

  const totalFunded = fundedProjects.reduce((sum, p) => sum + p.fundingRaised, 0)
  const totalFunders = fundedProjects.reduce((sum, p) => sum + p.fundedBy, 0)

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-12 container">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-sentient mb-4">Funded Projects</h1>
          <p className="text-foreground/60 font-mono">
            Discover and support innovative projects funded by our DAO community.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6">
            <p className="text-foreground/60 font-mono text-sm mb-2">Total Funded</p>
            <p className="text-3xl font-sentient text-primary">${(totalFunded / 1000000).toFixed(1)}M</p>
          </Card>
          <Card className="p-6">
            <p className="text-foreground/60 font-mono text-sm mb-2">Active Projects</p>
            <p className="text-3xl font-sentient text-primary">
              {fundedProjects.filter((p) => p.status === "Active").length}
            </p>
          </Card>
          <Card className="p-6">
            <p className="text-foreground/60 font-mono text-sm mb-2">Total Funders</p>
            <p className="text-3xl font-sentient text-primary">{totalFunders.toLocaleString()}</p>
          </Card>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fundedProjects.map((project) => {
            const fundingPercentage = (project.fundingRaised / project.fundingGoal) * 100
            const isSelected = selectedProject === project.id

            return (
              <Card key={project.id} className="p-6 flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{project.image}</div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-mono ${
                      project.status === "Completed" ? "bg-green-500/20 text-green-400" : "bg-primary/20 text-primary"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                <h3 className="text-lg font-sentient mb-2">{project.name}</h3>
                <p className="text-foreground/60 font-mono text-sm mb-4 flex-grow">{project.description}</p>

                {/* Category */}
                <div className="mb-4">
                  <span className="inline-block px-2 py-1 bg-background border border-border rounded text-xs font-mono text-foreground/70">
                    {project.category}
                  </span>
                </div>

                {/* Funding Progress */}
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-mono text-foreground/60">Funding Progress</span>
                    <span className="text-sm font-mono text-primary">{fundingPercentage.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-background border border-border rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(fundingPercentage, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-xs font-mono text-foreground/50">
                    <span>${project.fundingRaised.toLocaleString()}</span>
                    <span>${project.fundingGoal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Funders Count */}
                <p className="text-xs font-mono text-foreground/60 mb-4">
                  Funded by {project.fundedBy.toLocaleString()} supporters
                </p>

                {/* Fund Button */}
                {isSelected ? (
                  <div className="space-y-2">
                    <input
                      type="number"
                      placeholder="Amount to fund ($)"
                      value={fundAmount}
                      onChange={(e) => setFundAmount(e.target.value)}
                      className="w-full px-3 py-2 bg-background border border-border rounded text-sm font-mono focus:outline-none focus:border-primary"
                    />
                    <div className="flex gap-2">
                      <Button onClick={() => handleFund(project.id)} className="flex-1 text-sm">
                        [Fund]
                      </Button>
                      <Button onClick={() => setSelectedProject(null)} variant="outline" className="flex-1 text-sm">
                        [Cancel]
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button onClick={() => setSelectedProject(project.id)} className="w-full">
                    [💰 Fund Project]
                  </Button>
                )}
              </Card>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card className="p-8 bg-gradient-to-r from-primary/10 to-primary/5">
            <h2 className="text-3xl font-sentient mb-4">Have a Project Idea?</h2>
            <p className="text-foreground/60 font-mono mb-6 max-w-2xl mx-auto">
              Submit your project for AI analysis and get it in front of our DAO community for funding.
            </p>
            <Link href="/submit">
              <Button size="lg">[🚀 Submit Your Project]</Button>
            </Link>
          </Card>
        </div>
      </section>

      <Footer />
    </main>
  )
}
