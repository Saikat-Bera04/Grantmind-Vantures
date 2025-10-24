export const Footer = () => {
  return (
    <footer className="border-t border-border bg-background/50 py-16 md:py-24">
      <div className="container">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <h3 className="font-sentient text-xl mb-2">DAO Grants</h3>
            <p className="font-mono text-sm text-foreground/60 mb-6">
              Empowering builders with AI-powered grant funding through decentralized governance.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7" />
                </svg>
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.736 0-9.646h3.554v1.364c.429-.659 1.191-1.599 2.896-1.599 2.117 0 3.704 1.385 3.704 4.362v5.519zM5.337 9.432c-1.144 0-1.915-.758-1.915-1.707 0-.955.771-1.71 1.958-1.71 1.187 0 1.914.757 1.948 1.71 0 .949-.761 1.707-1.991 1.707zm1.581 11.02H3.715V9.806h3.203v10.646zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-sentient text-sm mb-6 text-primary">Platform</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="/proposals"
                  className="font-mono text-sm text-foreground/60 hover:text-foreground transition-colors"
                >
                  Browse Proposals
                </a>
              </li>
              <li>
                <a
                  href="/submit"
                  className="font-mono text-sm text-foreground/60 hover:text-foreground transition-colors"
                >
                  Submit Grant
                </a>
              </li>
              <li>
                <a href="/dao" className="font-mono text-sm text-foreground/60 hover:text-foreground transition-colors">
                  DAO Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="font-mono text-sm text-foreground/60 hover:text-foreground transition-colors">
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-sentient text-sm mb-6 text-primary">Resources</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="font-mono text-sm text-foreground/60 hover:text-foreground transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="font-mono text-sm text-foreground/60 hover:text-foreground transition-colors">
                  Guides
                </a>
              </li>
              <li>
                <a href="#" className="font-mono text-sm text-foreground/60 hover:text-foreground transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="font-mono text-sm text-foreground/60 hover:text-foreground transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-sentient text-sm mb-6 text-primary">Legal</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="font-mono text-sm text-foreground/60 hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="font-mono text-sm text-foreground/60 hover:text-foreground transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="font-mono text-sm text-foreground/60 hover:text-foreground transition-colors">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="font-mono text-sm text-foreground/60 hover:text-foreground transition-colors">
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8 mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-foreground/40">© 2025 DAO Grants. All rights reserved.</p>
          <div className="flex gap-6">
            <p className="font-mono text-xs text-foreground/60">
              Built on <span className="text-primary">Celo</span>
            </p>
            <p className="font-mono text-xs text-foreground/60">
              Powered by <span className="text-primary">AI + DAO</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
