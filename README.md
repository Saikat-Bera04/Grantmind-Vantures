# 🚀 Grantmind Ventures

**AI-Powered DAO Grant Management Platform**

A decentralized platform that leverages AI to analyze, evaluate, and fund innovative projects through community governance on the Celo blockchain.

[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge)](https://grantmind-vantures.vercel.app/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

## 🌐 Live Deployment

**Website:** [https://grantmind-vantures.vercel.app/](https://grantmind-vantures.vercel.app/)

### 📜 Smart Contracts (Celo Network)

- **GrantToken Contract:** `0xb0B377BCde2a26435b79A606d506CeF49892eCaB`
- **GrantMind DAO Contract:** `0x868495e2E8de479e385B871Adc4DCFA949E8673e`

## ✨ Features

### 🤖 AI-Powered Analysis
- **Automated Proposal Evaluation** - Google Gemini AI analyzes every submission
- **Smart Scoring System** - Evaluates Market Fit, Innovation, Scalability, Team Quality, and Risk
- **Instant Insights** - Get comprehensive analysis reports immediately after submission

### 💰 Decentralized Funding
- **Direct Donations** - Send CELO directly to project creators
- **DAO Treasury Funding** - Community-managed treasury for approved projects
- **Multi-Chain Support** - Built on Celo with support for Alfajores testnet

### 🗳️ DAO Governance
- **Community Voting** - Vote For, Against, or Abstain on proposals
- **Transparent Process** - All votes and funding tracked on-chain
- **Real-time Updates** - Live proposal status and voting statistics

### 📊 Comprehensive Dashboard
- **Proposal Management** - Browse, filter, and track all proposals
- **Funding Analytics** - View funding progress and community support
- **AI Reports** - Download detailed PDF analysis reports

## 🏗️ Tech Stack

### Frontend
- **Framework:** Next.js 15 (React 19)
- **Styling:** TailwindCSS 4 + Radix UI
- **Web3:** Wagmi 2.x, RainbowKit, Viem
- **State Management:** Zustand with persistence
- **Charts:** Recharts
- **AI Integration:** Google Gemini API

### Backend
- **Runtime:** Node.js with Express
- **Database:** MongoDB with Mongoose
- **AI Service:** Google Generative AI SDK
- **File Upload:** Multer

### Blockchain
- **Network:** Celo (Mainnet & Alfajores Testnet)
- **Smart Contracts:** Solidity
- **Token Standard:** ERC-20 (GrantToken)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MetaMask or compatible Web3 wallet
- MongoDB (for full-stack mode)

### Option 1: Quick Start (Recommended)

```bash
# Clone the repository
git clone https://github.com/yourusername/Grantmind-Vantures.git
cd Grantmind-Vantures

# Install client dependencies
cd client
npm install

# Create environment file
cat > .env.local << 'EOF'
GOOGLE_GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_FORCE_EXTERNAL_API=false
NEXT_PUBLIC_GRANT_TOKEN_ADDRESS=0xb0B377BCde2a26435b79A606d506CeF49892eCaB
NEXT_PUBLIC_GRANTMIND_DAO_ADDRESS=0x868495e2E8de479e385B871Adc4DCFA949E8673e
EOF

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Option 2: Full Stack Mode

```bash
# From project root
./run-fullstack.sh
```

See [START.md](START.md) for detailed setup instructions.

## 🔑 Environment Variables

### Client Configuration

Create `client/.env.local`:

```bash
# Required: Google Gemini API Key
GOOGLE_GEMINI_API_KEY=your_api_key_here

# Optional: Backend API (leave false for local mode)
NEXT_PUBLIC_FORCE_EXTERNAL_API=false
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api

# Smart Contract Addresses
NEXT_PUBLIC_GRANT_TOKEN_ADDRESS=0xb0B377BCde2a26435b79A606d506CeF49892eCaB
NEXT_PUBLIC_GRANTMIND_DAO_ADDRESS=0x868495e2E8de479e385B871Adc4DCFA949E8673e
NEXT_PUBLIC_DAO_ADDRESS=0x868495e2E8de479e385B871Adc4DCFA949E8673e
```

### Backend Configuration

Create `backend/.env`:

```bash
MONGODB_URI=mongodb://127.0.0.1:27017
MONGODB_DB=grantmind
GOOGLE_GEMINI_API_KEY=your_api_key_here
PORT=4000
```

## 📖 User Guide

### 1️⃣ Submit a Proposal

1. Navigate to **Submit** page
2. Fill in project details:
   - Title
   - Description
   - Requested amount (CELO)
   - Optional: Upload whitepaper/documentation
3. Connect your wallet
4. Click **Submit Proposal**
5. AI analysis runs automatically

### 2️⃣ View AI Analysis

- Automatically redirected after submission
- See comprehensive AI evaluation:
  - Overall score
  - Category-wise metrics
  - Recommendations
  - 6-month projections
- Download PDF report

### 3️⃣ Browse & Vote

- **Proposals Page:** View all submissions with AI scores
- **Voting Page:** Cast your vote on active proposals
- Filter by status: Submitted, Approved, Funded

### 4️⃣ Fund Projects

**Direct Donation to Creator:**
- Visit proposal detail page
- Enter amount in CELO
- Click **Donate to Creator**
- Confirm wallet transaction

**DAO Treasury Funding:**
- Use **Fund This Proposal** option
- Funds go to DAO treasury for community allocation

## 🌐 Celo Network Setup

### Add Celo to MetaMask

**Celo Mainnet:**
- Network Name: `Celo`
- RPC URL: `https://forno.celo.org`
- Chain ID: `42220`
- Currency: `CELO`
- Block Explorer: `https://explorer.celo.org`

**Celo Alfajores Testnet:**
- Network Name: `Celo Alfajores`
- RPC URL: `https://alfajores-forno.celo-testnet.org`
- Chain ID: `44787`
- Currency: `CELO`
- Block Explorer: `https://alfajores.celoscan.io`

### Get Test CELO
Visit [Celo Faucet](https://faucet.celo.org) for Alfajores testnet tokens.

## 📁 Project Structure

```
Grantmind-Vantures/
├── backend/                 # Express API server
│   ├── api/
│   │   └── routes/         # API endpoints
│   ├── models/             # MongoDB schemas
│   ├── services/           # AI & business logic
│   └── server.js           # Entry point
├── client/                 # Next.js frontend
│   ├── app/                # App router pages
│   │   ├── submit/        # Proposal submission
│   │   ├── analysis/      # AI analysis view
│   │   ├── proposals/     # Browse proposals
│   │   ├── voting/        # DAO voting
│   │   └── api/           # Next.js API routes
│   ├── components/         # React components
│   ├── lib/               # Utilities & helpers
│   └── store/             # Zustand state
├── contracts/              # Smart contracts
│   ├── contracts/
│   │   ├── GrantToken.sol
│   │   └── GrantMindDAO.sol
│   └── scripts/           # Deployment scripts
├── run-dev.sh             # Quick start script
├── run-fullstack.sh       # Full stack script
└── START.md               # Detailed guide
```

## 🔧 Development

### Install Dependencies

```bash
# Backend
cd backend && npm install

# Client
cd client && npm install

# Contracts
cd contracts && npm install
```

### Run Development Servers

```bash
# Client only (uses Next.js API)
cd client && npm run dev

# Backend only
cd backend && npm run dev

# Both (use script)
./run-fullstack.sh
```

### Build for Production

```bash
# Client
cd client && npm run build

# Backend
cd backend && npm run start
```

## 🧪 Smart Contracts

### Compile Contracts

```bash
cd contracts
npx hardhat compile
```

### Deploy Contracts

```bash
npx hardhat run scripts/deploy.js --network celo
```

### Contract Addresses

| Contract | Address | Network |
|----------|---------|---------|
| GrantToken | `0xb0B377BCde2a26435b79A606d506CeF49892eCaB` | Celo |
| GrantMindDAO | `0x868495e2E8de479e385B871Adc4DCFA949E8673e` | Celo |

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Celo Foundation** - For the blockchain infrastructure
- **Google Gemini** - For AI analysis capabilities
- **RainbowKit** - For wallet connection UI
- **Vercel** - For hosting and deployment

## 📞 Support

- **Live Demo:** [https://grantmind-vantures.vercel.app/](https://grantmind-vantures.vercel.app/)
- **Documentation:** [START.md](START.md)
- **Issues:** [GitHub Issues](https://github.com/yourusername/Grantmind-Vantures/issues)

## 🗺️ Roadmap

- [ ] Multi-signature wallet integration
- [ ] Advanced governance mechanisms
- [ ] Cross-chain bridge support
- [ ] Mobile app (React Native)
- [ ] Enhanced AI models for deeper analysis
- [ ] Integration with more grant platforms
- [ ] NFT badges for contributors
- [ ] Reputation system for voters

---

**Built with ❤️ for the Celo ecosystem**

[Website](https://grantmind-vantures.vercel.app/) • [Contracts](https://explorer.celo.org/address/0x868495e2E8de479e385B871Adc4DCFA949E8673e)
