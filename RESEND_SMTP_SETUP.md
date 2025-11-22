# Resend SMTP Setup for Make.com

## 🎯 Using Resend with Make.com

If you want to use Resend for better deliverability and higher limits, here's how to set it up.

---

## 📋 Step 1: Create Resend Account

1. **Go to:** https://resend.com
2. **Sign up** for free account
3. **Verify your email**
4. **Go to API Keys section**
5. **Create new API key**
6. **Copy the API key** (you'll need it)

---

## 📋 Step 2: Verify Domain (Optional but Recommended)

1. **In Resend dashboard:**
   - Go to Domains
   - Add your domain (e.g., thesmartpro.io)
   - Add DNS records to verify
   - Wait for verification

2. **Why verify:**
   - Better deliverability
   - Professional from address
   - Higher sending limits

---

## 📋 Step 3: Configure SMTP in Make.com

### Option A: Using SMTP Module

1. **Add module in Make.com:**
   - Search: **"SMTP"** or **"Email"**
   - Select: **"Send an email via SMTP"**

2. **Configure SMTP Settings:**
   ```
   Connection Name: Resend SMTP
   Host: smtp.resend.com
   Port: 587 (TLS) or 465 (SSL)
   Username: resend
   Password: [Your Resend API Key]
   Security: TLS (for port 587) or SSL (for port 465)
   ```

3. **Configure Email:**
   ```
   From: noreply@yourdomain.com (or your verified email)
   To: {{3.email}}
   Subject: Your subject
   HTML: Your email template
   ```

4. **Save and test**

---

### Option B: Using HTTP Module (Alternative)

If SMTP module doesn't work, use HTTP module:

1. **Add HTTP module:**
   - Type: HTTP > Make a request
   - Method: POST
   - URL: `https://api.resend.com/emails`

2. **Headers:**
   ```
   Authorization: Bearer [Your Resend API Key]
   Content-Type: application/json
   ```

3. **Body (JSON):**
   ```json
   {
     "from": "noreply@yourdomain.com",
     "to": ["{{3.email}}"],
     "subject": "Your Subject",
     "html": "Your HTML template"
   }
   ```

---

## 🔧 Resend SMTP Configuration Details

### SMTP Settings

```
Host: smtp.resend.com
Port: 587 (TLS) or 465 (SSL)
Username: resend
Password: [Your Resend API Key]
From: noreply@yourdomain.com
```

### Port Options

- **Port 587 (TLS):** Recommended, more compatible
- **Port 465 (SSL):** Alternative, requires SSL

---

## 📊 Resend Pricing & Limits

### Free Tier
- 3,000 emails/month
- 100 emails/day
- Good for testing and small volume

### Paid Plans
- Higher limits
- Better support
- More features

---

## ✅ Testing

### Test Email

1. **Run your Make.com scenario**
2. **Check Resend dashboard:**
   - Go to Emails section
   - See sent emails
   - Check delivery status

3. **Check recipient inbox:**
   - Verify email received
   - Check formatting
   - Verify links work

---

## 🎯 Recommendation

**For your use case:**

1. **Start with Make.com Email Module** (easiest)
2. **Test your automation**
3. **If you need more, switch to Resend SMTP**

**Make.com Email module is perfect for getting started!** ✅

---

## 📚 Resources

- Resend Documentation: https://resend.com/docs
- Resend SMTP Guide: https://resend.com/docs/send-with-smtp
- Make.com Email Modules: Check Make.com documentation

---

**For now, use Make.com Email module - upgrade to Resend later if needed!** 🚀

