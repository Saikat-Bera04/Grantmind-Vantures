"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { generatePDF } from "@/lib/pdf-generator"

const analysisData = [
  { category: "Market Fit", score: 85 },
  { category: "Team Quality", score: 78 },
  { category: "Innovation", score: 92 },
  { category: "Scalability", score: 88 },
  { category: "Risk Level", score: 45 },
]

const projectionData = [
  { month: 1, revenue: 10000, users: 500 },
  { month: 2, revenue: 25000, users: 1200 },
  { month: 3, revenue: 45000, users: 2500 },
  { month: 4, revenue: 75000, users: 4200 },
  { month: 5, revenue: 120000, users: 6800 },
  { month: 6, revenue: 180000, users: 10000 },
]

export default function Analysis() {
  const [showReport, setShowReport] = useState(false)

  const projectData = {
    name: "AI-Powered Grant Matching Platform",
    description: "Intelligent system that matches projects with suitable funding opportunities",
    budget: "150000",
    timeline: "6",
  }

  const handleDownloadPDF = () => {
    generatePDF(projectData, analysisData, projectionData)
  }

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-12 container">
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-sentient mb-4">AI Analysis</h1>
          <p className="text-foreground/60 font-mono">
            Get AI-powered analysis and detailed reports for your projects.
          </p>
        </div>

        {!showReport ? (
          <div className="max-w-2xl mx-auto">
            <Card className="p-12 text-center">
              <h2 className="text-3xl font-sentient mb-4">Ready to Analyze Your Project?</h2>
              <p className="text-foreground/60 font-mono mb-8">
                Submit your project details and our AI will provide comprehensive analysis with market insights, team
                evaluation, and financial projections.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/submit">
                  <Button size="lg">[📝 Submit a Project]</Button>
                </Link>
                <Button onClick={() => setShowReport(true)} variant="outline" size="lg">
                  [📊 View Sample Report]
                </Button>
              </div>
            </Card>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Summary Card */}
            <Card className="p-6">
              <h3 className="text-xl font-sentient mb-4">Analysis Summary</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-foreground/60 font-mono text-sm mb-1">Overall Score</p>
                  <p className="text-3xl font-sentient text-primary">82/100</p>
                </div>
                <div>
                  <p className="text-foreground/60 font-mono text-sm mb-1">Recommendation</p>
                  <p className="text-lg font-sentient text-green-400">Highly Recommended</p>
                </div>
              </div>
              <p className="text-foreground/70 font-mono text-sm leading-relaxed">
                This project demonstrates strong market potential with an innovative approach. The team shows solid
                execution capability, and the timeline is realistic. Risk assessment indicates manageable challenges
                with clear mitigation strategies.
              </p>
            </Card>

            {/* Metrics Chart */}
            <Card className="p-6">
              <h3 className="text-xl font-sentient mb-6">Evaluation Metrics</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analysisData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,215,0,0.1)" />
                  <XAxis dataKey="category" stroke="rgba(255,255,255,0.5)" angle={-45} textAnchor="end" height={80} />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", border: "1px solid #ffc700" }} />
                  <Bar dataKey="score" fill="#ffc700" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Projection Chart */}
            <Card className="p-6">
              <h3 className="text-xl font-sentient mb-6">6-Month Projection</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={projectionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,215,0,0.1)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", border: "1px solid #ffc700" }} />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#ffc700" strokeWidth={2} name="Revenue ($)" />
                  <Line type="monotone" dataKey="users" stroke="#ff9500" strokeWidth={2} name="Users" />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Download and Back Buttons */}
            <div className="flex gap-4">
              <Button onClick={handleDownloadPDF} className="flex-1" size="lg">
                [📥 Download PDF Report]
              </Button>
              <Button onClick={() => setShowReport(false)} variant="outline" className="flex-1" size="lg">
                [← Back]
              </Button>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}
