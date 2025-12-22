# Make.com - Last Fix Needed

## ✅ Great Progress!

You've fixed almost everything:
- ✅ `services` - Correct: `{{split(1.`7`; ",")}}`
- ✅ `notes` - Added: `{{1.`14`}}`
- ✅ `webhookSent` - Set: `false`
- ✅ `createdAt` - Correct: `{{1.`0`}}`
- ✅ `id` - Removed (correct!)

---

## ❌ One Last Fix: submissionId Formula

**Current (WRONG):**
```
sub_{{formatDate(1.`0`; "yyyyMMddHHmmss")}}_{substring(md5({{1.`2`}}); 0; 8)}}
```

**Problem:** Double braces around `1.2` in the md5 function: `{{1.`2`}}` should be `1.`2``

**Fix to:**
```
sub_{{formatDate(1.`0`; "yyyyMMddHHmmss")}}_{substring(md5(1.`2`); 0; 8)}}
```

---

## 🔧 Quick Fix

1. Open Supabase module
2. Find `submissionId` field
3. **Change from:**
   ```
   sub_{{formatDate(1.`0`; "yyyyMMddHHmmss")}}_{substring(md5({{1.`2`}}); 0; 8)}}
   ```
4. **Change to:**
   ```
   sub_{{formatDate(1.`0`; "yyyyMMddHHmmss")}}_{substring(md5(1.`2`); 0; 8)}}
   ```

**Only change:** Remove the double braces `{{` and `}}` around `1.`2`` inside the md5 function.

---

## ✅ Final Checklist

- [x] `services` - ✅ Correct
- [x] `notes` - ✅ Added
- [x] `webhookSent` - ✅ Set to false
- [x] `createdAt` - ✅ Correct
- [x] `id` - ✅ Removed
- [ ] `submissionId` - ⚠️ **Fix the double braces in md5**

---

## 🧪 Test After Fix

1. **Save** the scenario
2. **Run once** with a test row
3. **Check Operations** tab for errors
4. **Verify in Supabase:**
   - Row was created
   - `submissionId` is unique (like: `sub_20241116123456_a1b2c3d4`)
   - `services` is an array
   - All fields populated correctly

---

## 🎉 Almost There!

Just fix that one double-brace issue in `submissionId` and you're done! 🚀

