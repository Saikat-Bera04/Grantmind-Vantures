# Grantmind Backend

## Env
Create `.env` with:

```
PORT=4000
CORS_ORIGIN=http://localhost:3001
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority&appName=<app>
MONGODB_DB=grantmind

# Gemini
GOOGLE_GEMINI_API_KEY=AIzaSyAXklbvh7MXxQkFiAICSvxP_YZcsDxOnDc
GEMINI_MODEL=gemini-2.5-flash

# Optional chain access
RPC_URL=
DAO_CONTRACT_ADDRESS=
DAO_CONTRACT_ABI_JSON=
```

## Run
```
npm install
npm run dev
```

Server: http://localhost:4000
Health: GET /health
API: http://localhost:4000/api
