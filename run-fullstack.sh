#!/bin/bash

# Grantmind Ventures - Full Stack Startup Script
# This script starts both backend and frontend servers

echo "🚀 Starting Grantmind Ventures (Full Stack Mode)"
echo "================================================"
echo ""

# Check backend .env
if [ ! -f "backend/.env" ]; then
    echo "⚠️  Warning: backend/.env not found"
    echo "📝 Creating template .env file..."
    cat > backend/.env << 'EOF'
# MongoDB Configuration
MONGODB_URI=mongodb://127.0.0.1:27017
MONGODB_DB=grantmind

# Google Gemini API Key
GOOGLE_GEMINI_API_KEY=

# Server Configuration
PORT=4000
NODE_ENV=development
EOF
    echo "✅ Created backend/.env"
    echo "⚠️  Please edit backend/.env and add your GOOGLE_GEMINI_API_KEY"
    echo ""
fi

# Check client .env.local
if [ ! -f "client/.env.local" ]; then
    echo "⚠️  Warning: client/.env.local not found"
    echo "📝 Creating template .env.local file..."
    cat > client/.env.local << 'EOF'
# Google Gemini API Key
GOOGLE_GEMINI_API_KEY=

# Backend API Configuration
NEXT_PUBLIC_FORCE_EXTERNAL_API=true
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api

# DAO Treasury Address
NEXT_PUBLIC_DAO_ADDRESS=
EOF
    echo "✅ Created client/.env.local"
    echo "⚠️  Please edit client/.env.local and add your GOOGLE_GEMINI_API_KEY"
    echo ""
fi

# Check if node_modules exists
if [ ! -d "backend/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd backend && npm install && cd ..
    echo ""
fi

if [ ! -d "client/node_modules" ]; then
    echo "📦 Installing client dependencies..."
    cd client && npm install && cd ..
    echo ""
fi

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB doesn't appear to be running"
    echo "💡 Start MongoDB with: brew services start mongodb-community"
    echo "   Or run: mongod --dbpath=/path/to/data"
    echo ""
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo "🔧 Starting backend server..."
cd backend && npm run dev &
BACKEND_PID=$!
cd ..

echo "⏳ Waiting for backend to start..."
sleep 3

echo "🌐 Starting frontend server..."
cd client && npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ Servers started!"
echo "📍 Backend:  http://localhost:4000"
echo "📍 Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Wait for Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
