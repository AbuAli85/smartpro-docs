# Make.com Router Setup Guide

## 🎯 Router Configuration

Your Router (Module 4) needs to be configured to route by language.

---

## 📋 Step-by-Step Router Setup

### Step 1: Configure Route 1 (Arabic)

1. **Click on Router module (Module 4)**
2. **Click on Route 1** (first route)
3. **Set Condition:**
   - Field: `{{3.language}}`
   - Operator: `equals`
   - Value: `ar`
4. **Click "Save"**

### Step 2: Configure Route 2 (English)

1. **Click on Route 2** (second route)
2. **Set Condition:**
   - Field: `{{3.language}}`
   - Operator: `equals`
   - Value: `en`
3. **Click "Save"**

---

## 🔧 Replace Placeholder Modules

### Route 1: Arabic Path

**Delete placeholder module, then add:**

1. **Email: Confirmation (Arabic)**
   - Type: Email > Send an email
   - To: `{{3.email}}`
   - Subject: `شكراً لتواصلك معنا - طلب الاستشارة`
   - HTML: Use Arabic confirmation template

2. **Sleep** (Optional)
   - Duration: 5 seconds

3. **ChatGPT** (Optional)
   - Generate welcome email in Arabic

4. **Email: Welcome (Arabic)**
   - Use ChatGPT output

5. **Google Sheets: Update**
   - Mark welcome_sent = TRUE

6. **Email: Provider Notification**

---

### Route 2: English Path

**Delete placeholder module, then add:**

1. **Email: Confirmation (English)**
   - Subject: `Thank You for Your Consultation Request`
   - HTML: Use English confirmation template

2. **Sleep** (5 seconds)

3. **ChatGPT**
   - Generate welcome email in English

4. **Email: Welcome (English)**
   - Use ChatGPT output

5. **Google Sheets: Update**
   - Mark welcome_sent = TRUE

6. **Email: Provider Notification**

---

## ✅ Router Configuration Summary

**Route 1:**
- Condition: `{{3.language}}` equals `ar`
- Modules: Confirmation → Sleep → ChatGPT → Welcome → Update → Notification

**Route 2:**
- Condition: `{{3.language}}` equals `en`
- Modules: Confirmation → Sleep → ChatGPT → Welcome → Update → Notification

---

**Configure the router conditions and replace placeholders with real modules!** ✅

