# 🔧 Lockfile Fix Instructions

## **Issue:**
Vercel build failing because `pnpm-lock.yaml` is out of sync with `package.json` after adding `@supabase/supabase-js`.

## **Solution:**
The lockfile needs to be regenerated. Run:

```bash
pnpm install
```

Or if that doesn't work:

```bash
rm pnpm-lock.yaml
pnpm install
```

## **Then commit:**
```bash
git add pnpm-lock.yaml package.json
git commit -m "Update lockfile with @supabase/supabase-js dependency"
git push
```

---

## **Why this happened:**
When we manually edited `package.json` to add the dependency, the lockfile wasn't automatically updated. Running `pnpm install` or `pnpm add` will regenerate the lockfile to match `package.json`.

---

**✅ After updating the lockfile, the Vercel build should succeed!**

