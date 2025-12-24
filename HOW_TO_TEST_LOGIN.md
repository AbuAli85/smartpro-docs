# 🧪 How to Test Login at BusinessHub

**Quick guide to test authentication and single sign-on**

---

## 🚀 Step 1: Start the Development Server

**Make sure you have the `.env` file created first:**

```bash
# In the root directory
# Copy .env.example to .env (if not done already)
Copy-Item .env.example .env

# Start the client
cd client
npm run dev
```

**The app should start at:** `http://localhost:5173` (or similar)

---

## 🔐 Step 2: Navigate to Login Page

**Option 1: Direct URL**
```
http://localhost:5173/marketplace/auth/sign-in
```

**Option 2: From Services Page**
1. Go to: `http://localhost:5173/marketplace/services`
2. Click "Sign In" button (top right)

**Option 3: From Create Service**
1. Go to: `http://localhost:5173/marketplace/services/create`
2. If not logged in, you'll be redirected to sign-in

---

## ✅ Step 3: Test Login

### **Test with Existing User (from other platforms)**

Since all platforms use the same Supabase project (`reootcngcptfogfozlmz`), you can use the same credentials:

1. **Enter email** (from Contract-Management-System or business-services-hub)
2. **Enter password**
3. **Click "Sign In"**

**Expected:**
- ✅ Success message: "Signed in successfully!"
- ✅ Redirected to `/marketplace/services`
- ✅ User info displayed in the header

---

## 🔄 Step 4: Test Single Sign-On (SSO)

**⚠️ Note:** SSO only works if all platforms use `storageKey: 'sb-auth-token'`

### **Test Flow:**

1. **Login on Contract-Management-System** (or business-services-hub)
   - Use your credentials
   - Make sure you're logged in

2. **Open BusinessHub** in the same browser
   - Go to: `http://localhost:5173/marketplace/services`
   - **Expected:** You should be automatically logged in! ✅

3. **Check Session Sharing:**
   - Open browser console (F12)
   - Check localStorage: `localStorage.getItem('sb-auth-token')`
   - Should see the session token

---

## 🆕 Step 5: Test Sign Up (New User)

**If you need to create a new account:**

1. **Navigate to:** `http://localhost:5173/marketplace/auth/sign-up`

2. **Fill in the form:**
   - Full Name
   - Email
   - Password
   - Confirm Password

3. **Click "Create Account"**

4. **Check email** for verification link (if email confirmation is enabled)

5. **After verification**, you can sign in

---

## 🔍 Step 6: Verify Authentication

**Check if you're logged in:**

1. **Go to:** `http://localhost:5173/marketplace/services`
2. **Look for:**
   - User email/name in the header
   - "Sign Out" button (instead of "Sign In")
   - Ability to create services

**Or check browser console:**
```javascript
// Check localStorage
localStorage.getItem('sb-auth-token')

// Check Supabase session (in browser console)
// The session should be automatically managed by SupabaseAuthContext
```

---

## 🐛 Troubleshooting

### **"Missing Supabase environment variables"**
**Solution:**
- Make sure `.env` file exists in root directory
- Check it has `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- Restart the dev server

### **"Invalid login credentials"**
**Solution:**
- Verify the user exists in Supabase
- Check email/password are correct
- Try creating a new account first

### **"Single sign-on not working"**
**Solution:**
- Verify all platforms use `storageKey: 'sb-auth-token'`
- Check browser console for errors
- Clear browser cache and try again
- Make sure you're using the same browser

### **"Redirected to sign-in but already logged in"**
**Solution:**
- Check browser console for errors
- Verify Supabase client is configured correctly
- Check if session is stored in localStorage

---

## 📋 Quick Test Checklist

- [ ] `.env` file created with Supabase credentials
- [ ] Development server running
- [ ] Can access `/marketplace/auth/sign-in`
- [ ] Can sign in with existing credentials
- [ ] Redirected to services page after login
- [ ] User info displayed when logged in
- [ ] Can sign out successfully
- [ ] SSO works (if other platforms updated)

---

## 🎯 Expected Behavior

**When Logged In:**
- ✅ User email/name shown in header
- ✅ "Sign Out" button visible
- ✅ Can create/edit services
- ✅ Protected routes accessible

**When Not Logged In:**
- ✅ Redirected to sign-in page
- ✅ "Sign In" button visible
- ✅ Cannot access protected routes

**With SSO (after updating other platforms):**
- ✅ Login once → logged in everywhere
- ✅ Session persists across platforms
- ✅ Logout from one → logout from all

---

## 🔗 Useful URLs

- **Sign In:** `/marketplace/auth/sign-in`
- **Sign Up:** `/marketplace/auth/sign-up`
- **Services:** `/marketplace/services`
- **Create Service:** `/marketplace/services/create`

---

**Ready to test!** 🚀

If you encounter any issues, check the browser console and server logs for error messages.

