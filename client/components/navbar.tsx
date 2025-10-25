"use client"

import Link from "next/link"
import { Logo } from "./logo"
import { WalletConnectButton } from "./wallet-connect-button"
import { useState } from "react"

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Analysis", href: "/analysis" },
    { label: "Proposals", href: "/proposals" },
    { label: "Voting", href: "/voting" },
    { label: "Funded", href: "/funded-projects" },
    { label: "Submit", href: "/submit" },
  ]

  return (
    <div className="fixed z-50 pt-6 md:pt-8 top-0 left-0 w-full bg-background/80 backdrop-blur-sm border-b border-border">
      <nav className="flex items-center justify-between container">
        <Link href="/">
          <Logo className="w-[80px] md:w-[100px]" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-mono text-sm text-foreground/70 hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Connect Wallet Button */}
        <div className="hidden md:inline-flex">
          <WalletConnectButton />
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-foreground">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono text-sm text-foreground/70 hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <WalletConnectButton />
          </div>
        </div>
      )}
    </div>
  )
}
