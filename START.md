# 🚀 Grantmind Ventures - Quick Start Guide

## Prerequisites
- Node.js 18+ installed
- MongoDB installed and running (for backend mode)
- MetaMask or compatible Web3 wallet

## Quick Start (Recommended - Local Mode)

This mode uses Next.js API routes and doesn't require the backend server.

### 1. Setup Client
```bash
cd client
npm install

# Create environment file
cp ENV_TEMPLATE.md .env.local
# Edit .env.local and add your GOOGLE_GEMINI_API_KEY
```

### 2. Run Client
```bash
npm run dev
```

Visit http://localhost:3000

## Full Stack Mode (Backend + Frontend)

### 1. Setup Backend
```bash
cd backend
npm install

# Create environment file
cp ENV_TEMPLATE.md .env
# Edit .env and configure MongoDB and Gemini API key
```

### 2. Start MongoDB (if using local)
```bash
# macOS with Homebrew
brew services start mongodb-community

# Or run manually
mongod --dbpath=/path/to/data
```

### 3. Run Backend
```bash
cd backend
npm run dev
```
Backend runs on http://localhost:4000

### 4. Setup and Run Client
```bash
cd client
npm install

# Create .env.local and set:
# NEXT_PUBLIC_FORCE_EXTERNAL_API=true
# NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api
# GOOGLE_GEMINI_API_KEY=your_key

npm run dev
```

Visit http://localhost:3000

## 🎯 Features Available

### ✅ Submit Project Proposals
- Navigate to `/submit`
- Fill in title, description, amount
- Optionally attach whitepaper
- Connect wallet to associate your address
- **AI analysis runs automatically on submission**

### ✅ View AI Analysis
- After submission, redirected to `/analysis?proposalId=xxx`
- See AI-generated summary and scores
- View evaluation metrics chart
- Download PDF report

### ✅ Browse Proposals
- Navigate to `/proposals`
- Filter by status (all, submitted, approved, funded)
- View AI scores for each proposal
- Click to see full details

### ✅ Vote on Proposals
- Navigate to `/voting`
- Vote For, Against, or Abstain
- See voting statistics
- Mark proposals as funded

### ✅ Donate to Creators
- On proposal detail page (`/proposal/[id]`)
- "Donate to Creator" section sends CELO directly to project owner
- "Fund This Proposal" sends to DAO treasury
- On voting page, quick "Donate" button for proposals with creator wallet

## 🔧 Configuration

### Wallet Setup (MetaMask)
1. Install MetaMask extension
2. Add Celo network:
   - Network Name: Celo Mainnet
   - RPC URL: https://forno.celo.org
   - Chain ID: 42220
   - Currency: CELO
   - Block Explorer: https://explorer.celo.org

For testing, use Celo Alfajores testnet:
   - RPC URL: https://alfajores-forno.celo-testnet.org
   - Chain ID: 44787

### Get Test CELO
Visit https://faucet.celo.org for Alfajores testnet tokens

## 📝 Environment Variables

### Client (.env.local)
```bash
GOOGLE_GEMINI_API_KEY=your_key
NEXT_PUBLIC_FORCE_EXTERNAL_API=false  # true for backend mode
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api
NEXT_PUBLIC_DAO_ADDRESS=0xYourDAOAddress
```

### Backend (.env)
```bash
MONGODB_URI=mongodb://127.0.0.1:27017
MONGODB_DB=grantmind
GOOGLE_GEMINI_API_KEY=your_key
PORT=4000
```

## 🧪 Testing the Flow

1. **Submit a Project**
   - Go to `/submit`
   - Enter: "AI-powered climate solution" as title
   - Add description and amount
   - Submit

2. **View Analysis**
   - Automatically redirected to analysis page
   - See AI scores and summary

3. **Check Proposals**
   - Go to `/proposals`
   - Your submission appears with AI scores

4. **Vote**
   - Go to `/voting`
   - Vote on your proposal

5. **Donate**
   - Click proposal to view details
   - Use "Donate to Creator" to send CELO

## 🐛 Troubleshooting

### "AI service unavailable"
- Check `GOOGLE_GEMINI_API_KEY` is set correctly
- Verify API key is valid at https://makersuite.google.com

### "Failed to connect to MongoDB"
- Ensure MongoDB is running: `mongod`
- Check `MONGODB_URI` in backend `.env`

### Wallet not connecting
- Ensure MetaMask is installed
- Check you're on the correct network (Celo/Alfajores)
- Refresh page and try again

### Proposals not showing
- Check browser console for errors
- Verify API endpoints are accessible
- Clear localStorage and refresh

## 📚 Project Structure

```
Grantmind-Vantures/
├── backend/           # Express API server
│   ├── api/routes/   # API endpoints
│   ├── models/       # MongoDB models
│   ├── services/     # Gemini AI integration
│   └── server.js     # Entry point
├── client/           # Next.js frontend
│   ├── app/          # Pages and API routes
│   ├── components/   # UI components
│   ├── lib/          # Utilities
│   └── store/        # Zustand state management
└── contracts/        # Smart contracts (future)
```

## 🎨 Tech Stack

- **Frontend**: Next.js 15, React 19, TailwindCSS, Radix UI
- **Wallet**: Wagmi, RainbowKit, Viem
- **Backend**: Express, MongoDB, Mongoose
- **AI**: Google Gemini API
- **State**: Zustand with persistence
- **Charts**: Recharts

## 🚀 Deployment

### Deploy Frontend (Vercel)
```bash
cd client
vercel
```

### Deploy Backend (Railway/Render)
- Connect GitHub repo
- Set environment variables
- Deploy from `backend/` directory

## 📞 Support

For issues or questions:
- Check console logs for errors
- Verify all environment variables are set
- Ensure wallet is connected to correct network
- Check API key quotas and limits
