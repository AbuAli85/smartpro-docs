# 🚀 Quick Start Guide - Service Management

## **Your Database is Ready!** ✅

Your Supabase database is set up with all tables and policies. Now let's get it working!

---

## **Step 1: Get API Keys (2 minutes)**

1. Go to: https://supabase.com/dashboard/project/xavocdikwiimrjgybiai/settings/api
2. Copy these values:

### **anon public key:**
- Under "Project API keys" → "anon" → "public"
- Copy the key (starts with `eyJ...`)

### **service_role key:**
- Under "Project API keys" → "service_role" → "secret"
- Copy the key (keep this secret!)

---

## **Step 2: Create .env File (1 minute)**

Create `.env` file in project root (`smartpro-docs/.env`):

```env
VITE_SUPABASE_URL=https://xavocdikwiimrjgybiai.supabase.co
VITE_SUPABASE_ANON_KEY=paste_your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=paste_your_service_role_key_here
```

**Replace the placeholder values with your actual keys!**

---

## **Step 3: Test Connection (1 minute)**

```bash
# Install test dependencies (if needed)
pnpm add -D tsx dotenv

# Run connection test
npx tsx test-supabase-connection.ts
```

You should see:
```
✅ profiles: Table exists
✅ services: Table exists
✅ bookings: Table exists
✅ contracts: Table exists
✅ invoices: Table exists
✅ Connection test complete!
```

---

## **Step 4: Start Development Server (30 seconds)**

```bash
pnpm dev
```

Server will start on: `http://localhost:3000`

---

## **Step 5: Test Service Management (2 minutes)**

1. **Navigate to Services:**
   ```
   http://localhost:3000/marketplace/services
   ```

2. **You should see:**
   - Service management page
   - Stats dashboard (all zeros initially)
   - "Create Service" button

3. **Create Your First Service:**
   - Click "Create Service"
   - Fill in the form:
     - Title: "Test Service"
     - Description: "This is a test service"
     - Category: Select any category
     - Price: 100
   - Click "Create Service"
   - You should see it in the list!

---

## **✅ Success Indicators**

If everything works:
- ✅ Service list page loads
- ✅ You can create a service
- ✅ Service appears in the list
- ✅ You can view service details
- ✅ You can edit the service

---

## **🔧 Troubleshooting**

### **"Failed to load services" Error:**
- Check `.env` file exists and has correct values
- Verify Supabase project is active
- Check browser console for specific errors

### **"Permission denied" Error:**
- You need to be authenticated
- Create a user in Supabase Auth first
- Or temporarily disable RLS for testing (not recommended for production)

### **"Table not found" Error:**
- Verify migrations ran successfully
- Check Supabase dashboard → Table Editor
- Verify table names match

---

## **🎯 What's Next?**

After testing service management:

1. **Add Authentication**
   - Set up Supabase Auth
   - Create login/register pages
   - Protect routes

2. **Start Booking System**
   - Extract booking components
   - Create booking pages
   - Integrate with services

3. **Add Enterprise Features**
   - Contract management
   - CRM system
   - Invoice management

---

## **📞 Quick Reference**

- **Supabase Dashboard:** https://supabase.com/dashboard/project/xavocdikwiimrjgybiai
- **SQL Editor:** Dashboard → SQL Editor
- **Table Editor:** Dashboard → Table Editor
- **API Settings:** Dashboard → Settings → API

---

**🚀 Ready to go! Follow the steps above and you'll be creating services in minutes!**

