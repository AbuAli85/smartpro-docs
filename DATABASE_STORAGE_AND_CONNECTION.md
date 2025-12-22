# Database Storage & Connection to Marketing Website

## Where is the Database Stored?

### Database Type
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Location**: **Supabase** (Cloud-hosted)
- **Shared By**: Marketing Website + Platform + Other Systems

### Current Setup: Supabase

**Your database is hosted on Supabase**:
- Managed PostgreSQL database
- Shared between marketing website and platform
- Connection via `DATABASE_URL` environment variable
- Connection string format:
  ```
  postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true
  ```

### Supabase Benefits
- ✅ Free tier available
- ✅ Managed PostgreSQL
- ✅ Real-time capabilities
- ✅ Row Level Security (RLS)
- ✅ Connection pooling (for serverless)
- ✅ Shared between multiple systems

### Current Configuration

The database connection is configured via environment variable pointing to **Supabase**:

```env
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"
```

**Location**: 
- Set in `.env` file (local development)
- Set in Vercel Environment Variables (production)
- **Same database** used by marketing website and platform

## How Marketing Website Connects to Database

### Connection Flow

```
┌─────────────────────────────────────────────────────────┐
│              MARKETING WEBSITE                          │
│         (smartpro-docs.vercel.app)                      │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Frontend (React/Vite)                           │  │
│  │  - User fills consultation form                  │  │
│  │  - Submits form                                  │  │
│  └──────────────────────────────────────────────────┘  │
│                    │                                    │
│                    │ HTTP Request                       │
│                    ▼                                    │
│  ┌──────────────────────────────────────────────────┐  │
│  │  API Endpoint                                     │  │
│  │  POST /api/consultation                           │  │
│  │  (server/routes/consultationRoutes.ts)            │  │
│  └──────────────────────────────────────────────────┘  │
│                    │                                    │
│                    │ Prisma Client                     │
│                    ▼                                    │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Prisma ORM                                      │  │
│  │  - Validates data                                │  │
│  │  - Generates SQL queries                         │  │
│  │  - Manages connections                           │  │
│  └──────────────────────────────────────────────────┘  │
│                    │                                    │
│                    │ PostgreSQL Protocol                │
│                    │ (via DATABASE_URL)                 │
│                    ▼                                    │
└─────────────────────────────────────────────────────────┘
                    │
                    │ HTTPS/TLS Connection
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│              DATABASE SERVER                             │
│         (PostgreSQL - Cloud Hosted)                      │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │  PostgreSQL Database                              │  │
│  │  - consultation_submissions table                  │  │
│  │  - users table                                    │  │
│  │  - leads table                                    │  │
│  │  - notifications table                             │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Step-by-Step Connection Process

#### 1. **Frontend Submission**
```typescript
// client/src/components/ConsultationForm.tsx
const response = await consultationApi.submit(formData);
// Makes HTTP request to: POST /api/consultation
```

#### 2. **API Route Handler**
```typescript
// server/routes/consultationRoutes.ts
router.post('/', async (req, res) => {
  // Prisma client initialized here
  const consultation = await prisma.consultationSubmission.create({
    data: formData
  });
});
```

#### 3. **Prisma Client Initialization**
```typescript
// Prisma client is initialized in each route file
let prisma: any;
try {
  const { PrismaClient } = require('@prisma/client');
  prisma = new PrismaClient({
    // Uses DATABASE_URL from environment
  });
} catch (error) {
  console.warn('Prisma client not available');
}
```

#### 4. **Database Connection**
```typescript
// Prisma reads DATABASE_URL from environment
// DATABASE_URL="postgresql://user:pass@host:5432/db"
// Prisma connects to PostgreSQL using this URL
```

## Database Configuration

### Environment Variables

**Local Development** (`.env` file):
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/smartpro_dev"
```

**Production** (Vercel Environment Variables):
```env
DATABASE_URL="postgresql://user:password@host.provider.com:5432/smartpro_prod"
```

### Prisma Schema Configuration

```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")  // ← Reads from environment
}
```

## How to Set Up Database Connection

### ✅ Current Setup: Supabase (Already Configured)

**Your database is already on Supabase!**

1. **Supabase Project**
   - Already created and configured
   - Shared between marketing website and platform
   - Access via Supabase Dashboard

2. **Environment Variable** (Already Set)
   ```env
   DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"
   ```
   - Set in Vercel for marketing website
   - Should be set in platform environment too

3. **Migrations** (Already Run)
   ```bash
   # Tables already created
   # To add new tables:
   npx prisma migrate dev
   # or
   npx prisma db push
   ```

4. **View Database**
   - Supabase Dashboard → Table Editor
   - Or: `npx prisma studio`

### Option 2: Vercel Postgres

1. **Add Postgres to Vercel Project**
   - Go to Vercel Dashboard
   - Add Postgres integration
   - Connection string auto-configured

2. **Environment Variable Auto-Set**
   - Vercel automatically sets `DATABASE_URL`
   - No manual configuration needed

3. **Run Migrations**
   ```bash
   npx prisma migrate deploy
   ```

### Option 3: Self-Hosted PostgreSQL

