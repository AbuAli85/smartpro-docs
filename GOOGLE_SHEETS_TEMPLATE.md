# Google Sheets Template for Consultation Form

## Column Structure

Copy this structure to your Google Sheet "leads" tab:

| Column | Header | Description | Example |
|--------|--------|-------------|---------|
| A | Timestamp | Auto-generated timestamp | 2025-01-15 10:30:00 |
| B | Client Name | Full name of the client | John Doe |
| C | Email | Client email address | john@example.com |
| D | Phone | Phone number (optional) | +1 234 567 890 |
| E | Business Name | Company name (optional) | Acme Corp |
| F | Business Type | Type of business (optional) | Limited Liability Company (LLC) |
| G | Service Interested | Primary service(s) | Accounting, VAT |
| H | Services | All selected services | Accounting, VAT, Business Consulting |
| I | Budget | Estimated budget (optional) | $10,000 - $25,000 |
| J | Timeline | Project timeline (optional) | 3-6 Months |
| K | Preferred Contact | Contact method (optional) | Both |
| L | Preferred Time | Contact time (optional) | Afternoon (12 PM - 5 PM) |
| M | Location | Client location (optional) | New York, USA |
| N | Primary Message | Main message from client | Looking for accounting services... |
| O | Notes | All additional information | Phone: +1 234 567 890\nLocation: New York... |
| P | Language | Form language | English / Arabic |
| Q | Source | Form source identifier | smartpro-consultation-form |
| R | Email Status | Email sending status | Pending / Sent |
| S | Last Email Preview | Preview of sent email | Thank you for contacting... |

## Setup Instructions

### Option 1: Full Structure (Recommended)

1. Open your Google Sheet
2. Go to the "leads" sheet
3. Replace row 1 with the headers above
4. Format row 1 as **Bold** and **Freeze** it
5. Set column widths appropriately:
   - A: 150px (Timestamp)
   - B: 150px (Client Name)
   - C: 200px (Email)
   - D: 120px (Phone)
   - E: 150px (Business Name)
   - F: 180px (Business Type)
   - G: 150px (Service Interested)
   - H: 200px (Services)
   - I: 150px (Budget)
   - J: 120px (Timeline)
   - K: 130px (Preferred Contact)
   - L: 180px (Preferred Time)
   - M: 150px (Location)
   - N: 300px (Primary Message)
   - O: 400px (Notes)
   - P: 100px (Language)
   - Q: 150px (Source)
   - R: 120px (Email Status)
   - S: 400px (Last Email Preview)

### Option 2: Simplified Structure (Minimal Changes)

If you want minimal changes, use this structure:

| Column | Header | Description |
|--------|--------|-------------|
| A | Timestamp | Auto-generated |
| B | Client Name | Full name |
| C | Email | Email address |
| D | Business Name | Company name |
| E | Service Interested | Primary service |
| F | Notes | All info (enhanced) |
| G | Phone | Phone number |
| H | Budget | Estimated budget |
| I | Timeline | Project timeline |
| J | Language | Form language |
| K | Email Status | Status |
| L | Last Email Preview | Email preview |

## Data Validation (Optional)

Add data validation to improve data quality:

1. **Column C (Email)**: Data validation → Custom formula: `=ISEMAIL(C2)`
2. **Column P (Language)**: Data validation → List of items: `English, Arabic`
3. **Column R (Email Status)**: Data validation → List of items: `Pending, Sent, Failed`

## Conditional Formatting (Optional)

Add conditional formatting for better visibility:

1. **Email Status = "Sent"**: Green background
2. **Email Status = "Pending"**: Yellow background
3. **Email Status = "Failed"**: Red background

## Formulas (Optional)

Add helpful formulas:

1. **Total Leads**: `=COUNTA(B:B)-1` (subtract header)
2. **Pending Emails**: `=COUNTIF(R:R, "Pending")`
3. **Sent Emails**: `=COUNTIF(R:R, "Sent")`

## Sample Data Row

Here's what a complete row might look like:

```
A: 2025-01-15 10:30:00
B: John Doe
C: john@example.com
D: +1 234 567 890
E: Acme Corp
F: Limited Liability Company (LLC)
G: Accounting, VAT
H: Accounting, VAT, Business Consulting
I: $10,000 - $25,000
J: 3-6 Months
K: Both
L: Afternoon (12 PM - 5 PM)
M: New York, USA
N: Looking for comprehensive accounting services for our startup
O: Phone: +1 234 567 890
   Location: New York, USA
   Business Type: Limited Liability Company (LLC)
   Budget: $10,000 - $25,000
   Timeline: 3-6 Months
   Preferred Contact: Both
   Preferred Time: Afternoon (12 PM - 5 PM)
   Language: English
P: English
Q: smartpro-consultation-form
R: Sent
S: Thank you for contacting Smartpro Business Hub & Services...
```

## Make.com Mapping Reference

When configuring Make.com, use these column indices:

- Column A (Timestamp) = index `0`
- Column B (Client Name) = index `1`
- Column C (Email) = index `2`
- Column D (Phone) = index `3`
- ... and so on

Remember: Make.com uses 0-based indexing for columns!

