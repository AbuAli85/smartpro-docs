# Troubleshooting Connection Pooling Connection

## ✅ What's Correct:
- ✅ Hostname: `aws-0-us-east-1.pooler.supabase.com` (correct pooler hostname)
- ✅ Port: `6543` (connection pooling port)
- ✅ Format: Connection string format is correct

## ❌ Still Can't Connect?

Try these solutions in order:

---

## Solution 1: Check Password & URL Encoding

### Issue: Special Characters in Password
If your password contains special characters (`@`, `#`, `%`, `&`, etc.), they need to be URL-encoded.

**Common special characters that need encoding:**
- `@` → `%40`
- `#` → `%23`
- `%` → `%25`
- `&` → `%26`
- `+` → `%2B`
- `=` → `%3D`
- `/` → `%2F`
- `?` → `%3F`

**Example:**
If your password is `MyPass@123#`, it should be:
```
postgresql://postgres.reootcngcptfogfozlmz:MyPass%40123%23@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

**Quick Fix:**
1. Go to [URL Encoder](https://www.urlencoder.org/)
2. Paste your password
3. Copy the encoded version
4. Use it in your connection string

---

## Solution 2: Check IP Restrictions

### Issue: Supabase might be blocking connections

1. Go to **Supabase Dashboard** → Your Project
2. Navigate to **Settings** → **Database**
3. Scroll to **Connection pooling** section
4. Check if **"Restrict connections to specific IP addresses"** is enabled
5. If enabled:
   - Either disable it (for testing)
   - Or add Vercel's IP ranges (not recommended - Vercel uses dynamic IPs)

**Recommended:** Disable IP restrictions for connection pooling when using Vercel.

---

## Solution 3: Verify Connection Pooling is Enabled

### Issue: Connection pooling might not be enabled for your project

1. Go to **Supabase Dashboard** → Your Project
2. Navigate to **Settings** → **Database**
3. Scroll to **Connection pooling** section
4. Ensure connection pooling is **enabled** for your project
5. If not enabled, enable it (this might require a paid plan)

---

## Solution 4: Test Password Locally

### Issue: Password might be incorrect

1. Try connecting with a database client (like DBeaver, pgAdmin, or `psql`)
2. Use the **direct connection** (port 5432) to test:
   ```
   postgresql://postgres:YOUR_PASSWORD@db.reootcngcptfogfozlmz.supabase.co:5432/postgres
   ```
3. If direct connection works but pooling doesn't, it's likely an IP restriction or pooling configuration issue

---

## Solution 5: Check Supabase Project Status

### Issue: Project might be paused or inactive

1. Go to **Supabase Dashboard**
2. Check if your project shows as **"Active"**
3. If paused, resume it
4. Free tier projects can pause after inactivity

---

## Solution 6: Try Direct Connection (Temporary)

### If connection pooling still doesn't work:

**Note:** Direct connection (port 5432) is NOT recommended for Vercel, but you can test if it works:

```
postgresql://postgres:YOUR_PASSWORD@db.reootcngcptfogfozlmz.supabase.co:5432/postgres
```

**Why this might work:**
- No IP restrictions on direct connection
- Different authentication method

**Why this is NOT recommended:**
- Will fail under load in serverless
- Connection limits are lower
- Not designed for serverless functions

---

## Solution 7: Verify Vercel Environment Variable

### Issue: Variable might not be set correctly

1. Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**
2. Verify `DATABASE_URL` is set
3. Click **Edit** and check:
   - No extra spaces
   - Password is correct (and URL-encoded if needed)
   - Complete string is there
4. **Redeploy** after any changes

---

## Most Common Issues:

1. **Password with special characters** → URL encode it
2. **IP restrictions enabled** → Disable them for connection pooling
3. **Connection pooling not enabled** → Enable it in Supabase
4. **Wrong password** → Reset it and try again

---

## Quick Test Checklist:

- [ ] Password is correct (test with direct connection)
- [ ] Password is URL-encoded if it has special characters
- [ ] IP restrictions are disabled for connection pooling
- [ ] Connection pooling is enabled in Supabase
- [ ] Project is active (not paused)
- [ ] `DATABASE_URL` is correctly set in Vercel
- [ ] Redeployed after setting `DATABASE_URL`

---

## Still Not Working?

If none of these work, the issue might be:
- Supabase project configuration
- Network/firewall blocking
- Vercel-specific networking issue

**Next steps:**
1. Check Supabase logs/dashboard for connection attempts
2. Try connecting from a different environment (local machine)
3. Contact Supabase support if project-specific

---

Good luck! 🎉

