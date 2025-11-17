# Make.com Email Troubleshooting Guide

## 🚨 Current Issues

### Issue 1: `to` Field Error
```
[422] The `to` field must be a `string`.
Error: "to": [null]
```

**OR**

```
Validation failed for 1 parameter(s).
Missing value of required parameter 'to'.
To: 25.email (empty)
```

### Issue 2: Empty Template Variables
- "Dear ," (missing client name)
- "Thank you for contacting Smartpro about ." (missing service)
- Subject: "Welcome to Smartpro – " (missing service)
- Subject showing literal text: "Welcome to Smartpro – 1. service_interested" (variable not parsed)

---

## ✅ Complete Fix Guide

### Step 1: Fix the `to` Field in Resend Modules

**For Modules 5, 11, 14, 17 (Resend Email modules):**

1. Open each Resend module in Make.com
2. Find the **"To"** field
3. **Change from:** 
   - `{{2.email}}` ❌ (Module 2 doesn't output email)
   - `{{25.email}}` ❌ (May be empty - use `{{1.email}}` instead)
   - Any array format ❌
4. **Change to:** `{{1.email}}` ✅
5. **Important:** Set the field type to **"Single email address"** (not "Multiple recipients")
6. Save the module

**Why:** 
- Module 2 (Google Sheets) doesn't output email data
- Module 25 (Set Variables) may have scoping issues - `{{25.email}}` can be empty
- Module 1 (Webhook) is the most reliable source - always use `{{1.email}}`

**If `{{1.email}}` is also empty:**
- Check that the webhook is receiving the email field
- Verify the frontend is sending `email` in the payload
- Add a filter to skip email if `{{1.email}}` is empty

---

### Step 2: Fix Template Variables

The email template needs to use the correct Make.com variables. Here's what each variable should be:

#### Required Variables in Email Template

| Template Location | Correct Variable | Module Source |
|-------------------|------------------|---------------|
| **Greeting** | `{{1.client_name}}` | Webhook Module 1 |
| **AI Content** | `{{3.choices[1].message.content}}` | GPT Module (varies by route) |
| **Subject Line** | Include `{{1.service_interested}}` | Webhook Module 1 |

**Module-Specific AI Content Variables:**
- **Accounting Route (Module 5):** `{{3.choices[1].message.content}}`
- **PRO Services Route (Module 11):** `{{10.choices[1].message.content}}`
- **Company Formation Route (Module 14):** `{{13.choices[1].message.content}}`
- **Default Route (Module 17):** `{{16.choices[1].message.content}}`

**⚠️ Note:** You're currently using Module 17 (Default route), so use `{{16.choices[1].message.content}}` for the AI content.

#### Current Template Issues

**❌ Wrong (what's currently in Make.com):**
```html
<p>Dear ,</p>
<p>Thank you for contacting Smartpro about .</p>
```

**✅ Correct:**
```html
<p>Dear {{1.client_name}},</p>
<div>{{3.choices[1].message.content}}</div>
```

---

### Step 3: Update Email Template in Make.com

For each Resend module (5, 11, 14, 17), update the HTML template:

#### For Accounting Route (Module 5)

**Subject Line:**
```
Consultation request received – {{1.service_interested}} | Smartpro Business Hub
```

**⚠️ Important:** Make sure to use double curly braces `{{}}` in the subject field. If you see literal text like `1. service_interested` instead of the actual value, the variable syntax is wrong.

**❌ Wrong:**
- `Welcome to Smartpro – 1. service_interested` (no curly braces)
- `Welcome to Smartpro – {1.service_interested}` (single curly braces)

**✅ Correct:**
- `Welcome to Smartpro – {{1.service_interested}}` (double curly braces)

**HTML Template:**
```html
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f7fa;padding:40px 0;font-family:'Segoe UI', Tahoma, Arial, sans-serif;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.1);max-width:600px;">
        
        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg, #0d3c61 0%, #1a5a8a 100%);padding:30px 40px;color:#ffffff;font-size:24px;font-weight:bold;text-align:center;">
            Smartpro Business Hub &amp; Services
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:45px 40px;color:#2d3748;font-size:16px;line-height:1.8;">
            
            <!-- Greeting -->
            <p style="margin:0 0 25px 0;font-size:18px;font-weight:600;color:#1a202c;">
              Dear {{1.client_name}},
            </p>

            <!-- AI body content -->
            <div style="white-space:pre-wrap;color:#4a5568;margin-bottom:30px;font-size:15px;line-height:1.8;">
              {{3.choices[1].message.content}}
            </div>

            <!-- Call-to-Action Section -->
            <div style="background:#f7fafc;border-left:4px solid #0d3c61;padding:20px;margin:35px 0;border-radius:6px;">
              <p style="margin:0 0 15px 0;color:#2d3748;font-size:15px;font-weight:500;">
                You may also click the button below to schedule a call at your convenience.
              </p>
              
              <!-- Button -->
              <p style="text-align:center;margin:0;">
                <a href="https://thesmartpro.io/book"
                   style="background:#0d3c61;color:#ffffff;text-decoration:none;padding:16px 32px;
                          border-radius:8px;font-size:16px;font-weight:600;display:inline-block;
                          transition:background-color 0.3s;box-shadow:0 2px 8px rgba(13,60,97,0.2);">
                  Schedule a Call
                </a>
              </p>
            </div>

            <!-- Closing -->
            <p style="margin:30px 0 0 0;color:#4a5568;font-size:15px;">
              Best regards,<br>
              <span style="font-weight:600;color:#1a202c;">Smartpro Business Hub &amp; Services</span>
            </p>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f0f2f5;padding:25px 40px;font-size:13px;color:#718096;text-align:center;border-top:1px solid #e2e8f0;">
            <p style="margin:0;line-height:1.6;">
              <a href="https://thesmartpro.io" style="color:#0d3c61;text-decoration:none;font-weight:500;">www.thesmartpro.io</a>
              <span style="margin:0 8px;color:#cbd5e0;">|</span>
              <a href="mailto:support@portal.thesmartpro.io" style="color:#0d3c61;text-decoration:none;font-weight:500;">
                support@portal.thesmartpro.io
              </a>
            </p>
            <p style="margin:12px 0 0 0;font-size:12px;color:#a0aec0;">
              © 2024 Smartpro Business Hub & Services. All rights reserved.
            </p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
```

**⚠️ Important:** For other routes, change the AI content variable:
- **Module 11 (PRO):** Use `{{10.choices[1].message.content}}`
- **Module 14 (Company Formation):** Use `{{13.choices[1].message.content}}`
- **Module 17 (Default):** Use `{{16.choices[1].message.content}}`

---

### Step 4: Verify Data Flow

Check that data is flowing correctly through the scenario:

1. **Webhook Module (1):**
   - Verify `1.email` exists
   - Verify `1.client_name` exists
   - Verify `1.service_interested` exists

2. **GPT Module (3/10/13/16):**
   - Verify `choices[1].message.content` exists
   - Check the module execution log

3. **Resend Module (5/11/14/17):**
   - **To:** `{{1.email}}` (string, not array)
   - **Subject:** Include `{{1.service_interested}}`
   - **HTML:** Use correct variables as shown above

---

## 🔍 Debugging Steps

### Check 1: Verify Webhook Data

In Make.com, run a test execution and check Module 1 (Webhook) output:
- Look for `email` field
- Look for `client_name` field
- Look for `service_interested` field

**If missing:** Check frontend payload is sending these fields.

### Check 2: Verify GPT Output

Check the GPT module (3, 10, 13, or 16) output:
- Look for `choices[1].message.content`
- If missing, check GPT module configuration

### Check 3: Verify Resend Configuration

In Resend module:
- **To field:** Should be `{{1.email}}` (single string, NOT `{{25.email}}` or `{{2.email}}`)
- **Subject:** Should include variables with double curly braces: `{{1.service_interested}}`
  - ❌ Wrong: `1. service_interested` (literal text)
  - ✅ Correct: `{{1.service_interested}}` (variable)
- **HTML:** Should use `{{1.client_name}}` or `{{25.client_name}}` and AI content variable
- **Variable syntax:** Always use `{{module.field}}` format with double curly braces

### Check 4: Test with Sample Data

Send a test webhook with:
```json
{
  "client_name": "Test User",
  "email": "test@example.com",
  "service_interested": "Accounting",
  "notes": "Test submission"
}
```

Then check:
1. Does Module 1 receive the data? ✅
2. Does GPT module generate content? ✅
3. Does Resend module have correct `to` field? ✅
4. Does email template populate variables? ✅

---

## 📋 Quick Checklist

Before testing, verify:

- [ ] **To field:** Changed from `{{2.email}}` to `{{1.email}}`
- [ ] **To field format:** Set to "Single email address" (not array)
- [ ] **Subject line:** Includes `{{1.service_interested}}`
- [ ] **Greeting:** Uses `{{1.client_name}}`
- [ ] **AI content:** Uses correct module variable (`{{3.choices[1].message.content}}` etc.)
- [ ] **Template:** Copied correct HTML template
- [ ] **Route-specific:** Using correct GPT module variable for each route

---

## 🎯 Expected Result After Fix

**Email should show:**
- ✅ **To:** `test@example.com` (valid email string)
- ✅ **Subject:** `Consultation request received – Accounting | Smartpro Business Hub`
- ✅ **Greeting:** `Dear Test User,`
- ✅ **Body:** AI-generated content from GPT module
- ✅ **No 422 errors**

---

## 📝 Additional Notes

### Why Variables Are Empty

1. **Wrong module reference:** Using `{{2.email}}` instead of `{{1.email}}`
2. **Wrong variable name:** Using `{{name}}` instead of `{{1.client_name}}`
3. **Wrong GPT variable:** Using wrong module ID for AI content
4. **Data not available:** Webhook didn't receive the data

### Make.com Variable Syntax

- `{{1.field}}` = Field from Module 1 (Webhook)
- `{{3.choices[1].message.content}}` = AI content from Module 3 (GPT)
- `{{25.email}}` = Email from Module 25 (Set Variables) - also valid

### Array vs String

- ❌ **Array format:** `"to": [null]` or `"to": ["email@example.com"]`
- ✅ **String format:** `"to": "email@example.com"`

Resend requires a **string**, not an array.

---

**Status:** 🔴 Critical Fix Required  
**Last Updated:** 2024  
**Priority:** Blocks all email delivery

