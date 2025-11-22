# Make.com Google Sheets Integration Setup

## 🎯 Purpose

Set up Google Sheets integration to:
1. Store all consultation submissions
2. Track email status (sent, opened, replied)
3. Enable follow-up automation
4. Create analytics dashboard

---

## 📋 Step-by-Step Setup

### Step 1: Create Google Sheets Spreadsheet

#### 1.1 Create New Spreadsheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create new spreadsheet
3. Name it: "Smartpro Consultation Submissions"

#### 1.2 Set Up Columns

**Row 1 (Headers):**
```
A: submission_id
B: submitted_at
C: client_name
D: email
E: phone
F: business_name
G: business_type
H: service_interested
I: service_interested_translated
J: services_summary
K: budget
L: timeline
M: preferred_contact
N: preferred_time
O: location
P: primary_message
Q: language
R: source
O: timestamp
T: confirmation_sent
U: welcome_sent
V: welcome_sent_at
W: follow_up_1_sent
X: follow_up_1_sent_at
Y: follow_up_2_sent
Z: follow_up_2_sent_at
AA: follow_up_3_sent
AB: follow_up_3_sent_at
AC: client_replied
AD: client_replied_at
AE: consultation_scheduled
AF: consultation_scheduled_at
AG: provider_notified
AH: notes
```

#### 1.3 Format Headers
- Make Row 1 bold
- Freeze Row 1
- Set column widths appropriately

---

### Step 2: Connect Google Sheets to Make.com

#### 2.1 Add Connection
1. In Make.com, go to your scenario
2. Click on Google Sheets module
3. Click "Add a connection"
4. Select "Create a new connection"
5. Choose your Google account
6. Authorize Make.com access
7. Test connection
8. Save

#### 2.2 Permissions Required
- Read spreadsheet data
- Write spreadsheet data
- Create spreadsheets (if creating new)

---

### Step 3: Configure Google Sheets Module

#### Module 1: Add a Row (Save Submission)

**Settings:**
- **Type:** Google Sheets > Add a row
- **Spreadsheet:** Select your "Smartpro Consultation Submissions" sheet
- **Sheet:** Sheet1 (or your sheet name)

**Mapping:**
```
A (submission_id): {{1.request_id}} or {{1.id}}
B (submitted_at): {{1.timestamp}}
C (client_name): {{1.client_name}}
D (email): {{1.email}}
E (phone): {{1.phone}}
F (business_name): {{1.business_name}}
G (business_type): {{1.business_type}}
H (service_interested): {{1.service_interested}}
I (service_interested_translated): {{1.service_interested_translated}}
J (services_summary): {{1.services_summary}}
K (budget): {{1.budget}}
L (timeline): {{1.timeline}}
M (preferred_contact): {{1.preferred_contact}}
N (preferred_time): {{1.preferred_time}}
O (location): {{1.location}}
P (primary_message): {{1.primary_message}}
Q (language): {{1.language}}
R (source): {{1.source}}
S (timestamp): {{1.timestamp}}
T (confirmation_sent): TRUE
U (welcome_sent): FALSE
V (welcome_sent_at): (empty)
W (follow_up_1_sent): FALSE
X (follow_up_1_sent_at): (empty)
Y (follow_up_2_sent): FALSE
Z (follow_up_2_sent_at): (empty)
AA (follow_up_3_sent): FALSE
AB (follow_up_3_sent_at): (empty)
AC (client_replied): FALSE
AD (client_replied_at): (empty)
AE (consultation_scheduled): FALSE
AF (consultation_scheduled_at): (empty)
AG (provider_notified): TRUE
AH (notes): {{1.notes}}
```

**Place in Flow:** After webhook trigger, before emails

---

#### Module 2: Update a Row (Mark Welcome Sent)

**Settings:**
- **Type:** Google Sheets > Update a row
- **Spreadsheet:** Your submissions sheet
- **Sheet:** Sheet1

**Filter:**
- **Column:** `email` (Column D)
- **Condition:** equals
- **Value:** `{{1.email}}`

**Update:**
```
U (welcome_sent): TRUE
V (welcome_sent_at): {{now}}
```

**Place in Flow:** After welcome email is sent

---

#### Module 3: Search Rows (Follow-Up Automation)

**Settings:**
- **Type:** Google Sheets > Search rows
- **Spreadsheet:** Your submissions sheet
- **Sheet:** Sheet1

**Filter Conditions:**
```
Condition 1:
  Column: submitted_at (B)
  Condition: is less than
  Value: {{sub(now(); 86400)}}  (24 hours ago)

Condition 2:
  Column: welcome_sent (U)
  Condition: equals
  Value: TRUE

Condition 3:
  Column: follow_up_1_sent (W)
  Condition: equals
  Value: FALSE

Condition 4:
  Column: client_replied (AC)
  Condition: equals
  Value: FALSE
```

