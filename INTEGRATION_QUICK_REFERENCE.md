# Integration Quick Reference

**Quick lookup guide for the Smartpro consultation form integration.**

For complete documentation, see [INTEGRATION_CANONICAL.md](./INTEGRATION_CANONICAL.md).

---

## 📤 Webhook Payload (Frontend → Make.com)

**Endpoint:** `POST https://hook.eu2.make.com/[your-webhook-id]`

**Required Fields:**
```json
{
  "client_name": "string",
  "email": "string",
  "service_interested": "string",  // Primary service (first selected)
  "notes": "string"                // Auto-generated structured notes
}
```

**Optional Fields:**
- `phone`, `location`, `preferred_contact`, `preferred_time`
- `business_name`, `business_type`
- `services` (string, comma-separated), `budget`, `timeline`
- `message` (maps to Sheets column N)
- `language` ("en" | "ar"), `source`

**Key Points:**
- `service_interested` = Single primary service (for email routing)
- `services` = Comma-separated string of all selected services
- `message` = Client's typed message (maps to Sheets column N)
- `notes` = Comprehensive structured field

---

## 📊 Google Sheets Mapping

**Spreadsheet:** "Smartpro Leads"  
**Sheet:** "leads"

| Column | Field | Make.com Variable |
|--------|-------|-------------------|
| A (0) | Timestamp | `{{now}}` |
| B (1) | Client Name | `{{2.client_name}}` |
| C (2) | Email | `{{2.email}}` |
| D (3) | Phone | `{{2.phone}}` |
| E (4) | Business Name | `{{2.business_name}}` |
| F (5) | Business Type | `{{2.business_type}}` |
| G (6) | Service Interested | `{{2.service_interested}}` |
| H (7) | Services (Full List) | `{{2.services}}` (comma-separated string) |
| I (8) | Budget | `{{2.budget}}` |
| J (9) | Timeline | `{{2.timeline}}` |
| K (10) | Preferred Contact | `{{2.preferred_contact}}` |
| L (11) | Preferred Time | `{{2.preferred_time}}` |
| M (12) | Location | `{{2.location}}` |
| N (13) | Primary Message | `{{2.message}}` |
| O (14) | Notes | `{{2.notes}}` |
| P (15) | Language | `{{2.language}}` |
| Q (16) | Source | `{{2.source}}` |
| R (17) | Email Status | `"Pending"` (default) |
| S (18) | Last Email Preview | `""` (empty) |

---

## 🔄 Make.com Module Flow

```
[1] Webhook → [2] Tools (Normalize) → [3] Sheets (Add Row) 
    → [4] Router → [5a/b/c/d] Email (Client) → [6] Email (Internal) 
    → [7] Sheets (Update Status) → [8] WhatsApp (Optional)
```

**Module Names:**
- `01 – Webhook: Consultation Form`
- `02 – Tools: Normalize Fields`
- `03 – Sheets: AddRow – Smartpro Leads`
- `04 – Router: Service Type`
- `05a/b/c/d – Email: Client Confirmation`
- `06 – Email: Internal Notification`
- `07 – Sheets: UpdateRow – Email Status`
- `08 – WhatsApp: Client Message`

---

## 📧 Email Status Values

| Status | When |
|--------|------|
| `"Pending"` | Initial row creation |
| `"Sent to client"` | Client email sent |
| `"Sent (client + internal)"` | Both emails sent |
| `"Error: client email failed"` | Client email failed |
| `"Error: internal email failed"` | Internal email failed |
| `"Error: both emails failed"` | Both emails failed |

---

## 🧪 Testing Checklist

- [ ] Submit form with all fields
- [ ] Check Google Sheets row created
- [ ] Verify client email sent (correct language)
- [ ] Verify internal email sent
- [ ] Check Email Status updated
- [ ] Test error handling (invalid email)

---

## 🔗 Related Files

- **Canonical Spec:** `INTEGRATION_CANONICAL.md`
- **Email Templates:** `templates/email-client-confirmation.md`
- **Internal Email:** `templates/email-internal-notification.md`
- **WhatsApp:** `templates/whatsapp-message.md`
- **Frontend Types:** `client/src/types/webhook.ts`

---

**Last Updated:** 2024  
**Version:** 1.0

