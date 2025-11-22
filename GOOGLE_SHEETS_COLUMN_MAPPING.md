# Google Sheets Column Mapping Reference

## 📋 Complete Column Structure

### Column Headers (Row 1)

| Column | Header | Type | Source | Description |
|--------|--------|------|--------|-------------|
| A | `submission_id` | Text | `{{1.request_id}}` | Unique submission ID |
| B | `submitted_at` | DateTime | `{{1.timestamp}}` | Submission timestamp |
| C | `client_name` | Text | `{{1.client_name}}` | Client full name |
| D | `email` | Email | `{{1.email}}` | Client email (used for filtering) |
| E | `phone` | Text | `{{1.phone}}` | Client phone number |
| F | `business_name` | Text | `{{1.business_name}}` | Business/company name |
| G | `business_type` | Text | `{{1.business_type}}` | Translated business type |
| H | `service_interested` | Text | `{{1.service_interested}}` | Primary service (English) |
| I | `service_interested_translated` | Text | `{{1.service_interested_translated}}` | Primary service (translated) |
| J | `services_summary` | Text | `{{1.services_summary}}` | All services (comma-separated) |
| K | `budget` | Text | `{{1.budget}}` | Budget range (translated) |
| L | `timeline` | Text | `{{1.timeline}}` | Timeline (translated) |
| M | `preferred_contact` | Text | `{{1.preferred_contact}}` | Contact method (translated) |
| N | `preferred_time` | Text | `{{1.preferred_time}}` | Contact time (translated) |
| O | `location` | Text | `{{1.location}}` | Client location |
| P | `primary_message` | Text | `{{1.primary_message}}` | Client message |
| Q | `language` | Text | `{{1.language}}` | Language (ar/en) |
| R | `source` | Text | `{{1.source}}` | Source (smartpro-consultation-form) |
| S | `timestamp` | DateTime | `{{1.timestamp}}` | ISO timestamp |
| T | `confirmation_sent` | Boolean | `TRUE` | Confirmation email sent |
| U | `welcome_sent` | Boolean | `FALSE` → `TRUE` | Welcome email sent |
| V | `welcome_sent_at` | DateTime | `{{now}}` | Welcome email timestamp |
| W | `follow_up_1_sent` | Boolean | `FALSE` → `TRUE` | 24h follow-up sent |
| X | `follow_up_1_sent_at` | DateTime | `{{now}}` | 24h follow-up timestamp |
| Y | `follow_up_2_sent` | Boolean | `FALSE` → `TRUE` | 72h follow-up sent |
| Z | `follow_up_2_sent_at` | DateTime | `{{now}}` | 72h follow-up timestamp |
| AA | `follow_up_3_sent` | Boolean | `FALSE` → `TRUE` | 7d follow-up sent |
| AB | `follow_up_3_sent_at` | DateTime | `{{now}}` | 7d follow-up timestamp |
| AC | `client_replied` | Boolean | `FALSE` → `TRUE` | Client replied to email |
| AD | `client_replied_at` | DateTime | `{{now}}` | Client reply timestamp |
| AE | `consultation_scheduled` | Boolean | `FALSE` → `TRUE` | Consultation booked |
| AF | `consultation_scheduled_at` | DateTime | `{{now}}` | Booking timestamp |
| AG | `provider_notified` | Boolean | `TRUE` | Provider notification sent |
| AH | `notes` | Text | `{{1.notes}}` | Additional notes |

---

## 🔧 Make.com Module Configuration

### Module: Add a Row

**Spreadsheet:** [Your Spreadsheet Name]
**Sheet:** Sheet1

**Column Mappings:**
```
A: {{1.request_id}}
B: {{1.timestamp}}
C: {{1.client_name}}
D: {{1.email}}
E: {{1.phone}}
F: {{1.business_name}}
G: {{1.business_type}}
H: {{1.service_interested}}
I: {{1.service_interested_translated}}
J: {{1.services_summary}}
K: {{1.budget}}
L: {{1.timeline}}
M: {{1.preferred_contact}}
N: {{1.preferred_time}}
O: {{1.location}}
P: {{1.primary_message}}
Q: {{1.language}}
R: {{1.source}}
S: {{1.timestamp}}
T: TRUE
U: FALSE
V: (empty)
W: FALSE
X: (empty)
Y: FALSE
Z: (empty)
AA: FALSE
AB: (empty)
AC: FALSE
AD: (empty)
AE: FALSE
AF: (empty)
AG: TRUE
AH: {{1.notes}}
```

---

### Module: Update a Row (Welcome Sent)

**Filter:**
- Column: `email` (Column D)
- Condition: equals
- Value: `{{1.email}}`

**Update:**
```
U (welcome_sent): TRUE
V (welcome_sent_at): {{now}}
```

---

### Module: Update a Row (Follow-Up 1)

**Filter:**
- Column: `email` (Column D)
- Condition: equals
- Value: `{{1.email}}`

**Update:**
```
W (follow_up_1_sent): TRUE
X (follow_up_1_sent_at): {{now}}
```

---

### Module: Search Rows (24h Follow-Up)

**Filters:**
```
1. Column: submitted_at (B)
   Condition: is less than
   Value: {{sub(now(); 86400)}}  (24 hours ago)

2. Column: welcome_sent (U)
   Condition: equals
   Value: TRUE

3. Column: follow_up_1_sent (W)
   Condition: equals
   Value: FALSE

4. Column: client_replied (AC)
   Condition: equals
   Value: FALSE
```

---

## 📊 Quick Reference

### Field Mapping Cheat Sheet

**From Webhook Payload → Google Sheets:**

| Webhook Field | Sheets Column | Column Letter |
|---------------|---------------|---------------|
| `request_id` | submission_id | A |
| `timestamp` | submitted_at | B |
| `client_name` | client_name | C |
| `email` | email | D |
| `phone` | phone | E |
| `business_name` | business_name | F |
| `business_type` | business_type | G |
| `service_interested` | service_interested | H |
| `service_interested_translated` | service_interested_translated | I |
| `services_summary` | services_summary | J |
| `budget` | budget | K |
| `timeline` | timeline | L |
| `preferred_contact` | preferred_contact | M |
| `preferred_time` | preferred_time | N |
| `location` | location | O |
| `primary_message` | primary_message | P |
| `language` | language | Q |
| `source` | source | R |
| `notes` | notes | AH |

---

## 🚀 Quick Setup Template

Copy this into your Google Sheets Row 1:

```
submission_id | submitted_at | client_name | email | phone | business_name | business_type | service_interested | service_interested_translated | services_summary | budget | timeline | preferred_contact | preferred_time | location | primary_message | language | source | timestamp | confirmation_sent | welcome_sent | welcome_sent_at | follow_up_1_sent | follow_up_1_sent_at | follow_up_2_sent | follow_up_2_sent_at | follow_up_3_sent | follow_up_3_sent_at | client_replied | client_replied_at | consultation_scheduled | consultation_scheduled_at | provider_notified | notes
```

---

**Use this as your reference when configuring Make.com modules!** 📋

