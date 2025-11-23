# Supabase Setup Guide

## 🚀 Quick Setup

### 1. Get Your Supabase Credentials

1. **Go to your Supabase project:** https://reootcngcptfogfozlmz.supabase.co
2. **Go to Settings → API**
3. **Copy these values:**
   - **Project URL:** `https://reootcngcptfogfozlmz.supabase.co`
   - **anon/public key:** (for frontend)
   - **service_role key:** (for backend - keep secret!)

### 2. Create Database Tables

1. **Go to SQL Editor** in Supabase dashboard
2. **Run this SQL:**

```sql
-- Submissions (from consultation form)
CREATE TABLE IF NOT EXISTS submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    timestamp TIMESTAMP NOT NULL,
    client_name VARCHAR(255),
    client_email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    business_name VARCHAR(255),
    business_type VARCHAR(100),
    service_type VARCHAR(100),
    budget_range VARCHAR(100),
    timeline VARCHAR(100),
    preferred_contact VARCHAR(50),
    preferred_time VARCHAR(50),
    location VARCHAR(255),
    message TEXT,
    submission_source VARCHAR(100),
    language VARCHAR(10),
    form_id VARCHAR(100),
    status VARCHAR(50) DEFAULT 'pending',
    initial_message TEXT,
    client_replied BOOLEAN DEFAULT FALSE,
    client_replied_at TIMESTAMP,
    provider_replied BOOLEAN DEFAULT FALSE,
    provider_replied_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Client Replies
CREATE TABLE IF NOT EXISTS client_replies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    submission_id UUID REFERENCES submissions(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(500),
    message TEXT NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Provider Replies
CREATE TABLE IF NOT EXISTS provider_replies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    submission_id UUID REFERENCES submissions(id) ON DELETE CASCADE,
    client_email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_submissions_email ON submissions(client_email);
CREATE INDEX IF NOT EXISTS idx_submissions_timestamp ON submissions(timestamp);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions(status);
CREATE INDEX IF NOT EXISTS idx_client_replies_email ON client_replies(email);
CREATE INDEX IF NOT EXISTS idx_client_replies_submission ON client_replies(submission_id);
CREATE INDEX IF NOT EXISTS idx_provider_replies_submission ON provider_replies(submission_id);
```

### 3. Configure Backend

1. **Copy `.env.example` to `.env`:**
   ```bash
   cp backend/.env.example backend/.env
   ```

2. **Edit `.env` and add your Supabase credentials:**
   ```env
   SUPABASE_URL=https://reootcngcptfogfozlmz.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
   ```

3. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

4. **Start the server:**
   ```bash
   npm run dev
   ```

### 4. Enable Row Level Security (Optional but Recommended)

For production, enable RLS policies in Supabase:

1. **Go to Authentication → Policies**
2. **Create policies for each table:**
   - Allow service role to do everything
   - Restrict public access as needed

Or run this SQL:

```sql
-- Enable RLS
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_replies ENABLE ROW LEVEL SECURITY;

-- Allow service role full access (for backend)
CREATE POLICY "Service role full access" ON submissions
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access" ON client_replies
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access" ON provider_replies
  FOR ALL USING (auth.role() = 'service_role');
```

## ✅ Benefits of Using Supabase

1. **Real-time Subscriptions** - Built-in WebSocket support
2. **Automatic REST API** - No need to build endpoints
3. **Easy Setup** - No database server management
4. **Built-in Auth** - Authentication ready to use
5. **Dashboard** - Visual database management
6. **Free Tier** - Great for development

## 🔧 Testing

1. **Test webhook endpoint:**
   ```bash
   curl -X POST http://localhost:5000/api/webhooks/client-reply \
     -H "Content-Type: application/json" \
     -d '{
       "email": "test@example.com",
       "from": "test@example.com",
       "message": "Test reply",
       "subject": "Re: Test",
       "timestamp": "2025-11-23T20:00:00Z"
     }'
   ```

2. **Check Supabase dashboard** - Verify data was inserted

3. **Test API endpoints:**
   ```bash
   curl http://localhost:5000/api/replies
   curl http://localhost:5000/api/analytics
   ```

## 🎯 Next Steps

1. ✅ Set up Supabase tables
2. ✅ Configure backend `.env`
3. ✅ Test webhook endpoints
4. ✅ Connect frontend to backend
5. ✅ Deploy to production

---

**Your Supabase backend is ready!** 🚀

