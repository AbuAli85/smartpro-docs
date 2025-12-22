# Component Extraction Implementation Guide

## 🎯 **Current Status**

**Current Project:** React + Vite + Express + Prisma  
**Target Systems:** Next.js 14 + Supabase  
**Strategy:** Gradual migration with component extraction

---

## 📋 **Phase 1: Foundation Setup (Day 1)**

### **Step 1.1: Install Required Dependencies**

Add Supabase and other required packages to current project:

```bash
pnpm add @supabase/supabase-js @supabase/ssr @tanstack/react-query
pnpm add recharts react-hook-form zod
pnpm add @radix-ui/react-accordion @radix-ui/react-avatar @radix-ui/react-dialog
pnpm add @radix-ui/react-dropdown-menu @radix-ui/react-label @radix-ui/react-popover
pnpm add @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slot
pnpm add @radix-ui/react-tabs @radix-ui/react-tooltip
pnpm add date-fns class-variance-authority clsx tailwind-merge
```

### **Step 1.2: Create Supabase Client Setup**

Create `lib/supabase/client.ts`:
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### **Step 1.3: Create Directory Structure**

```bash
# Create marketplace structure
mkdir -p client/src/components/marketplace/services
mkdir -p client/src/components/marketplace/bookings
mkdir -p client/src/pages/marketplace/services
mkdir -p client/src/pages/marketplace/bookings
mkdir -p api/marketplace/services
mkdir -p api/marketplace/bookings

# Create enterprise structure
mkdir -p client/src/components/enterprise/contracts
mkdir -p client/src/components/enterprise/crm
mkdir -p client/src/pages/enterprise/contracts
mkdir -p client/src/pages/enterprise/crm
mkdir -p api/enterprise/contracts
mkdir -p api/enterprise/crm

# Create shared structure
mkdir -p client/src/components/shared/ui
mkdir -p client/src/lib/supabase
mkdir -p client/src/lib/rbac
mkdir -p client/src/hooks
```

---

## 📦 **Phase 2: Extract Service Management (Days 2-3)**

### **Step 2.1: Extract Service Components**

#### **Copy Service Table Component:**
```bash
# Copy the component
cp ../business-services-hub/components/services/EnhancedServiceTable.tsx \
   client/src/components/marketplace/services/ServiceTable.tsx
```

#### **Adapt for React + Vite:**
- Replace `next/navigation` with `wouter` or React Router
- Replace `next/image` with regular `<img>` or a custom Image component
- Update import paths to match new structure
- Replace Supabase client imports

#### **Key Adaptations Needed:**

**Original (Next.js):**
```typescript
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { getSupabaseClient } from '@/lib/supabase'
```

**Adapted (React + Vite):**
```typescript
import { useLocation, useNavigate } from 'wouter'
import { supabase } from '@/lib/supabase/client'
```

### **Step 2.2: Extract Service Pages**

#### **Service List Page:**
```bash
# Copy service page
cp ../business-services-hub/app/dashboard/services/page.tsx \
   client/src/pages/marketplace/services/index.tsx
```

**Adaptations:**
- Convert from Next.js Server/Client Component to React Component
- Replace `useRouter()` with `useNavigate()` from wouter
- Update API calls to use Express backend or direct Supabase
- Replace Next.js layout with React component structure

### **Step 2.3: Extract Service API**

#### **Option A: Use Express Backend (Recommended for now)**
Create `api/marketplace/services.ts`:
```typescript
import express from 'express'
import { supabase } from '../../lib/supabase/client'

const router = express.Router()

// GET /api/marketplace/services
router.get('/', async (req, res) => {
  try {
    const { category, provider_id, status, page = 1, limit = 20, search } = req.query
    
    let query = supabase
      .from('services')
      .select('*, provider:profiles(*)')
      .eq('status', status || 'active')
    
    if (category) query = query.eq('category', category)
    if (provider_id) query = query.eq('provider_id', provider_id)
    if (search) query = query.ilike('title', `%${search}%`)
    
    const { data, error } = await query
      .range((page - 1) * limit, page * limit - 1)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    
    res.json({ data, pagination: { page, limit } })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// POST /api/marketplace/services
router.post('/', async (req, res) => {
  try {
    const { title, description, category, base_price, currency, ...rest } = req.body
    
    const { data, error } = await supabase
      .from('services')
      .insert({
        title,
        description,
        category,
        base_price,
        currency: currency || 'OMR',
        ...rest
      })
      .select()
      .single()
    
    if (error) throw error
    
    res.status(201).json({ data })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
```

