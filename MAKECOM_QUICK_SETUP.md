# Make.com Follow-Up - Quick Setup Guide

**Time Required:** 2 hours  
**Complexity:** Simple  
**Impact:** High

---

## 🎯 Quick Start (Simplest Version)

This is the easiest way to add follow-up automation without complex scheduling.

---

## Step 1: Update Google Sheets (5 minutes)

Add these columns:

| Column | Name | Default Value |
|--------|------|---------------|
| I | Response Status | "No Response" |
| K | Follow-up Count | 0 |

---

## Step 2: Add One Follow-Up Module (30 minutes)

### After Module 7/12/15/18 (Google Sheets Update)

**Add Module:** Google Sheets - Update Row

**Purpose:** Set initial status

**Configuration:**
- Find row by: Email = `{{1.email}}`
- Update:
  ```
  Column I: "No Response"
  Column K: 0
  ```

---

## Step 3: Create Simple Follow-Up (1 hour)

### Module 19: Manual Follow-Up Trigger

**Type:** Webhook (Manual)

**Purpose:** Team can trigger follow-up manually

**Configuration:**
- Create webhook URL
- Accept: `email` parameter

---

### Module 20: Check Status

**Type:** Google Sheets - Search Rows

**Find:** Row where Email = `{{19.email}}`

**Check:** Response Status = "No Response"

---

### Module 21: Send Follow-Up

**Type:** Resend - Send Email

**Only if:** Status = "No Response"

**Email:** Use Follow-up 1 template from main guide

---

### Module 22: Update Sheets

**Type:** Google Sheets - Update Row

**Update:**
```
Column K: 1 (increment)
Column L: {{now}} (today's date)
```

---

## Step 4: Create Simple Web Interface (Optional)

Create a simple page where team can:
1. Enter email address
2. Click "Send Follow-up"
3. System checks status and sends if appropriate

**Or:** Use Make.com's webhook URL directly

---

## 📋 Manual Process (Even Simpler)

If automation is too complex:

1. **Daily Task:** Check Google Sheets for leads older than 3 days
2. **Filter:** Response Status = "No Response"
3. **Action:** Send follow-up email manually
4. **Update:** Change Follow-up Count to 1, Last Follow-up Date to today

**Time:** 10 minutes per day  
**Benefit:** Still tracks everything in one place

---

## 🎯 Recommended: Hybrid Approach

**Automated:**
- Initial email ✅ (already working)
- Google Sheets tracking ✅ (already working)

**Semi-Automated:**
- Follow-up emails (team triggers via button)
- Response tracking (team updates manually)

**Benefits:**
- Less complex than full automation
- More reliable than manual process
- Team has control
- Still tracks everything

---

## 📊 Simple Tracking Template

Create a simple dashboard in Google Sheets:

| Email | Service | Days Since | Status | Follow-ups | Action |
|-------|---------|-----------|--------|------------|--------|
| client@example.com | VAT | 5 | No Response | 0 | Send Follow-up 1 |
| client2@example.com | Accounting | 2 | No Response | 0 | Wait |
| client3@example.com | PRO Services | 8 | Replied | 1 | Respond |

**Formula for "Days Since":**
```
=DAYS(TODAY(), A2)
```

**Formula for "Action":**
```
=IF(AND(I2="No Response", K2=0, DAYS(TODAY(), A2)>=3), "Send Follow-up 1", IF(AND(I2="No Response", K2=1, DAYS(TODAY(), A2)>=7), "Send Follow-up 2", "Wait"))
```

---

## ✅ This Approach Gives You:

1. ✅ **Tracking:** All leads tracked in one place
2. ✅ **Visibility:** See which leads need follow-up
3. ✅ **Control:** Team decides when to follow up
4. ✅ **Consistency:** Same process for everyone
5. ✅ **Scalability:** Easy to add more automation later

---

**Start with this, then add full automation later if needed!**

