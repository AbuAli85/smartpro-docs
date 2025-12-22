import { useEffect } from 'react'
import { useLocation } from 'wouter'
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, Lock } from 'lucide-react'

interface AuthGuardProps {
  children: React.ReactNode
  redirectTo?: string
}

export function AuthGuard({ children, redirectTo = '/marketplace/auth/sign-in' }: AuthGuardProps) {
  const { user, loading } = useSupabaseAuth()
  const [, setLocation] = useLocation()

  useEffect(() => {
    if (!loading && !user) {
      setLocation(redirectTo)
    }
  }, [user, loading, redirectTo, setLocation])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-400" />
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Lock className="h-6 w-6 text-gray-400" />
              <CardTitle>Authentication Required</CardTitle>
            </div>
            <CardDescription>
              Please sign in to access this page
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setLocation(redirectTo)} className="w-full">
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}

