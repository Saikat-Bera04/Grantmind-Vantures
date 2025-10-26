# Client Environment Variables Template

Create a `.env.local` file in the `client/` directory with the following variables:

```bash
# Google Gemini API Key (for client-side AI analysis)
GOOGLE_GEMINI_API_KEY=your_gemini_api_key_here

# Backend API Configuration
# Set to 'true' to use external backend, otherwise uses Next.js API routes
NEXT_PUBLIC_FORCE_EXTERNAL_API=false
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api

# DAO Treasury Address (for funding proposals)
NEXT_PUBLIC_DAO_ADDRESS=0xYourDAOTreasuryAddressHere
NEXT_PUBLIC_DAO_TREASURY=0xYourDAOTreasuryAddressHere
```

## Configuration Options

### Using Local Next.js API (Recommended for Development)
- Leave `NEXT_PUBLIC_FORCE_EXTERNAL_API` unset or set to `false`
- The app will use built-in `/api/*` routes
- Still requires `GOOGLE_GEMINI_API_KEY` for AI analysis

### Using External Backend
- Set `NEXT_PUBLIC_FORCE_EXTERNAL_API=true`
- Set `NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api`
- Make sure backend server is running

### DAO Treasury
- Set `NEXT_PUBLIC_DAO_ADDRESS` to your DAO's treasury wallet address
- This enables the "Fund This Proposal" feature
- For testing, you can use any valid Ethereum address
