"use client"

import type React from "react"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export default function SubmitPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
    file: null as File | null,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false)
      alert("Proposal submitted successfully!")
      setFormData({ title: "", description: "", amount: "", file: null })
    }, 2000)
  }

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20 md:pt-40 md:pb-32 container">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-sentient mb-4">Submit Your Proposal</h1>
          <p className="font-mono text-foreground/60 mb-12">
            Share your innovative idea and let the DAO community evaluate and fund it.
          </p>

          <Card className="p-8 border border-border">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <Label htmlFor="title" className="font-mono text-sm mb-2 block">
                  Project Title
                </Label>
                <Input
                  id="title"
                  placeholder="Enter your project title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="border-border"
                />
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description" className="font-mono text-sm mb-2 block">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe your project, goals, and impact"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={6}
                  className="border-border"
                />
              </div>

              {/* Requested Amount */}
              <div>
                <Label htmlFor="amount" className="font-mono text-sm mb-2 block">
                  Requested Amount (CELO)
                </Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  required
                  className="border-border"
                />
              </div>

              {/* File Upload */}
              <div>
                <Label htmlFor="file" className="font-mono text-sm mb-2 block">
                  Whitepaper or Documentation
                </Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <input
                    id="file"
                    type="file"
                    onChange={(e) => setFormData({ ...formData, file: e.target.files?.[0] || null })}
                    className="hidden"
                  />
                  <label htmlFor="file" className="cursor-pointer">
                    <p className="font-mono text-sm text-foreground/60">
                      {formData.file ? formData.file.name : "Click to upload or drag and drop"}
                    </p>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "[Submitting...]" : "[Submit Proposal]"}
              </Button>
            </form>
          </Card>
        </div>
      </section>

      <Footer />
    </main>
  )
}