#### **Option B: Direct Supabase (For client-side)**
Create `client/src/lib/services.ts`:
```typescript
import { supabase } from './supabase/client'

export async function getServices(filters?: {
  category?: string
  provider_id?: string
  status?: string
  page?: number
  limit?: number
  search?: string
}) {
  let query = supabase
    .from('services')
    .select('*, provider:profiles(*)')
    .eq('status', filters?.status || 'active')
  
  if (filters?.category) query = query.eq('category', filters.category)
  if (filters?.provider_id) query = query.eq('provider_id', filters.provider_id)
  if (filters?.search) query = query.ilike('title', `%${filters.search}%`)
  
  const page = filters?.page || 1
  const limit = filters?.limit || 20
  
  const { data, error } = await query
    .range((page - 1) * limit, page * limit - 1)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

export async function createService(serviceData: {
  title: string
  description: string
  category: string
  base_price: number
  currency?: string
  [key: string]: any
}) {
  const { data, error } = await supabase
    .from('services')
    .insert(serviceData)
    .select()
    .single()
  
  if (error) throw error
  return data
}
```

### **Step 2.4: Create Service Management Hook**

Create `client/src/hooks/useServices.ts`:
```typescript
import { useState, useEffect } from 'react'
import { getServices, createService } from '@/lib/services'
import { toast } from 'sonner'

export function useServices(filters?: {
  category?: string
  provider_id?: string
  status?: string
  page?: number
  limit?: number
  search?: string
}) {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchServices() {
      try {
        setLoading(true)
        const data = await getServices(filters)
        setServices(data)
        setError(null)
      } catch (err) {
        setError(err.message)
        toast.error('Failed to load services')
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [filters])

  const addService = async (serviceData) => {
    try {
      const newService = await createService(serviceData)
      setServices(prev => [newService, ...prev])
      toast.success('Service created successfully')
      return newService
    } catch (err) {
      toast.error('Failed to create service')
      throw err
    }
  }

  return { services, loading, error, addService }
}
```

---

## 📦 **Phase 3: Extract Booking System (Days 4-5)**

### **Step 3.1: Extract Booking Components**

#### **Copy Booking Components:**
```bash
# Copy booking components
cp -r ../business-services-hub/components/booking \
   client/src/components/marketplace/bookings
```

### **Step 3.2: Extract Booking Pages**

#### **Booking List Page:**
```bash
cp ../business-services-hub/app/dashboard/bookings/page.tsx \
   client/src/pages/marketplace/bookings/index.tsx
```

**Key Adaptations:**
- Replace Next.js routing with wouter
- Update Supabase client imports
- Convert Server Components to Client Components
- Update API route calls

### **Step 3.3: Create Booking API**

Create `api/marketplace/bookings.ts`:
```typescript
import express from 'express'
import { supabase } from '../../lib/supabase/client'

const router = express.Router()

// GET /api/marketplace/bookings
router.get('/', async (req, res) => {
  try {
    const { client_id, provider_id, status, page = 1, limit = 20 } = req.query
    
    let query = supabase
      .from('bookings')
      .select('*, service:services(*), client:profiles!bookings_client_id_fkey(*), provider:profiles!bookings_provider_id_fkey(*)')
    
    if (client_id) query = query.eq('client_id', client_id)
    if (provider_id) query = query.eq('provider_id', provider_id)
    if (status) query = query.eq('status', status)
    
    const { data, error } = await query
      .range((page - 1) * limit, page * limit - 1)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    
    res.json({ data, pagination: { page, limit } })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// POST /api/marketplace/bookings
router.post('/', async (req, res) => {
  try {
    const bookingData = req.body
    
    const { data, error } = await supabase
      .from('bookings')
      .insert(bookingData)
      .select()
      .single()
    
    if (error) throw error
    
    res.status(201).json({ data })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
```

---

## 📦 **Phase 4: Extract Contract Management (Days 6-7)**

### **Step 4.1: Extract Contract Components**

```bash
# Copy contract components
cp -r ../Contract-Management-System/components/contracts \
   client/src/components/enterprise/contracts
```

### **Step 4.2: Extract Contract Pages**

```bash
# Copy contract pages
cp -r ../Contract-Management-System/app/[locale]/contracts \
   client/src/pages/enterprise/contracts
```

**Key Adaptations:**
- Remove `[locale]` routing (or implement locale support)
- Replace Next.js specific features
- Update imports

### **Step 4.3: Create Contract API**

