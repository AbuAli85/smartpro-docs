# Server Startup Guide

## 🚀 Quick Start

The backend server must be running for the consultation form to work.

### Start the Server

**Option 1: Development Mode (with auto-reload)**
```bash
npm run dev:server
```

**Option 2: Production Mode**
```bash
npm run server
```

---

## 📋 Server Configuration

**Port:** `3001` (default)
- Can be changed via `PORT` environment variable
- Frontend expects: `http://localhost:3001/api/consultation`

**Health Check Endpoint:**
- URL: `http://localhost:3001/health`
- Returns: `{ status: 'ok', timestamp: ..., uptime: ... }`

---

## ✅ Verify Server is Running

### Method 1: Check Health Endpoint
```bash
curl http://localhost:3001/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "uptime": 123.456
}
```

### Method 2: Check Browser
Open: `http://localhost:3001/health`

### Method 3: Check Terminal Output
Look for:
```
🚀 Server running on port 3001
📍 Health check: http://localhost:3001/health
🌍 Environment: development
```

---

## 🔧 Troubleshooting

### Issue: Port 3001 Already in Use

**Solution 1: Kill process on port 3001**
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Or use PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 3001).OwningProcess | Stop-Process
```

**Solution 2: Change port**
```bash
# Set environment variable
set PORT=3002

# Or create .env file
echo PORT=3002 > .env
```

Then update frontend API URL to match.

---

### Issue: Module Not Found Errors

**Solution:**
```bash
# Install dependencies
npm install

# Or if using pnpm
pnpm install
```

---

### Issue: TypeScript Errors

**Solution:**
```bash
# Check for type errors
npm run check

# Generate Prisma client (if using database)
npm run db:generate
```

---

## 📝 Environment Variables

Create a `.env` file in the project root:

```env
# Server Port
PORT=3001

# Database (if using Prisma)
DATABASE_URL="postgresql://user:password@localhost:5432/smartpro"

# Make.com Webhook
MAKE_WEBHOOK_URL="https://hook.eu2.make.com/z9t0f5eqipopdg368eypl5i9eo7kpbu8"

# Frontend URL (for CORS)
FRONTEND_URL="http://localhost:3000"

# Node Environment
NODE_ENV=development
```

---

## 🎯 Common Commands

```bash
# Start server in development mode
npm run dev:server

# Start server in production mode
npm run server

# Check TypeScript types
npm run check

# Generate Prisma client
npm run db:generate

# Push database schema
npm run db:push
```

---

## ⚠️ Important Notes

1. **Server must be running** before submitting forms
2. **Frontend runs on port 3000** (Vite dev server)
3. **Backend runs on port 3001** (Express server)
4. **CORS is configured** to allow requests from frontend

---

## 🔍 Verify Integration

After starting the server:

1. ✅ Check health endpoint: `http://localhost:3001/health`
2. ✅ Submit test form from frontend
3. ✅ Check server logs for request/response
4. ✅ Verify Make.com webhook receives data

---

**Status:** Server startup guide created  
**Last Updated:** 2024

