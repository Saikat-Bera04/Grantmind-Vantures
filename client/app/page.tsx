"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import CardHoverEffectDemo from "@/components/ui/card-hover-effect-demo"
import InfiniteMovingCardsDemo from "@/components/ui/infinite-moving-cards-demo"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pt-40 pb-24 md:pt-48 md:pb-32 container">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-block mb-8 px-4 py-2 border border-primary/40 rounded-full backdrop-blur-sm bg-primary/5 hover:bg-primary/10 transition-colors">
            <p className="font-mono text-xs md:text-sm text-primary font-semibold tracking-widest">BETA RELEASE</p>
          </div>

          <h1 className="text-6xl sm:text-7xl md:text-8xl font-sentient mb-8 leading-tight">
            Empowering Builders <br />
            <span className="text-primary">with AI + DAO</span>
          </h1>

          <p className="font-mono text-base md:text-lg text-foreground/60 mb-4 text-balance">
            Submit ideas, let AI evaluate impact, and let the DAO fund innovation.
          </p>

          <p className="font-mono text-sm text-foreground/40 mb-12 text-balance">
            Join a community of builders and innovators shaping the future of decentralized funding.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/submit">
              <Button size="lg" className="px-8">
                [🚀 Launch App]
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="px-8 bg-transparent">
                [📊 Dashboard]
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 container border-t border-border/50">
        <div className="grid grid-cols-3 gap-4 md:gap-8">
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-sentient text-primary mb-2">$2.5M+</p>
            <p className="font-mono text-xs md:text-sm text-foreground/60">Grants Distributed</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-sentient text-primary mb-2">500+</p>
            <p className="font-mono text-xs md:text-sm text-foreground/60">Projects Funded</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-sentient text-primary mb-2">10K+</p>
            <p className="font-mono text-xs md:text-sm text-foreground/60">Community Members</p>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 container border-t border-border/50">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-sentient mb-4 text-center">Why Choose Our Platform</h2>
          <p className="text-center text-foreground/60 font-mono text-sm md:text-base max-w-2xl mx-auto">
            Experience the future of decentralized funding with AI-powered analysis and community-driven decisions.
          </p>
        </div>
        <InfiniteMovingCardsDemo />
      </section>

      <section className="py-24 md:py-32 container border-t border-border/50">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-sentient mb-4 text-center">Featured Grant Opportunities</h2>
          <p className="text-center text-foreground/60 font-mono text-sm md:text-base max-w-2xl mx-auto">
            Explore active grants and find the perfect opportunity for your project.
          </p>
        </div>
        <CardHoverEffectDemo />
      </section>

      <section className="py-24 md:py-32 container border-t border-border/50">
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-12 md:p-16 text-center backdrop-blur-sm">
          <h2 className="text-3xl md:text-4xl font-sentient mb-4">Ready to Submit Your Idea?</h2>
          <p className="text-foreground/60 font-mono mb-8 max-w-2xl mx-auto">
            Join hundreds of builders who have successfully secured funding through our platform.
          </p>
          <Link href="/submit">
            <Button size="lg" className="px-8">
              [✨ Submit Your Project]
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
