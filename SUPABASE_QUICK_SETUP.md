# Supabase Quick Setup Guide

## 🎯 **Your Supabase Project**

**Project URL:** https://xavocdikwiimrjgybiai.supabase.co

---

## 📋 **Step 1: Get API Keys**

1. Go to your Supabase project: https://supabase.com/dashboard/project/xavocdikwiimrjgybiai
2. Navigate to **Settings** → **API**
3. Copy these values:

### **Project URL:**
```
https://xavocdikwiimrjgybiai.supabase.co
```

### **anon public key:**
- Copy from "Project API keys" → "anon" → "public"

### **service_role key:**
- Copy from "Project API keys" → "service_role" → "secret" (keep this secret!)

---

## 📋 **Step 2: Add Environment Variables**

Create or update `.env` file in project root:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://xavocdikwiimrjgybiai.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# App Configuration
VITE_APP_URL=http://localhost:3000
NODE_ENV=development
```

**⚠️ Important:** Never commit `.env` to git!

---

## 📋 **Step 3: Run Database Migrations**

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Click **New Query**
4. Copy and paste the SQL from `SUPABASE_SCHEMA_SETUP.md`
5. Run the query (click "Run" or press Ctrl+Enter)

**Or use Supabase CLI:**
```bash
# Install Supabase CLI (if not installed)
npm install -g supabase

# Link to your project
supabase link --project-ref xavocdikwiimrjgybiai

# Run migrations
supabase db push
```

---

## 📋 **Step 4: Verify Setup**

### **Test Connection:**
```typescript
// In browser console or test file
import { supabase } from '@/lib/supabase/client'

// Test connection
const { data, error } = await supabase.from('profiles').select('count')
console.log('Connection:', error ? 'Failed' : 'Success')
```

### **Check Tables:**
1. Go to **Table Editor** in Supabase dashboard
2. Verify these tables exist:
   - ✅ profiles
   - ✅ services
   - ✅ bookings
   - ✅ contracts
   - ✅ invoices

---

## 📋 **Step 5: Create Test User (Optional)**

1. Go to **Authentication** → **Users**
2. Click **Add User** → **Create new user**
3. Enter email and password
4. User will be created in `auth.users`
5. Profile will be auto-created in `profiles` table (via trigger)

---

## ✅ **Quick Verification Checklist**

- [ ] Environment variables added to `.env`
- [ ] Database migrations run successfully
- [ ] Tables created (profiles, services, bookings, etc.)
- [ ] RLS policies enabled
- [ ] Test user created (optional)
- [ ] Connection tested

---

## 🚀 **Next: Test Service Management**

After setup:

1. **Start dev server:**
   ```bash
   pnpm dev
   ```

2. **Navigate to:**
   ```
   http://localhost:3000/marketplace/services
   ```

3. **Create your first service!**

---

## 🔧 **Troubleshooting**

### **Connection Error:**
- Check environment variables are set correctly
- Verify project URL is correct
- Check anon key is correct

### **Table Not Found:**
- Run migrations again
- Check SQL Editor for errors
- Verify table names match

### **RLS Policy Errors:**
- Check policies are created
- Verify user is authenticated
- Check user role in profiles table

---

## 📞 **Support**

If you encounter issues:
1. Check Supabase dashboard logs
2. Check browser console for errors
3. Verify environment variables
4. Test connection manually

---

**🎯 Ready to set up! Follow the steps above to get your database configured.**

