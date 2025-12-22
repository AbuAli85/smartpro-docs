# Simple Fix: Set DATABASE_URL

## The Problem
Data not saving to Supabase because `DATABASE_URL` is not set.

## The Solution (3 Steps)

### Step 1: Get Your Connection String
1. Go to **Supabase Dashboard** → **Settings** → **Database**
2. Copy the connection string (URI format)
3. Replace `[YOUR-PASSWORD]` with your actual password

**Example:**
```
postgresql://postgres:yourpassword123@db.reootcngcptfogfozlmz.supabase.co:5432/postgres
```

### Step 2: Add to Vercel
1. Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**
2. Click **Add New**
3. Key: `DATABASE_URL`
4. Value: Paste your connection string
5. Environment: **All**
6. Click **Save**

### Step 3: Redeploy
- Click **Redeploy** in Vercel, or push a new commit

## Done! ✅

After redeploy, test:
```
https://your-api-url.vercel.app/api/consultation/test-db
```

Should return: `{"success": true, ...}`

That's it! 🎉

