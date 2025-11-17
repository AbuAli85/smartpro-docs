# Understanding "service_interested" Field

## ✅ You're Right - It's NOT a Form Field!

The form does **NOT** have a field called "Service Interested". Instead, it has:

### Form Field:
- **`services`** (array) - User selects multiple services via checkboxes
  - Example: `["projectManagement", "accounting", "vat"]`

### Computed Field:
- **`service_interested`** - Automatically generated from `services` array
  - Example: `"Project Management, Accounting, VAT"`

## 🔄 How It Works

### Step 1: User Selects Services
User checks boxes in the form:
- ☑ Project Management
- ☑ Accounting
- ☑ VAT

**Form state:**
```javascript
formData.services = ["projectManagement", "accounting", "vat"]
```

### Step 2: Form Converts to Make.com Format
When form is submitted, the code runs:

```typescript
// Line 220 in ConsultationForm.tsx
const serviceInterested = formatServicesForMake(formData.services);
```

**What `formatServicesForMake()` does:**
1. Takes the array: `["projectManagement", "accounting", "vat"]`
2. Maps each key to readable name:
   - `"projectManagement"` → `"Project Management"`
   - `"accounting"` → `"Accounting"`
   - `"vat"` → `"VAT"`
3. Joins them: `"Project Management, Accounting, VAT"`

### Step 3: Sent to Make.com
The webhook payload includes:
```json
{
  "services": "Project Management, Accounting, VAT",  // All services
  "service_interested": "Project Management, Accounting, VAT"  // Same value, formatted
}
```

## 🎯 Why Two Fields?

### `services` (array in form)
- **Purpose:** User input
- **Format:** Array of keys like `["projectManagement"]`
- **Used by:** Form validation, UI display

### `service_interested` (computed string)
- **Purpose:** Make.com routing
- **Format:** Formatted string like `"Project Management"`
- **Used by:** Make.com router to select email template

## 📋 Make.com Uses `service_interested` For:

The router checks `{{1.service_interested}}` to decide which email template to use:

```javascript
// Module 3 (Accounting route)
if (service_interested contains "Accounting") {
  → Use Accounting email template
}

// Module 10 (PRO Services route)
if (service_interested contains "PRO Services") {
  → Use PRO Services email template
}

// Module 13 (Company Formation route)
if (service_interested contains "Company Formation") {
  → Use Company Formation email template
}

// Module 16 (Default route)
else {
  → Use Default email template
}
```

## 🔍 Where It's Created

**File:** `client/src/components/ConsultationForm.tsx`

**Function:** `buildWebhookPayload()` (line 218)

**Code:**
```typescript
const buildWebhookPayload = (): MakeWebhookPayload => {
  // Convert services array to Make.com format
  const serviceInterested = formatServicesForMake(formData.services);
  
  return {
    // ... other fields
    service_interested: serviceInterested,  // ← Created here!
    services: formData.services.join(", "),  // ← Also sent as string
    // ... other fields
  };
};
```

## ✅ Summary

| Field | Type | Source | Example |
|-------|------|--------|---------|
| `services` (form) | Array | User input | `["projectManagement"]` |
| `service_interested` (payload) | String | Computed | `"Project Management"` |
| `services` (payload) | String | Computed | `"Project Management"` |

**Key Point:** `service_interested` is **automatically created** from the `services` array when the form is submitted. You don't need to add it to the form - it's already there in the code!

## 🚨 Important for Make.com

Make.com **MUST** receive `service_interested` in the webhook payload because:
1. Router uses it to select email template
2. It's a formatted, readable string (not raw keys)
3. It's what the filters check (e.g., "contains Accounting")

The form already sends it - you just need to make sure Make.com Module 2 maps it correctly to Column 6 (G) in Google Sheets!

