"use client"

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards"

export default function InfiniteMovingCardsDemo() {
  return (
    <div className="h-[40rem] rounded-md flex flex-col antialiased bg-transparent dark:bg-transparent items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards items={testimonials} direction="right" speed="slow" />
    </div>
  )
}

const testimonials = [
  {
    quote: "AI-powered evaluation ensures fair and unbiased assessment of every proposal submitted to our platform.",
    name: "Smart Evaluation",
    title: "Objective Impact Scoring",
  },
  {
    quote: "Community-driven voting empowers DAO members to make collective decisions on funding allocation.",
    name: "DAO Governance",
    title: "Decentralized Decision Making",
  },
  {
    quote: "Every transaction and vote is recorded on-chain, ensuring complete transparency and accountability.",
    name: "Blockchain Security",
    title: "Immutable Records",
  },
  {
    quote: "Builders from around the world can submit innovative ideas and compete for funding opportunities.",
    name: "Global Community",
    title: "Open to All Innovators",
  },
  {
    quote: "Real-time tracking of proposal status, voting progress, and fund distribution across all projects.",
    name: "Live Dashboard",
    title: "Complete Visibility",
  },
]