1. **Install PostgreSQL**
   ```bash
   # Ubuntu/Debian
   sudo apt-get install postgresql
   
   # macOS
   brew install postgresql
   ```

2. **Create Database**
   ```sql
   CREATE DATABASE smartpro;
   CREATE USER smartpro_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE smartpro TO smartpro_user;
   ```

3. **Set Environment Variable**
   ```env
   DATABASE_URL="postgresql://smartpro_user:your_password@localhost:5432/smartpro"
   ```

4. **Run Migrations**
   ```bash
   npx prisma migrate dev
   ```

## Database Tables (Current Schema)

### Tables Created by Prisma

1. **consultation_submissions**
   - Stores consultation form submissions
   - Fields: id, submissionId, name, email, services, etc.

2. **users**
   - Stores user accounts (if platform uses same DB)
   - Fields: id, email, name, consultationSubmissionId, etc.

3. **leads**
   - Tracks lead progression
   - Fields: id, submissionId, email, currentStage, progress, etc.

4. **notifications**
   - Stores notifications
   - Fields: id, userId, type, message, read, etc.

5. **notification_preferences**
   - User notification settings
   - Fields: id, userId, emailEnabled, etc.

## Connection Security

### Security Features

1. **HTTPS/TLS**
   - All database connections use encrypted TLS
   - Connection string includes SSL parameters

2. **Environment Variables**
   - Database credentials stored in environment
   - Never committed to code
   - Protected in Vercel dashboard

3. **Connection Pooling**
   - Prisma manages connection pool
   - Prevents too many connections
   - Automatic connection management

### Connection String Format

```
postgresql://[USER]:[PASSWORD]@[HOST]:[PORT]/[DATABASE]?[PARAMS]
```

**Example with SSL**:
```
postgresql://user:pass@host:5432/db?sslmode=require
```

## How Marketing Website Uses Database

### 1. **Storing Consultations**
```typescript
// When user submits form
await prisma.consultationSubmission.create({
  data: {
    submissionId: generateId(),
    name: formData.name,
    email: formData.email,
    services: formData.services,
    // ... other fields
  }
});
```

### 2. **Fetching Consultations**
```typescript
// Get consultation by submissionId
const consultation = await prisma.consultationSubmission.findFirst({
  where: { submissionId: 'sub_123' }
});
```

### 3. **Linking to Users**
```typescript
// Link consultation to user account
await prisma.user.update({
  where: { id: userId },
  data: { consultationSubmissionId: submissionId }
});
```

### 4. **Tracking Leads**
```typescript
// Track lead progression
await prisma.lead.upsert({
  where: { submissionId },
  update: { currentStage, progress },
  create: { submissionId, email, currentStage, progress }
});
```

## Database Location Summary

### Current Setup
- **Type**: PostgreSQL
- **Location**: Cloud-hosted (configured via `DATABASE_URL`)
- **Connection**: Through Prisma ORM
- **Access**: Via API routes on marketing website

### Where to Find Database URL

1. **Local Development**
   - Check `.env` file in project root
   - Format: `DATABASE_URL="postgresql://..."`

2. **Production (Vercel)**
   - Go to Vercel Dashboard
   - Project → Settings → Environment Variables
   - Look for `DATABASE_URL`

3. **If Using Supabase**
   - Supabase Dashboard → Settings → Database
   - Copy "Connection string"

## Quick Setup Checklist

- [ ] Choose database provider (Supabase, Vercel Postgres, etc.)
- [ ] Create database instance
- [ ] Get connection string
- [ ] Set `DATABASE_URL` in environment variables
- [ ] Run `npx prisma migrate dev` to create tables
- [ ] Test connection by submitting consultation form
- [ ] Verify data appears in database

## Troubleshooting

### Connection Issues

**Error**: "Can't reach database server"
- Check `DATABASE_URL` is correct
- Verify database server is running
- Check firewall/network settings

**Error**: "Authentication failed"
- Verify username/password in connection string
- Check database user permissions

**Error**: "Database does not exist"
- Create database first
- Or update connection string with correct database name

### Check Connection

```bash
# Test Prisma connection
npx prisma db pull

# View database in Prisma Studio
npx prisma studio
```

## Summary

**Database Location**: **Supabase PostgreSQL** (shared between marketing website and platform)

**Connection Method**: 
1. Marketing website → API routes → Prisma ORM → **Supabase Database**
2. Platform → (Prisma or Supabase SDK) → **Same Supabase Database**
3. Uses `DATABASE_URL` environment variable pointing to Supabase
4. Prisma handles all database operations

**Current Status**:
- ✅ Database: Supabase (already configured)
- ✅ Marketing website: Connected via Prisma
- ✅ Platform: Should use same `DATABASE_URL` or Supabase SDK
- ✅ Shared tables: consultation_submissions, users, leads, notifications

**Key Point**: Both marketing website and platform connect to the **same Supabase database**, allowing them to share data seamlessly. The `submissionId` links consultations from marketing website to users on the platform. 🔗

See `SUPABASE_DATABASE_CONNECTION.md` for detailed information about the shared database setup.

