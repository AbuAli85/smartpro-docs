# 🔍 How to Find Supabase Client Files in Other Platforms

**Quick guide to locate and update Supabase client configuration.**

---

## 🔎 Search Commands

### Option 1: Using Terminal/Command Line

**Navigate to each repository:**
```bash
# For Contract-Management-System
cd path/to/Contract-Management-System

# For business-services-hub
cd path/to/business-services-hub
```

**Search for Supabase client:**
```bash
# Search for createClient
grep -r "createClient" --include="*.ts" --include="*.tsx"

# Search for Supabase imports
grep -r "@supabase/supabase-js" --include="*.ts" --include="*.tsx"

# Search for environment variables
grep -r "NEXT_PUBLIC_SUPABASE" --include="*.ts" --include="*.tsx" --include="*.env*"
```

### Option 2: Using VS Code / Cursor

**1. Open the repository in your editor**

**2. Use Search (Ctrl+Shift+F / Cmd+Shift+F):**
- Search for: `createClient`
- Search for: `@supabase/supabase-js`
- Search for: `NEXT_PUBLIC_SUPABASE`

**3. Look in common locations:**
- `lib/supabase/`
- `lib/`
- `utils/`
- `src/lib/`
- `supabase/`

---

## 📁 Common File Locations

### Next.js Projects (Contract-Management-System, business-services-hub)

**Most likely locations:**
```
lib/
  └── supabase/
      ├── client.ts          ← Most common
      ├── server.ts
      └── browser.ts

utils/
  └── supabase.ts

src/
  └── lib/
      └── supabase.ts

supabase/
  └── client.ts
```

---

## 🎯 What to Look For

**The file will contain something like:**

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
//                                                              ^^^
//                                                              This needs auth config
```

---

## ✏️ What to Change

**Find this line:**
```typescript
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

**Replace with:**
```typescript
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: 'sb-auth-token',  // ← CRITICAL for SSO
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  },
})
```

---

## 📋 Quick Checklist

- [ ] Found Supabase client file in Contract-Management-System
- [ ] Found Supabase client file in business-services-hub
- [ ] Updated both files with `storageKey: 'sb-auth-token'`
- [ ] Restarted both development servers
- [ ] Tested single sign-on

---

**Need help?** Share the file path and I can help you update it! 🚀

