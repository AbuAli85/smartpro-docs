# Single Sign-On Technical Implementation - Separate Codebases

**Date:** 2025-01-17  
**Question:** How to make one login work across separate platforms with separate code?  
**Answer:** Use shared Supabase session + shared storage

---

## 🎯 The Challenge

**You have:**
- ✅ Contract-Management-System (separate codebase)
- ✅ business-services-hub (separate codebase)
- ✅ BusinessHub (separate codebase)
- ✅ Same Supabase database

**Problem:**
- How to share login session across separate codebases?
- How to make one login work for all?

---

## ✅ Solution: Shared Supabase Session

**Key Insight:** Supabase Auth stores session in browser storage. If all platforms use the same Supabase project and same storage key, they share the session!

---

## 🔧 Technical Implementation

### Method 1: Shared localStorage Key (Simplest) ⭐⭐⭐⭐⭐

**How it works:**
- Supabase stores session in localStorage
- Use same storage key in all platforms
- All platforms read same session
- One login = all platforms logged in

**Implementation:**

#### Step 1: Configure Supabase Client (All Platforms)

**Contract-Management-System:**
```typescript
// lib/supabase/client.ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      storageKey: 'sb-auth-token', // ← SAME KEY
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    },
  }
)
```

**business-services-hub:**
```typescript
// lib/supabase/client.ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      storageKey: 'sb-auth-token', // ← SAME KEY
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    },
  }
)
```

**BusinessHub:**
```typescript
// client/src/lib/supabase/client.ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      storageKey: 'sb-auth-token', // ← SAME KEY
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    },
  }
)
```

**Result:**
- All platforms use same storage key: `sb-auth-token`
- All platforms read from same localStorage
- One login = all platforms see the session ✅

---

### Method 2: Shared Cookies (For Different Domains) ⭐⭐⭐⭐

**If platforms are on different domains:**
- Use cookies instead of localStorage
- Set cookie for parent domain
- All subdomains can read it

**Implementation:**

#### Step 1: Custom Storage for Supabase

**Create shared storage:**
```typescript
// shared-storage.ts
export const sharedStorage = {
  getItem: (key: string) => {
    // Try localStorage first
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage.getItem(key)
    }
    // Try cookie
    return getCookie(key)
  },
  
  setItem: (key: string, value: string) => {
    // Set in localStorage
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, value)
    }
    // Set in cookie (for cross-domain)
    setCookie(key, value, {
      domain: '.thesmartpro.io', // ← Parent domain
      path: '/',
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })
  },
  
  removeItem: (key: string) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(key)
    }
    deleteCookie(key, { domain: '.thesmartpro.io' })
  }
}

// Cookie helpers
function setCookie(name: string, value: string, options: any) {
  const cookie = `${name}=${value}; domain=${options.domain}; path=${options.path || '/'}; ${options.secure ? 'secure;' : ''} sameSite=${options.sameSite || 'lax'}; maxAge=${options.maxAge || 3600}`
  document.cookie = cookie
}

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null
  return null
}

function deleteCookie(name: string, options: any) {
  document.cookie = `${name}=; domain=${options.domain}; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`
}
```

#### Step 2: Use Shared Storage in Supabase

**All platforms:**
```typescript
import { createClient } from '@supabase/supabase-js'
import { sharedStorage } from './shared-storage'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      storageKey: 'sb-auth-token',
      storage: sharedStorage, // ← Custom storage
    },
  }
)
```

**Result:**
- Session stored in both localStorage AND cookies
- Works across different domains
- One login = all platforms logged in ✅

---

### Method 3: Central Auth Service (Most Robust) ⭐⭐⭐⭐⭐

**How it works:**
- Create one central auth service
- All platforms redirect to central login
- Central service handles all auth
- Redirects back with token

**Implementation:**

#### Step 1: Create Central Auth Service

**New repository:** `auth-service`
```
auth-service/
├── app/
│   ├── login/
│   │   └── page.tsx        # Login page
│   ├── callback/
│   │   └── page.tsx        # OAuth callback
│   └── api/
│       └── verify/
│           └── route.ts    # Verify token
└── lib/
    └── supabase.ts         # Supabase client
```

**Login Page:**
```typescript
// auth-service/app/login/page.tsx
'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useSearchParams } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || 'https://businesshub.thesmartpro.io'

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (data.session) {
      // Store session in shared storage
      localStorage.setItem('sb-auth-token', JSON.stringify(data.session))
      
      // Set cookie for cross-domain
      document.cookie = `sb-auth-token=${JSON.stringify(data.session)}; domain=.thesmartpro.io; path=/; secure; sameSite=lax`
      
      // Redirect to original platform
      window.location.href = redirect
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  )
}
```

#### Step 2: Update All Platforms to Check Auth

**Contract-Management-System:**
```typescript
// app/layout.tsx or middleware
import { supabase } from '@/lib/supabase'
import { redirect } from 'next/navigation'

export async function checkAuth() {
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    // Redirect to central auth
    const currentUrl = window.location.href
    redirect(`https://auth.thesmartpro.io/login?redirect=${encodeURIComponent(currentUrl)}`)
  }
  
  return session
}
```

**business-services-hub:**
```typescript
// Same implementation
import { supabase } from '@/lib/supabase'

