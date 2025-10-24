"use client"

import { HoverEffect } from "@/components/ui/card-hover-effect"

export default function CardHoverEffectDemo() {
  return (
    <div className="max-w-6xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  )
}

export const projects = [
  {
    title: "Climate Tech Initiative",
    description: "Innovative solutions for carbon capture and renewable energy infrastructure development.",
    link: "#",
  },
  {
    title: "Web3 Education",
    description: "Comprehensive blockchain and decentralized finance education platform for developers.",
    link: "#",
  },
  {
    title: "AI Healthcare",
    description: "Machine learning models for early disease detection and personalized treatment plans.",
    link: "#",
  },
  {
    title: "DeFi Infrastructure",
    description: "Building scalable and secure decentralized finance protocols for the future.",
    link: "#",
  },
  {
    title: "Sustainable Supply Chain",
    description: "Blockchain-based transparency for global supply chain management and verification.",
    link: "#",
  },
  {
    title: "Social Impact Tech",
    description: "Technology solutions addressing poverty, education, and healthcare in developing regions.",
    link: "#",
  },
]
