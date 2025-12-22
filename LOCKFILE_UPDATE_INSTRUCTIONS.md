# 🔧 Lockfile Update Instructions

## **Issue:**
Vercel build failing because `pnpm-lock.yaml` is out of sync with `package.json` after adding `@supabase/supabase-js`.

## **Solution:**

The lockfile needs to be regenerated. The package is already in `package.json`, but the lockfile needs to be updated.

### **Option 1: Regenerate Lockfile (Recommended)**

```bash
# Delete the lockfile
rm pnpm-lock.yaml

# Reinstall to regenerate
pnpm install
```

### **Option 2: Update Lockfile**

```bash
# Force update the lockfile
pnpm install --no-frozen-lockfile
```

### **Option 3: Add Package Again**

```bash
# This will update both package.json and lockfile
pnpm add @supabase/supabase-js@^2.47.10
```

---

## **After Updating:**

1. **Commit the changes:**
   ```bash
   git add pnpm-lock.yaml package.json
   git commit -m "Update lockfile with @supabase/supabase-js dependency"
   git push
   ```

2. **Vercel will automatically rebuild** and should now succeed!

---

## **Verification:**

After updating, verify:
- ✅ `@supabase/supabase-js` is in `package.json`
- ✅ `@supabase/supabase-js` is in `pnpm-lock.yaml` (both in dependencies and packages sections)

---

**✅ Once the lockfile is updated and committed, the Vercel build should succeed!**

