#!/bin/bash

# Grantmind Ventures - Development Startup Script
# This script starts the client in local mode (using Next.js API routes)

echo "🚀 Starting Grantmind Ventures (Local Mode)"
echo "============================================"
echo ""

# Check if .env.local exists in client
if [ ! -f "client/.env.local" ]; then
    echo "⚠️  Warning: client/.env.local not found"
    echo "📝 Creating template .env.local file..."
    cat > client/.env.local << 'EOF'
# Google Gemini API Key (required for AI analysis)
GOOGLE_GEMINI_API_KEY=

# Backend API Configuration (optional - leave as is for local mode)
NEXT_PUBLIC_FORCE_EXTERNAL_API=false
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api

# DAO Treasury Address (optional - for funding feature)
NEXT_PUBLIC_DAO_ADDRESS=
EOF
    echo "✅ Created client/.env.local"
    echo "⚠️  Please edit client/.env.local and add your GOOGLE_GEMINI_API_KEY"
    echo ""
fi

# Check if node_modules exists
if [ ! -d "client/node_modules" ]; then
    echo "📦 Installing client dependencies..."
    cd client && npm install && cd ..
    echo ""
fi

echo "🌐 Starting Next.js development server..."
echo "📍 URL: http://localhost:3000"
echo ""
echo "Features available:"
echo "  ✅ Submit proposals with AI analysis"
echo "  ✅ View AI-powered insights"
echo "  ✅ Browse and vote on proposals"
echo "  ✅ Donate CELO to creators"
echo ""
echo "Press Ctrl+C to stop"
echo ""

cd client && npm run dev
