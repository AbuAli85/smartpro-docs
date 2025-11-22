# Quick Test Checklist

**Use this checklist for rapid testing after fixes**

---

## ⚡ Quick Test (5 minutes)

### 1. Full Form Test
- [ ] Submit form with all fields
- [ ] Check Make.com execution: ✅ Success
- [ ] Check Google Sheets:
  - [ ] Column E (Business Name) has value ✅
  - [ ] Column O (Notes) has structured data ✅
  - [ ] Column Q (Source) = "smartpro-consultation-form" ✅
- [ ] Check email received

**Time:** ~2 minutes

---

### 2. Service Routing Test
- [ ] Submit with "Accounting" → Routes to Accounting ✅
- [ ] Submit with "PRO Services" → Routes to PRO ✅
- [ ] Submit with "Company Formation" → Routes to Company Formation ✅
- [ ] Submit with "VAT" → Routes to Default ✅

**Time:** ~3 minutes

---

## 🔍 Detailed Verification

### Make.com Execution Check
1. Open Make.com scenario
2. Click "Executions" tab
3. Find latest execution
4. Click to view details
5. Verify:
   - [ ] Module 1 (Webhook): Data received
   - [ ] Module 25 (Set Variables): Variables set
   - [ ] Module 2 (Add Row): Row added
   - [ ] Router: Correct route taken
   - [ ] GPT Module: Content generated
   - [ ] Email Module: Email sent
   - [ ] Update Row: Status updated

### Google Sheets Check
1. Open "Smartpro Leads" spreadsheet
2. Go to "leads" sheet
3. Find latest row
4. Verify columns:
   - [ ] E = Business Name ✅
   - [ ] O = Notes (structured) ✅
   - [ ] Q = "smartpro-consultation-form" ✅
   - [ ] R = "Sent" (after email)

### Email Check
1. Check inbox
2. Verify:
   - [ ] Email received
   - [ ] Subject correct
   - [ ] Content matches service route

---

## ❌ Common Issues & Fixes

### Issue: Column E (Business Name) Empty
**Fix:** Verify backend sends `business_name` (not `company`)

### Issue: Column O (Notes) Empty
**Fix:** Verify backend builds `notes` field

### Issue: Column Q (Source) Empty
**Fix:** Verify backend sends `source: 'smartpro-consultation-form'`

### Issue: Wrong Route Taken
**Fix:** Check `service_interested` value in Make.com Module 1 output

---

**Status:** Ready for Quick Test  
**Estimated Time:** 5-10 minutes

