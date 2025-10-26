# Backend Environment Variables Template

Create a `.env` file in the `backend/` directory with the following variables:

```bash
# MongoDB Configuration
MONGODB_URI=mongodb://127.0.0.1:27017
MONGODB_DB=grantmind

# Google Gemini API for AI Analysis
GOOGLE_GEMINI_API_KEY=your_gemini_api_key_here

# Server Configuration
PORT=4000
NODE_ENV=development

# CORS (optional, defaults to localhost:3000)
CORS_ORIGIN=http://localhost:3000
```

## Getting API Keys

### Google Gemini API Key
1. Visit https://makersuite.google.com/app/apikey
2. Create a new API key
3. Copy and paste it as `GOOGLE_GEMINI_API_KEY`

### MongoDB
- For local development: Use `mongodb://127.0.0.1:27017`
- For MongoDB Atlas: Get connection string from https://cloud.mongodb.com