Create `api/enterprise/contracts.ts`:
```typescript
import express from 'express'
import { supabase } from '../../lib/supabase/client'

const router = express.Router()

// GET /api/enterprise/contracts
router.get('/', async (req, res) => {
  try {
    const { company_id, status, page = 1, limit = 20 } = req.query
    
    let query = supabase
      .from('contracts')
      .select('*, party:parties(*), promoter:promoters(*)')
    
    if (company_id) query = query.eq('company_id', company_id)
    if (status) query = query.eq('status', status)
    
    const { data, error } = await query
      .range((page - 1) * limit, page * limit - 1)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    
    res.json({ data, pagination: { page, limit } })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
```

---

## 📦 **Phase 5: Extract RBAC System (Days 8-9)**

### **Step 5.1: Extract RBAC Library**

```bash
# Copy RBAC system
cp -r ../Contract-Management-System/lib/rbac \
   client/src/lib/rbac
```

### **Step 5.2: Extract Auth Components**

```bash
# Copy auth guard components
cp ../Contract-Management-System/components/auth-guard.tsx \
   client/src/components/shared/AuthGuard.tsx

cp ../Contract-Management-System/components/permission-aware-header.tsx \
   client/src/components/shared/PermissionAwareHeader.tsx
```

### **Step 5.3: Create RBAC Hook**

Create `client/src/hooks/usePermissions.ts`:
```typescript
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { checkPermission } from '@/lib/rbac/permissions'

export function usePermissions() {
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)
  const [permissions, setPermissions] = useState([])

  useEffect(() => {
    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
        // Fetch user role and permissions
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single()
        
        if (profile) {
          setRole(profile.role)
          // Load permissions for role
          const { data: rolePermissions } = await supabase
            .from('role_permissions')
            .select('permission')
            .eq('role', profile.role)
          
          setPermissions(rolePermissions?.map(p => p.permission) || [])
        }
      }
    }

    loadUser()
  }, [])

  const hasPermission = (permission: string) => {
    return permissions.includes(permission) || role === 'admin'
  }

  return { user, role, permissions, hasPermission }
}
```

---

## 🔧 **Common Adaptations Checklist**

### **Next.js → React + Vite:**

- [ ] Replace `next/navigation` → `wouter` or React Router
- [ ] Replace `next/image` → Regular `<img>` or custom component
- [ ] Replace `next/link` → `wouter` Link or React Router Link
- [ ] Remove `'use client'` directives (all components are client in Vite)
- [ ] Replace Server Components with regular React components
- [ ] Update API routes from `app/api/*` to Express routes
- [ ] Replace `getServerSideProps` with `useEffect` + API calls
- [ ] Update environment variables (remove `NEXT_PUBLIC_` prefix for client)
- [ ] Replace `@/` imports with relative or configured aliases

### **Supabase Client Setup:**

- [ ] Create `lib/supabase/client.ts` for browser client
- [ ] Create `lib/supabase/server.ts` for server-side (if needed)
- [ ] Update all Supabase imports to use new client
- [ ] Configure RLS policies in Supabase dashboard

### **Type Definitions:**

- [ ] Copy type definitions from both systems
- [ ] Merge and deduplicate types
- [ ] Update import paths
- [ ] Ensure TypeScript compatibility

---

## 📝 **Environment Variables**

Create `.env.local`:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# App
NEXT_PUBLIC_APP_URL=http://localhost:5173
NODE_ENV=development
```

---

## 🚀 **Quick Start Commands**

### **1. Install Dependencies:**
```bash
pnpm install
```

### **2. Set Up Supabase:**
```bash
# Create Supabase project at https://supabase.com
# Copy environment variables to .env.local
```

### **3. Start Extraction:**
```bash
# Extract service management
./scripts/extract-services.sh

# Extract booking system
./scripts/extract-bookings.sh

# Extract contracts
./scripts/extract-contracts.sh
```

---

## ✅ **Progress Tracking**

### **Week 1:**
- [ ] Foundation setup complete
- [ ] Service management extracted
- [ ] Service management tested

### **Week 2:**
- [ ] Booking system extracted
- [ ] Booking system tested
- [ ] Contract management extracted

### **Week 3:**
- [ ] RBAC system extracted
- [ ] CRM extracted
- [ ] All systems integrated

---

## 🎯 **Next Steps**

1. **Start with Foundation Setup** (Day 1)
2. **Extract Service Management** (Days 2-3)
3. **Extract Booking System** (Days 4-5)
4. **Extract Contract Management** (Days 6-7)
5. **Extract RBAC System** (Days 8-9)

---

**Ready to begin! Start with Phase 1: Foundation Setup.**

