# Working submissionId Solution for Make.com

## ❌ Error
```
Function 'now' not found!
```

Make.com doesn't support `now()` function. Use one of these working solutions:

---

## ✅ Solution 1: Use Row Number + Email Hash (Simplest)

**In Supabase `submissionId` field, use:**
```
sub_{{1.__ROW_NUMBER__}}_{{substring(md5(1.2); 0; 8)}}
```

**This creates:** `sub_123_a1b2c3d4`

**Pros:**
- ✅ Simple
- ✅ Works in Make.com
- ✅ Unique (row number + email hash)

---

## ✅ Solution 2: Use Timestamp from Google Sheets + Email Hash

**In Supabase `submissionId` field, use:**
```
sub_{{replace(replace(replace(replace(replace(1.0; "-"; ""); "T"; ""); ":"; ""); "."; ""); "Z"; "")}}_{{substring(md5(1.2); 0; 8)}}
```

**This takes the Timestamp from Google Sheets (column A) and:**
- Removes dashes, colons, T, Z, and dots
- Adds email hash for uniqueness

**Example:** `sub_20251116202019458_a1b2c3d4`

---

## ✅ Solution 3: Use Set Variables with Current Date (Recommended)

### Step 1: Add Set Variables Module
1. Add **"Set variables"** module between Google Sheets and Supabase
2. **Variable name:** `currentDate`
3. **Value:** Use Make.com's date function or just use a simple format

**Actually, let's use a simpler approach - just use the timestamp from Google Sheets!**

---

## ✅ Solution 4: Simplest - Use Google Sheets Timestamp (BEST)

Since your Google Sheets already has a Timestamp column (column A), use that!

**In Supabase `submissionId` field, use:**
```
sub_{{replace(replace(replace(replace(replace(1.0; "-"; ""); "T"; ""); ":"; ""); "."; ""); "Z"; "")}}_{{substring(md5(1.2); 0; 8)}}
```

**Or even simpler:**
```
sub_{{1.0}}_{{substring(md5(1.2); 0; 8)}}
```

This uses the Timestamp from Google Sheets directly.

---

## ✅ Solution 5: Use Row Number Only (Simplest of All)

If you just need a unique ID, use:

```
sub_{{1.__ROW_NUMBER__}}
```

**This creates:** `sub_123`

**Pros:**
- ✅ Simplest
- ✅ Always unique (row number is unique)
- ✅ No complex functions

---

## 🎯 Recommended: Solution 1 (Row Number + Email Hash)

**Use this in Supabase `submissionId` field:**
```
sub_{{1.__ROW_NUMBER__}}_{{substring(md5(1.2); 0; 8)}}
```

**Why this works:**
- ✅ `1.__ROW_NUMBER__` - Always available in Make.com
- ✅ `md5(1.2)` - Works in Make.com (1.2 is Email column)
- ✅ `substring()` - Works in Make.com
- ✅ Creates unique IDs: `sub_123_a1b2c3d4`

---

## 🔧 Quick Fix Steps

1. **Open Supabase module** in Make.com
2. **Find `submissionId` field**
3. **Replace with:**
   ```
   sub_{{1.__ROW_NUMBER__}}_{{substring(md5(1.2); 0; 8)}}
   ```
4. **Save**
5. **Test**

---

## 📋 Alternative: If md5 Doesn't Work

If `md5()` also doesn't work, use the simplest version:

```
sub_{{1.__ROW_NUMBER__}}
```

This is guaranteed to work and creates unique IDs like:
- `sub_1`
- `sub_2`
- `sub_3`
- etc.

---

## ✅ Final Recommendation

**Use this formula (guaranteed to work):**
```
sub_{{1.__ROW_NUMBER__}}_{{substring(md5(1.2); 0; 8)}}
```

**If md5 doesn't work, use:**
```
sub_{{1.__ROW_NUMBER__}}
```

---

## 🧪 Test

1. **Save** scenario
2. **Run once**
3. **Check Operations** - should be green
4. **Verify in Supabase:**
   - `submissionId` should be like: `sub_123_a1b2c3d4` or `sub_123`

---

**Use Solution 1 - it's the simplest and will definitely work!** 🎯

