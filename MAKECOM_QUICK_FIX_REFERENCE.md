# Make.com Quick Fix Reference

## 🚨 Critical Fixes Needed

### 1. Fix Services Array (URGENT)
**Current (WRONG):**
```
{{split(1.Services + (Full + List); ",")}}
```

**Fix to:**
```
{{split(1.7; ",")}}
```

---

### 2. Add submissionId (REQUIRED)
**Add this field:**
```
sub_{{formatDate(1.0; "yyyyMMddHHmmss")}}_{substring(md5(1.2); 0; 8)}}
```

---

### 3. Add Missing Fields

**Add `notes`:**
```
{{1.14}}
```

**Add `createdAt`:**
```
{{1.0}}
```

**Set `status`:**
```
pending
```

**Set `webhookSent`:**
```
false
```

---

### 4. Remove/Don't Set `id`
- Supabase auto-generates `id`
- Don't map it to `{{1.__ROW_NUMBER__}}`
- Leave it empty or remove the mapping

---

## ✅ Complete Corrected Mappings

Copy these exact values into your Supabase module:

| Field | Value |
|-------|-------|
| `submissionId` | `sub_{{formatDate(1.0; "yyyyMMddHHmmss")}}_{substring(md5(1.2); 0; 8)}}` |
| `name` | `{{1.1}}` |
| `email` | `{{1.2}}` |
| `phone` | `{{1.3}}` |
| `location` | `{{1.12}}` |
| `company` | `{{1.4}}` |
| `businessType` | `{{1.5}}` |
| `services` | `{{split(1.7; ",")}}` |
| `primaryService` | `{{1.6}}` |
| `budget` | `{{1.8}}` |
| `timeline` | `{{1.9}}` |
| `preferredContact` | `{{1.10}}` |
| `preferredTime` | `{{1.11}}` |
| `message` | `{{1.13}}` |
| `notes` | `{{1.14}}` |
| `language` | `{{1.15}}` |
| `source` | `{{if(1.16; 1.16; "google_sheets")}}` |
| `status` | `pending` |
| `createdAt` | `{{1.0}}` |
| `webhookSent` | `false` |

---

## 🔍 Column Index Quick Reference

- `0` = Timestamp (A)
- `1` = Client Name (B)
- `2` = Email (C)
- `3` = Phone (D)
- `4` = Business Name (E)
- `5` = Business Type (F)
- `6` = Service Interested (G)
- `7` = Services (Full List) (H) ⚠️ **Array - needs split**
- `8` = Budget (I)
- `9` = Timeline (J)
- `10` = Preferred Contact (K)
- `11` = Preferred Time (L)
- `12` = Location (M)
- `13` = Primary Message (N)
- `14` = Notes / Extra Info (O)
- `15` = Language (P)
- `16` = Source (Q)

---

## ⚡ Quick Action Items

1. ✅ Fix `services`: Change to `{{split(1.7; ",")}}`
2. ✅ Add `submissionId`: Use the formula above
3. ✅ Add `notes`: `{{1.14}}`
4. ✅ Add `createdAt`: `{{1.0}}`
5. ✅ Remove `id` mapping (let Supabase auto-generate)
6. ✅ Test with one row
7. ✅ Check Supabase to verify data

---

**That's it!** These fixes will make your scenario work correctly! 🎉

