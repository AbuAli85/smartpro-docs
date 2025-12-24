import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase/client'
import { toast } from 'sonner'

interface SupabaseAuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, fullName?: string) => Promise<void>
  signOut: () => Promise<void>
  refreshSession: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  updatePassword: (newPassword: string) => Promise<void>
}

const SupabaseAuthContext = createContext<SupabaseAuthContextType | undefined>(undefined)

export function SupabaseAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session - with retry logic
    const initializeSession = async () => {
      try {
        // First attempt
        let { data: { session }, error } = await supabase.auth.getSession()
        
        // If no session, wait a bit and try again (in case other platform just logged in)
        if (!session && !error) {
          await new Promise(resolve => setTimeout(resolve, 500))
          const retry = await supabase.auth.getSession()
          session = retry.data.session
        }
        
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
      } catch (error) {
        console.error('Error getting session:', error)
        setLoading(false)
      }
    }

    initializeSession()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session?.user?.email)
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for storage events (cross-tab/cross-platform sync)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'sb-auth-token' || e.key?.startsWith('sb-')) {
        console.log('Storage changed, refreshing session:', e.key)
        // Refresh session when localStorage changes
        supabase.auth.getSession().then(({ data: { session } }) => {
          setSession(session)
          setUser(session?.user ?? null)
        })
      }
    }

    window.addEventListener('storage', handleStorageChange)

    // Also listen for custom events (for same-tab updates)
    const handleCustomStorage = () => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
        setUser(session?.user ?? null)
      })
    }

    window.addEventListener('auth-state-change', handleCustomStorage)

    // Periodic session check (every 2 seconds) as fallback
    // This helps detect sessions created by other platforms
    const intervalId = setInterval(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        // Only update if session changed (to avoid unnecessary re-renders)
        if (session?.user?.id !== user?.id) {
          setSession(session)
          setUser(session?.user ?? null)
        }
      })
    }, 2000)

    return () => {
      subscription.unsubscribe()
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('auth-state-change', handleCustomStorage)
      clearInterval(intervalId)
    }
  }, [user?.id])

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      if (data.user && data.session) {
        // Ensure session is set
        setSession(data.session)
        setUser(data.user)
        
        // Dispatch custom event to notify other tabs/platforms
        window.dispatchEvent(new Event('auth-state-change'))
        
        // Also trigger storage event for cross-tab sync
        if (typeof window !== 'undefined' && window.localStorage) {
          // Trigger a storage event by updating a dummy key
          const current = localStorage.getItem('sb-auth-sync') || '0'
          localStorage.setItem('sb-auth-sync', String(Number(current) + 1))
        }
        
        toast.success('Signed in successfully!')
      }
    } catch (error: any) {
      toast.error(error?.message || 'Failed to sign in')
      throw error
    }
  }

  const signUp = async (email: string, password: string, fullName?: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName || '',
          },
        },
      })

      if (error) throw error

      if (data.user) {
        toast.success('Account created! Please check your email to verify your account.')
      }
    } catch (error: any) {
      toast.error(error?.message || 'Failed to sign up')
      throw error
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      // Clear session state
      setSession(null)
      setUser(null)
      
      // Dispatch custom event to notify other tabs/platforms
      window.dispatchEvent(new Event('auth-state-change'))
      
      // Also trigger storage event for cross-tab sync
      if (typeof window !== 'undefined' && window.localStorage) {
        const current = localStorage.getItem('sb-auth-sync') || '0'
        localStorage.setItem('sb-auth-sync', String(Number(current) + 1))
      }
      
      toast.success('Signed out successfully')
    } catch (error: any) {
      toast.error(error?.message || 'Failed to sign out')
      throw error
    }
  }

  const refreshSession = async () => {
    try {
      const { data, error } = await supabase.auth.refreshSession()
      if (error) throw error
      if (data.session) {
        setSession(data.session)
        setUser(data.session.user)
      }
    } catch (error: any) {
      console.error('Failed to refresh session:', error)
    }
  }

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/marketplace/auth/reset-password`,
      })

      if (error) throw error

      toast.success('Password reset email sent! Please check your inbox.')
    } catch (error: any) {
      toast.error(error?.message || 'Failed to send password reset email')
      throw error
    }
  }

  const updatePassword = async (newPassword: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      })

      if (error) throw error

      toast.success('Password updated successfully!')
    } catch (error: any) {
      toast.error(error?.message || 'Failed to update password')
      throw error
    }
  }

  return (
    <SupabaseAuthContext.Provider
      value={{
        user,
        session,
        loading,
        signIn,
        signUp,
        signOut,
        refreshSession,
        resetPassword,
        updatePassword,
      }}
    >
      {children}
    </SupabaseAuthContext.Provider>
  )
}

export function useSupabaseAuth() {
  const context = useContext(SupabaseAuthContext)
  if (context === undefined) {
    throw new Error('useSupabaseAuth must be used within a SupabaseAuthProvider')
  }
  return context
}

