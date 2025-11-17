# Internal Notification Email Template

**For use in Make.com / Resend email step (sent to your team)**

## Subject Line

```
New consultation request – {{client_name}} ({{service_interested}})
```

## Email Body (HTML/Text-friendly)

---

**New consultation request received from Smartpro website.**

### Client details
--------------
- **Name:** {{client_name}}
- **Email:** {{email}}
- **Phone:** {{phone}}
- **Location:** {{location}}
- **Preferred contact:** {{preferred_contact}}
- **Preferred time:** {{preferred_time}}

### Business information
--------------------
- **Business name:** {{business_name}}
- **Business type:** {{business_type}}
- **Services interested in:** {{service_interested}}
- **All selected services:** {{services}}
- **Estimated budget:** {{budget}}
- **Project timeline:** {{timeline}}

### Message from client
-------------------
{{primary_message}}

### Additional notes (auto-generated)
---------------------------------
{{notes}}

### Meta
----
- **Language:** {{language}}
- **Source:** smartpro-consultation-form
- **Timestamp:** {{timestamp}}

---

## Field Mapping (Make.com → Email)

Map these fields from your webhook payload / Google Sheets:

- `{{client_name}}` → "Client Name" column B
- `{{email}}` → "Email" column C
- `{{phone}}` → "Phone" column D
- `{{location}}` → "Location" column (if exists)
- `{{preferred_contact}}` → "Preferred Contact Method" column (if exists)
- `{{preferred_time}}` → "Preferred Contact Time" column (if exists)
- `{{business_name}}` → "Business Name" column E
- `{{business_type}}` → "Business Type" column (if exists)
- `{{service_interested}}` → "Service Interested" column G (primary service)
- `{{services}}` → "Services" column (all selected services, comma-separated)
- `{{budget}}` → "Estimated Budget" column (if exists)
- `{{timeline}}` → "Project Timeline" column (if exists)
- `{{primary_message}}` → "Message" column (if exists) or first part of "Notes"
- `{{notes}}` → "Notes" column (comprehensive notes field)
- `{{language}}` → "Language" column (en/ar)
- `{{timestamp}}` → Current timestamp or "Timestamp" column

**Note:** Format the timestamp in a readable format (e.g., "2024-01-15 14:30 UTC" or use Make.com's date formatter).

