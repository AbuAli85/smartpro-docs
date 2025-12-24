# Unified Authentication Plan - Single Sign-On

**Date:** 2025-01-17  
**Problem:** Users need to login separately to two platforms even though using same Supabase database  
**Solution:** Unified authentication - one login for all platforms

---

## 🎯 The Problem

**Current Situation:**
- ✅ Contract-Management-System uses Supabase
- ✅ business-services-hub uses Supabase
- ✅ BusinessHub uses Supabase (or needs to)
- ❌ **But users login separately to each platform**
- ❌ **Different login pages, different sessions**

**User Experience:**
```
User logs into Contract-Management-System → Session 1
User logs into business-services-hub → Session 2 (separate login)
User logs into BusinessHub → Session 3 (separate login)

Problem: 3 separate logins even though same database! ❌
```

---

## ✅ The Solution: Unified Authentication

**Goal:**
- ✅ One login page
- ✅ One session
- ✅ Access all platforms
- ✅ Same Supabase auth
- ✅ Single Sign-On (SSO)

**User Experience:**
```
User logs in once → Access all platforms
- Contract-Management-System ✅
- business-services-hub ✅
- BusinessHub ✅

One login, all platforms! ✅
```

---

## 🏗️ Architecture Options

### Option 1: Centralized Auth Hub (Recommended) ⭐⭐⭐⭐⭐

**How it works:**
- Create one central authentication service
- All platforms use the same auth
- Login once, access all

**Structure:**
```
┌─────────────────────────────────────┐
│   Central Auth Service              │
│   (auth.thesmartpro.io)             │
│   - Login page                      │
│   - Supabase Auth                   │
│   - Session management              │
└─────────────────────────────────────┘
           │
           ├──→ Contract-Management-System
           ├──→ business-services-hub
           └──→ BusinessHub

All platforms check same auth ✅
```

**Implementation:**
1. Create central auth service
2. All platforms redirect to central login
3. After login, redirect back with token
4. All platforms verify same token

**Pros:**
- ✅ True single sign-on
- ✅ One login page
- ✅ Consistent experience
- ✅ Easy to maintain

**Cons:**
- ⚠️ Need to create auth service
- ⚠️ Need to update all platforms

---

### Option 2: Shared Auth Library ⭐⭐⭐⭐

**How it works:**
- Create shared auth library
- All platforms use same library
- Same Supabase client
- Same session handling

**Structure:**
```
Shared Auth Library
├── Supabase client (same instance)
├── Auth utilities
├── Session management
└── Token handling

Used by:
├── Contract-Management-System
├── business-services-hub
└── BusinessHub
```

**Implementation:**
1. Create shared auth package/library
2. All platforms import same library
3. Same Supabase configuration
4. Same session cookies/tokens

**Pros:**
- ✅ Shared code
- ✅ Same auth logic
- ✅ Easy to update
- ✅ No central service needed

**Cons:**
- ⚠️ Need to share code between repos
- ⚠️ Need to coordinate deployments

---

### Option 3: Supabase Auth with Shared Domain ⭐⭐⭐

**How it works:**
- Use Supabase Auth directly
- Share session cookies via domain
- All platforms on same domain/subdomain

**Structure:**
```
*.thesmartpro.io (shared domain)
├── businesshub.thesmartpro.io
├── contracts.thesmartpro.io
└── services.thesmartpro.io

Shared cookies → Same session ✅
```

**Implementation:**
1. Deploy all platforms on same domain
2. Configure Supabase to use shared domain
3. Session cookies work across subdomains
4. One login works for all

**Pros:**
- ✅ Simple implementation
- ✅ Uses Supabase features
- ✅ No custom code needed

**Cons:**
- ⚠️ Need same domain
- ⚠️ Cookie configuration

---

## 🎯 Recommended Solution: Option 2 + Option 3

**Combine both approaches:**

1. **Shared Auth Library** (Code)
   - Same Supabase client
   - Same auth utilities
   - Same session handling

2. **Shared Domain** (Infrastructure)
   - All platforms on *.thesmartpro.io
   - Shared cookies
   - Single sign-on

**Result:**
- ✅ One login
- ✅ Access all platforms
- ✅ Same session
- ✅ Easy to maintain

---

## 🔧 Implementation Plan

### Phase 1: Create Shared Auth Library

**Step 1: Create Auth Package**
```typescript
// shared-auth/
// - supabase-client.ts (same instance)
// - auth-utils.ts
// - session-manager.ts
// - types.ts
```

**Step 2: Configure Supabase**
```typescript
// Same Supabase project
// Same Supabase URL
// Same Supabase keys
// Shared across all platforms
```

**Step 3: Session Management**
```typescript
// Shared session cookies
// Same domain
// Same expiration
// Works across subdomains
```

---

### Phase 2: Update All Platforms

**Step 1: Update Contract-Management-System**
```typescript
// Replace current auth
// Use shared auth library
// Same Supabase client
```

**Step 2: Update business-services-hub**
```typescript
// Replace current auth
// Use shared auth library
// Same Supabase client
```

**Step 3: Update BusinessHub**
```typescript
// Add Supabase auth
// Use shared auth library
// Same Supabase client
```

---

