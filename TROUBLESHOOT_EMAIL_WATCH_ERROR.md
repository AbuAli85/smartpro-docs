# Troubleshoot Email Watch Error - Command Error. 10

## 🚨 **Error: Command Error. 10**

The Email Watch module is failing with "Command Error. 10". This is typically an **IMAP/email connection error**.

---

## 🔍 **Common Causes**

### **1. Connection/Authentication Issues**
- Email account authentication expired
- OAuth token needs refresh
- Password changed
- Account locked

### **2. IMAP Server Issues**
- IMAP server unavailable
- Connection timeout
- Server rate limiting
- Folder access denied

### **3. Configuration Issues**
- Wrong folder name
- Folder doesn't exist
- Permissions issue
- Account type mismatch

---

## 🔧 **Solutions**

### **Solution 1: Re-authenticate Email Connection** ⚠️ MOST COMMON

1. Go to Make.com → **Connections**
2. Find: "My Microsoft SMTP/IMAP OAuth connection (chairman@falconeyegroup.net)"
3. Click **"Re-authenticate"** or **"Update"**
4. Complete OAuth flow again
5. Save connection
6. Test scenario again

**This fixes 80% of "Command Error. 10" issues!**

---

### **Solution 2: Check Folder Name**

1. Open "Email Watch - Client Replies" scenario
2. Click on Module 1 (Email - Watch Emails)
3. Check **Folder** setting:
   - Should be: `INBOX` (case-sensitive)
   - Or try: `Inbox` (capital I)
   - Or try: `INBOX` (all caps)

4. **Verify folder exists:**
   - Check email account
   - Ensure INBOX folder exists
   - Try different folder if needed

---

### **Solution 3: Check Email Account Status**

1. **Verify account is active:**
   - Log into `chairman@falconeyegroup.net`
   - Check if account is locked
   - Check if password changed

2. **Check IMAP access:**
   - Ensure IMAP is enabled
   - Check if 2FA is blocking access
   - Verify app password if needed

---

### **Solution 4: Change Email Module Type**

If Microsoft SMTP/IMAP isn't working, try:

**Option A: Use Gmail Module**
1. Add Gmail connection
2. Use Gmail "Watch emails" module
3. Configure same way

**Option B: Use Outlook Module**
1. Add Outlook connection
2. Use Outlook "Watch emails" module
3. Configure same way

---

### **Solution 5: Adjust Module Settings**

1. **Increase timeout:**
   - Add timeout setting if available
   - Set to 30-60 seconds

2. **Change criteria:**
   - Try "UNSEEN" instead of "ALL"
   - Or "SEEN" if needed

3. **Reduce maxResults:**
   - Set to 1 (already set)
   - Or try 5-10

---

## 🧪 **Step-by-Step Troubleshooting**

### **Step 1: Re-authenticate (5 minutes)**

1. Go to Make.com → **Connections**
2. Find Microsoft SMTP/IMAP connection
3. Click **"Re-authenticate"**
4. Complete OAuth
5. Test scenario

**If this fixes it:** ✅ Done!

**If still error:** Continue to Step 2

---

### **Step 2: Verify Folder (2 minutes)**

1. Open scenario → Module 1
2. Check folder name: `INBOX`
3. Try alternatives:
   - `Inbox`
   - `INBOX` (all caps)
   - Or specific folder name

4. Test scenario

**If this fixes it:** ✅ Done!

**If still error:** Continue to Step 3

---

### **Step 3: Check Account Access (5 minutes)**

1. Log into `chairman@falconeyegroup.net`
2. Verify account is active
3. Check IMAP settings:
   - IMAP enabled?
   - App password needed?
   - 2FA blocking?

4. Test scenario

**If this fixes it:** ✅ Done!

**If still error:** Continue to Step 4

---

### **Step 4: Try Different Module (10 minutes)**

1. **Option A: Use Gmail Module**
   - Add Gmail connection
   - Use Gmail "Watch emails"
   - Configure same way

2. **Option B: Use Outlook Module**
   - Add Outlook connection
   - Use Outlook "Watch emails"
   - Configure same way

3. Test scenario

---

## 📋 **Quick Fix Checklist**

- [ ] Re-authenticate email connection
- [ ] Verify folder name is correct
- [ ] Check email account is active
- [ ] Verify IMAP is enabled
- [ ] Check for account locks
- [ ] Try different folder name
- [ ] Try different email module type
- [ ] Check Make.com status page

---

## 🔍 **Error Code Reference**

**Command Error. 10** typically means:
- IMAP connection failed
- Authentication failed
- Server communication error
- Folder access denied

**Most common fix:** Re-authenticate the connection

---

## 🎯 **Recommended Action**

### **Start Here (Most Likely Fix):**

1. **Re-authenticate connection:**
   - Make.com → Connections
   - Find Microsoft SMTP/IMAP connection
   - Click "Re-authenticate"
   - Complete OAuth
   - Test scenario

**This fixes most "Command Error. 10" issues!**

---

## 📝 **Alternative: Use Different Email Service**

If Microsoft SMTP/IMAP keeps failing:

### **Option 1: Use Gmail**
- More reliable for Make.com
- Better OAuth support
- Easier to configure

### **Option 2: Use Outlook 365**
- Native Microsoft integration
- Better for Microsoft accounts
- More stable

### **Option 3: Use Resend/SendGrid**
- API-based (more reliable)
- Better webhook support
- Professional email service

---

## 🚀 **Quick Test**

After re-authenticating:

1. **Test Module 1:**
   - Run scenario manually
   - Check if Module 1 executes
   - Look for any errors

2. **If Module 1 works:**
   - Module 2 should work
   - Test complete flow

3. **If Module 1 still fails:**
   - Try different email module
   - Or check account settings

---

## 📞 **If Still Not Working**

1. **Check Make.com Status:**
   - Visit Make.com status page
   - Check for service outages

2. **Check Email Provider:**
   - Microsoft 365 status
   - IMAP service status

3. **Contact Support:**
   - Make.com support
   - Email provider support

---

## ✅ **Most Likely Solution**

**Re-authenticate the email connection!**

1. Make.com → Connections
2. Find Microsoft SMTP/IMAP connection
3. Re-authenticate
4. Test again

**This should fix the error!** 🚀

---

**Start by re-authenticating the email connection - that's the most common fix!** ✅