export async function checkAuth() {
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    const currentUrl = window.location.href
    window.location.href = `https://auth.thesmartpro.io/login?redirect=${encodeURIComponent(currentUrl)}`
  }
  
  return session
}
```

**BusinessHub:**
```typescript
// client/src/lib/auth.ts
import { supabase } from './supabase/client'

export async function checkAuth() {
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    const currentUrl = window.location.href
    window.location.href = `https://auth.thesmartpro.io/login?redirect=${encodeURIComponent(currentUrl)}`
  }
  
  return session
}
```

**Result:**
- One central login page
- All platforms redirect to it
- After login, redirect back
- Session shared across all ✅

---

## 🎯 Recommended Approach: Method 1 (Simplest)

**For your situation, use Method 1:**

### Why?
- ✅ Simplest to implement
- ✅ No new service needed
- ✅ Works if same domain/subdomain
- ✅ Minimal code changes

### Implementation Steps:

#### Step 1: Verify Same Supabase Project

**Check all platforms use:**
- Same `NEXT_PUBLIC_SUPABASE_URL`
- Same `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**If different, update to same values.**

#### Step 2: Use Same Storage Key

**In all platforms, ensure:**
```typescript
storageKey: 'sb-auth-token' // ← Must be same in all
```

#### Step 3: Test

**Test flow:**
1. Login on Contract-Management-System
2. Open business-services-hub in new tab
3. Should be automatically logged in ✅

---

## 🔍 How It Works Technically

### Supabase Session Storage

**When user logs in:**
```typescript
// Platform 1: Contract-Management-System
await supabase.auth.signInWithPassword({ email, password })

// Supabase stores in localStorage:
localStorage.setItem('sb-auth-token', JSON.stringify({
  access_token: '...',
  refresh_token: '...',
  expires_at: 1234567890,
  // ... session data
}))
```

**When user visits Platform 2:**
```typescript
// Platform 2: business-services-hub
const { data: { session } } = await supabase.auth.getSession()

// Supabase reads from localStorage:
const stored = localStorage.getItem('sb-auth-token')
// If same key, finds the session! ✅
```

**Result:**
- Platform 2 sees the session
- User is logged in automatically ✅

---

## 📋 Implementation Checklist

### For Each Platform:

#### Contract-Management-System:
- [ ] Verify Supabase URL and key
- [ ] Check storage key is `sb-auth-token`
- [ ] Test login
- [ ] Verify session persists

#### business-services-hub:
- [ ] Verify Supabase URL and key (same as above)
- [ ] Check storage key is `sb-auth-token`
- [ ] Test login
- [ ] Verify session persists

#### BusinessHub:
- [ ] Add Supabase client
- [ ] Use storage key `sb-auth-token`
- [ ] Test login
- [ ] Verify session persists

### Cross-Platform Test:
- [ ] Login on Platform 1
- [ ] Open Platform 2 in new tab
- [ ] Should be logged in automatically ✅
- [ ] Test logout (should logout from all)

---

## 🚀 Quick Implementation Code

### For BusinessHub (React + Vite):

**Create:** `client/src/lib/supabase/client.ts`
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storageKey: 'sb-auth-token', // ← Same as other platforms
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  },
})
```

**Use in components:**
```typescript
import { supabase } from '@/lib/supabase/client'

// Check if logged in
const { data: { session } } = await supabase.auth.getSession()

if (session) {
  // User is logged in
  console.log('User:', session.user)
} else {
  // User not logged in
  // Redirect to login or show login form
}
```

---

## ⚠️ Important Notes

### 1. Same Domain Required (for localStorage)

**localStorage works only on same domain:**
- ✅ `businesshub.thesmartpro.io` + `services.thesmartpro.io` (same domain)
- ❌ `businesshub.com` + `services.com` (different domains)

**If different domains, use Method 2 (cookies) or Method 3 (central auth).**

### 2. Same Supabase Project Required

**All platforms must use:**
- Same Supabase project URL
- Same Supabase anon key
- Same Supabase project

**If different projects, they won't share sessions.**

### 3. Storage Key Must Match

**All platforms must use:**
```typescript
storageKey: 'sb-auth-token' // ← Exact same string
```

**If different keys, they won't share sessions.**

---

## 🎯 Summary

**How one login works across separate codebases:**

1. **Same Supabase Project** - All platforms use same database/auth
2. **Same Storage Key** - All platforms use `sb-auth-token`
3. **Same Domain** - All platforms on same domain (or use cookies)
4. **Supabase Handles It** - Supabase reads/writes to same storage

**Result:**
- User logs in on Platform 1
- Session stored in localStorage with key `sb-auth-token`
- User visits Platform 2
- Platform 2 reads same `sb-auth-token` from localStorage
- Finds session → User is logged in ✅

**No code sharing needed!** Just same configuration.

---

## ❓ Questions to Verify

1. **Are all platforms using same Supabase project?**
   - Same URL?
   - Same keys?

2. **What domains are they on?**
   - Same domain/subdomain?
   - Or different domains?

3. **What's the current storage key?**
   - Check in each platform's Supabase config

**Once you confirm, I'll help you implement it!** 🚀