### Phase 3: Configure Domain & Cookies

**Step 1: Domain Configuration**
```
businesshub.thesmartpro.io
contracts.thesmartpro.io (or subdomain)
services.thesmartpro.io (or subdomain)
```

**Step 2: Cookie Configuration**
```typescript
// Set cookies for .thesmartpro.io
// Works across all subdomains
// Same session everywhere
```

**Step 3: Redirect Logic**
```typescript
// After login, redirect to original platform
// Maintain user's intended destination
// Seamless experience
```

---

## 📋 Detailed Implementation

### 1. Shared Supabase Client

**Create:** `shared-auth/supabase-client.ts`
```typescript
import { createClient } from '@supabase/supabase-js'

// Same configuration for all platforms
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    // Shared domain for cookies
    storageKey: 'sb-auth-token',
  },
})
```

**Use in all platforms:**
```typescript
// Contract-Management-System
import { supabase } from '@shared-auth/supabase-client'

// business-services-hub
import { supabase } from '@shared-auth/supabase-client'

// BusinessHub
import { supabase } from '@shared-auth/supabase-client'
```

---

### 2. Shared Auth Utilities

**Create:** `shared-auth/auth-utils.ts`
```typescript
// Login function
export async function login(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

// Check session
export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

// Logout
export async function logout() {
  await supabase.auth.signOut()
}
```

---

### 3. Domain Configuration

**For Supabase Auth:**
```typescript
// In Supabase dashboard
// Site URL: https://thesmartpro.io
// Redirect URLs:
// - https://businesshub.thesmartpro.io/**
// - https://contracts.thesmartpro.io/**
// - https://services.thesmartpro.io/**
```

**For Cookies:**
```typescript
// Set cookie for parent domain
document.cookie = `sb-auth-token=${token}; domain=.thesmartpro.io; path=/; secure; samesite=lax`
```

---

### 4. Login Flow

**Unified Login Page:**
```
1. User visits any platform
2. Not logged in → Redirect to auth.thesmartpro.io/login
3. User logs in (Supabase)
4. Session created (shared cookie)
5. Redirect back to original platform
6. User can access all platforms ✅
```

**Code:**
```typescript
// Check if logged in
const session = await getSession()

if (!session) {
  // Redirect to central login
  window.location.href = 'https://auth.thesmartpro.io/login?redirect=' + encodeURIComponent(window.location.href)
} else {
  // User is logged in, access granted
}
```

---

## 🎯 Quick Implementation (Simplest Approach)

### Option: Use Same Supabase Client Everywhere

**Step 1: Same Supabase Configuration**
```typescript
// All platforms use:
const supabaseUrl = 'https://your-project.supabase.co'
const supabaseKey = 'your-anon-key'

// Same for all platforms ✅
```

**Step 2: Shared Session Storage**
```typescript
// Use localStorage with same key
localStorage.setItem('sb-auth-token', token)

// All platforms read same key ✅
```

**Step 3: Domain Setup**
```
// Deploy all on same domain
businesshub.thesmartpro.io
contracts.thesmartpro.io
services.thesmartpro.io

// Or use path-based routing
thesmartpro.io/businesshub
thesmartpro.io/contracts
thesmartpro.io/services
```

**Step 4: Login Redirect**
```typescript
// After login, set redirect
const redirectUrl = new URLSearchParams(window.location.search).get('redirect')
if (redirectUrl) {
  window.location.href = redirectUrl
}
```

---

## 📋 Implementation Checklist

### Setup:
- [ ] Verify all platforms use same Supabase project
- [ ] Get Supabase URL and keys
- [ ] Configure Supabase redirect URLs
- [ ] Set up domain/subdomain structure

### Code:
- [ ] Create shared auth utilities (or use same config)
- [ ] Update Contract-Management-System to use shared auth
- [ ] Update business-services-hub to use shared auth
- [ ] Update BusinessHub to use Supabase auth

### Testing:
- [ ] Test login on one platform
- [ ] Verify session works on other platforms
- [ ] Test logout (should logout from all)
- [ ] Test token refresh

---

## 🚀 Quick Start (Simplest)

### If All Platforms Already Use Supabase:

**Just need to:**
1. **Use same Supabase project** (verify)
2. **Use same session storage key** (update if different)
3. **Deploy on same domain** (or configure cookies)
4. **Test login** (should work across all)

**That's it!** If they're already using same Supabase, it should work with minimal changes.

---

## ❓ Questions to Verify

### 1. Supabase Configuration
- [ ] Are all platforms using the same Supabase project?
- [ ] Same Supabase URL?
- [ ] Same Supabase keys?

### 2. Domain Setup
- [ ] What domains are the platforms on?
- [ ] Can they be on same domain/subdomain?
- [ ] Or need cross-domain solution?

### 3. Current Auth
- [ ] How does Contract-Management-System handle auth?
- [ ] How does business-services-hub handle auth?
- [ ] How does BusinessHub handle auth?

---

## 🎯 Next Steps

**Tell me:**
1. **Are all platforms using same Supabase project?** (Yes/No)
2. **What domains are they on?** (List domains)
3. **How do they currently handle auth?** (Describe)

**Then I'll create the exact implementation plan!** 🚀