**Place in Flow:** In follow-up automation scenario (triggered by schedule)

---

## 🔄 Complete Flow with Google Sheets

### Main Scenario Flow

```
1. Webhook Trigger
   ↓
2. Google Sheets: Add a Row (Save Submission)
   ↓
3. Router (by language)
   ├─→ Arabic Path
   │   ├─→ Confirmation Email
   │   ├─→ ChatGPT (Welcome)
   │   ├─→ Welcome Email
   │   ├─→ Google Sheets: Update Row (Mark Welcome Sent)
   │   └─→ Provider Notification
   │
   └─→ English Path
       ├─→ Confirmation Email
       ├─→ ChatGPT (Welcome)
       ├─→ Welcome Email
       ├─→ Google Sheets: Update Row (Mark Welcome Sent)
       └─→ Provider Notification
```

### Follow-Up Automation Scenario

```
1. Schedule Trigger (Daily at 9 AM)
   ↓
2. Google Sheets: Search Rows (24h, 72h, 7d)
   ↓
3. Router (by days since submission)
   ├─→ 24 Hours: Follow-Up 1
   │   ├─→ ChatGPT (Generate Follow-Up)
   │   ├─→ Email (Send Follow-Up)
   │   └─→ Google Sheets: Update Row (Mark Follow-Up 1 Sent)
   │
   ├─→ 72 Hours: Follow-Up 2
   │   ├─→ ChatGPT (Generate Follow-Up)
   │   ├─→ Email (Send Follow-Up)
   │   └─→ Google Sheets: Update Row (Mark Follow-Up 2 Sent)
   │
   └─→ 7 Days: Follow-Up 3
       ├─→ ChatGPT (Generate Follow-Up)
       ├─→ Email (Send Follow-Up)
       └─→ Google Sheets: Update Row (Mark Follow-Up 3 Sent)
```

---

## 🔧 Module Configuration Details

### Module: Add a Row

**Purpose:** Save every submission to Google Sheets

**Configuration:**
```
Spreadsheet: [Your Spreadsheet Name]
Sheet: Sheet1
Row: (Leave empty - adds to end)

Column Mappings:
- Map all webhook fields to corresponding columns
- Use {{1.field_name}} format
- Set boolean fields (TRUE/FALSE)
- Set timestamps ({{1.timestamp}} or {{now}})
```

**Error Handling:**
- If Google Sheets fails → Log error, continue with emails
- Don't block email sending if sheet save fails

### Module: Update a Row

**Purpose:** Update status when emails are sent

**Configuration:**
```
Spreadsheet: [Your Spreadsheet Name]
Sheet: Sheet1

Filter:
- Column: email
- Condition: equals
- Value: {{1.email}}

Update:
- welcome_sent: TRUE
- welcome_sent_at: {{now}}
```

**Multiple Updates:**
- After welcome email → Update welcome_sent
- After follow-up 1 → Update follow_up_1_sent
- After follow-up 2 → Update follow_up_2_sent
- After follow-up 3 → Update follow_up_3_sent

### Module: Search Rows

**Purpose:** Find submissions needing follow-up

**Configuration:**
```
Spreadsheet: [Your Spreadsheet Name]
Sheet: Sheet1

Filters:
1. submitted_at < NOW() - 24 hours
2. welcome_sent = TRUE
3. follow_up_1_sent = FALSE
4. client_replied = FALSE

Sort: submitted_at (ascending)
Limit: 100 (or as needed)
```

**For Different Follow-Ups:**
- Follow-Up 1: `follow_up_1_sent = FALSE`
- Follow-Up 2: `follow_up_1_sent = TRUE` AND `follow_up_2_sent = FALSE`
- Follow-Up 3: `follow_up_2_sent = TRUE` AND `follow_up_3_sent = FALSE`

---

## 📊 Google Sheets Formulas (Optional)

### Add to Sheet for Analytics

**Column AI: Days Since Submission**
```
=IF(B2<>"", DATEDIF(B2, NOW(), "d"), "")
```

**Column AJ: Status**
```
=IF(AC2=TRUE, "Replied", 
 IF(AE2=TRUE, "Scheduled", 
 IF(AA2=TRUE, "Follow-Up 3 Sent",
 IF(Y2=TRUE, "Follow-Up 2 Sent",
 IF(W2=TRUE, "Follow-Up 1 Sent",
 IF(U2=TRUE, "Welcome Sent",
 "Confirmation Only"))))))
```

**Column AK: Response Time (Hours)**
```
=IF(V2<>"", (V2-B2)*24, "")
```

---

## 🔄 Complete Automation Flow

