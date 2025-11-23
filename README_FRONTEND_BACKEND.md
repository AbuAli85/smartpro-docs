# Email Reply Tracking System - Frontend & Backend

## 🚀 Quick Start

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database URL and config
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
# Create .env.local with NEXT_PUBLIC_API_URL=http://localhost:5000/api
npm run dev
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── app.js              # Express app setup
│   ├── routes/             # API routes
│   ├── controllers/        # Business logic
│   ├── services/           # Database & external services
│   └── database/           # Database schema
└── package.json

frontend/
├── src/
│   ├── app/                # Next.js pages
│   ├── components/        # React components
│   └── lib/                # Utilities
└── package.json
```

## 🔧 Configuration

### Backend Environment Variables

```env
PORT=5000
DATABASE_URL=postgresql://user:pass@localhost:5432/dbname
FRONTEND_URL=http://localhost:3000
```

### Frontend Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 📊 Features

- ✅ RESTful API
- ✅ Real-time updates (WebSocket)
- ✅ Professional dashboard
- ✅ Reply tracking
- ✅ Analytics
- ✅ Responsive design

## 🎯 Next Steps

1. Set up PostgreSQL database
2. Run database migrations
3. Configure environment variables
4. Start backend server
5. Start frontend app
6. Test webhook endpoints

---

**For detailed setup instructions, see `FRONTEND_BACKEND_ARCHITECTURE.md`**