### Scenario 1: Main Submission Flow

```
1. Webhook
   ↓
2. Google Sheets: Add Row (Save)
   ↓
3. Router (Language)
   ├─→ Confirmation Email
   ├─→ ChatGPT
   ├─→ Welcome Email
   ├─→ Google Sheets: Update (Welcome Sent)
   └─→ Provider Notification
```

### Scenario 2: Follow-Up Automation

```
1. Schedule (Daily 9 AM)
   ↓
2. Google Sheets: Search (24h, no reply)
   ↓
3. For Each Row:
   ├─→ ChatGPT (Follow-Up)
   ├─→ Email (Send)
   └─→ Google Sheets: Update (Follow-Up Sent)
```

---

## 🧪 Testing

### Test 1: Save to Sheets
1. Submit form
2. Check Google Sheets
3. Verify row added
4. Verify all fields populated

### Test 2: Update Status
1. Submit form
2. Wait for welcome email
3. Check Google Sheets
4. Verify `welcome_sent` = TRUE
5. Verify `welcome_sent_at` has timestamp

### Test 3: Follow-Up Search
1. Create test row (24h ago, no reply)
2. Run follow-up scenario
3. Verify row found
4. Verify follow-up sent
5. Verify row updated

---

## ✅ Setup Checklist

### Google Sheets
- [ ] Create spreadsheet
- [ ] Set up column headers
- [ ] Format headers (bold, freeze)
- [ ] Test manual entry

### Make.com Connection
- [ ] Connect Google account
- [ ] Authorize permissions
- [ ] Test connection
- [ ] Verify access to spreadsheet

### Make.com Modules
- [ ] Add "Add a Row" module
- [ ] Configure column mappings
- [ ] Add "Update a Row" module
- [ ] Configure filters
- [ ] Add "Search Rows" module
- [ ] Configure search filters
- [ ] Test each module

### Integration
- [ ] Test save on submission
- [ ] Test update on email sent
- [ ] Test search for follow-ups
- [ ] Verify data accuracy

---

## 🚨 Common Issues & Fixes

### Issue 1: "Module is not set up"
**Fix:**
1. Click on module
2. Click "Set up"
3. Select spreadsheet
4. Configure mappings
5. Save

### Issue 2: "Permission denied"
**Fix:**
1. Re-authorize Google connection
2. Check spreadsheet sharing settings
3. Ensure Make.com has edit access

### Issue 3: "Column not found"
**Fix:**
1. Verify column names match exactly
2. Check for extra spaces
3. Verify header row is Row 1

### Issue 4: "Filter not working"
**Fix:**
1. Check filter conditions
2. Verify data types match
3. Test with sample data
4. Check date/time formats

---

## 💡 Pro Tips

### 1. Use Named Ranges
- Create named ranges in Google Sheets
- Reference by name in Make.com
- Easier to maintain

### 2. Add Data Validation
- Dropdown lists for status fields
- Date formats for timestamps
- Email validation

### 3. Create Dashboard Sheet
- Separate sheet for analytics
- Use formulas to summarize data
- Create charts and graphs

### 4. Set Up Notifications
- Google Sheets can send email alerts
- Notify on new submissions
- Notify on status changes

---

## 📊 Analytics Dashboard

### Create Summary Sheet

**Metrics to Track:**
- Total submissions
- By language
- By service
- By date
- Response rates
- Conversion rates

**Formulas:**
```
Total Submissions: =COUNTA(B:B)-1
Arabic: =COUNTIF(Q:Q, "ar")
English: =COUNTIF(Q:Q, "en")
Welcome Sent: =COUNTIF(U:U, TRUE)
Replied: =COUNTIF(AC:AC, TRUE)
Scheduled: =COUNTIF(AE:AE, TRUE)
```

---

## 🚀 Quick Setup (15 Minutes)

### Step 1: Create Spreadsheet (5 min)
1. Create new Google Sheet
2. Add headers (copy from Step 1.2 above)
3. Format headers

### Step 2: Connect to Make.com (5 min)
1. Add Google Sheets module
2. Create connection
3. Authorize access
4. Select spreadsheet

### Step 3: Configure Module (5 min)
1. Set up "Add a Row" module
2. Map all fields
3. Test with sample data
4. Verify row added

---

## ✅ Next Steps

After Google Sheets is set up:

1. **Add to Main Scenario:**
   - Add "Add a Row" after webhook
   - Add "Update a Row" after welcome email

2. **Create Follow-Up Scenario:**
   - Add "Search Rows" module
   - Configure filters
   - Set up follow-up automation

3. **Create Dashboard:**
   - Add analytics formulas
   - Create summary sheet
   - Set up charts

---

**Your Google Sheets integration is ready! Follow the steps above to complete the setup.** 🚀

