import { useState, useEffect } from 'react'
import { useLocation } from 'wouter'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext'
import { useServices } from '@/hooks/useServices'
import { useBookings } from '@/hooks/useBookings'
import { supabase } from '@/lib/supabase/client'
import { 
  Package, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Plus,
  ArrowRight,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react'
import { getServiceCardImageUrl } from '@/lib/service-images'
import { toast } from 'sonner'

export default function DashboardPage() {
  const [, setLocation] = useLocation()
  const { user } = useSupabaseAuth()
  const [profile, setProfile] = useState<any>(null)
  const [loadingProfile, setLoadingProfile] = useState(true)

  // Get user's services
  const { services: myServices, loading: servicesLoading } = useServices({
    provider_id: user?.id,
    limit: 5,
  })

  // Get user's bookings (as client)
  const { bookings: myBookings, loading: bookingsLoading } = useBookings({
    client_id: user?.id,
  })

  // Get user's bookings (as provider)
  const { bookings: providerBookings, loading: providerBookingsLoading } = useBookings({
    provider_id: user?.id,
  })

  useEffect(() => {
    async function loadProfile() {
      if (!user?.id) return

      try {
        setLoadingProfile(true)
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (error) throw error
        setProfile(data)
      } catch (error: any) {
        console.error('Error loading profile:', error)
      } finally {
        setLoadingProfile(false)
      }
    }

    loadProfile()
  }, [user?.id])

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Please Sign In</CardTitle>
            <CardDescription>You need to be signed in to view your dashboard.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setLocation('/marketplace/auth/sign-in')}>
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Calculate stats
  const stats = {
    totalServices: myServices.length,
    activeServices: myServices.filter(s => s.status === 'active' && s.approval_status === 'approved').length,
    pendingServices: myServices.filter(s => s.approval_status === 'pending').length,
    totalBookings: myBookings.length,
    pendingBookings: myBookings.filter(b => b.status === 'pending').length,
    completedBookings: myBookings.filter(b => b.status === 'completed').length,
    providerBookings: providerBookings.length,
    totalRevenue: providerBookings
      .filter(b => b.status === 'completed')
      .reduce((sum, b) => sum + (b.total_amount || 0), 0),
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { className: string; label: string }> = {
      pending: { className: 'text-yellow-600 border-yellow-200 bg-yellow-50', label: 'Pending' },
      confirmed: { className: 'text-blue-600 border-blue-200 bg-blue-50', label: 'Confirmed' },
      in_progress: { className: 'text-purple-600 border-purple-200 bg-purple-50', label: 'In Progress' },
      completed: { className: 'text-green-600 border-green-200 bg-green-50', label: 'Completed' },
      cancelled: { className: 'text-red-600 border-red-200 bg-red-50', label: 'Cancelled' },
    }

    const variant = variants[status] || { className: '', label: status }
    return <Badge variant="outline" className={variant.className}>{variant.label}</Badge>
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Welcome back, {profile?.full_name || user.email}!
          </p>
        </div>
        <Button onClick={() => setLocation('/marketplace/services/create')}>
          <Plus className="h-4 w-4 mr-2" />
          Create Service
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Services</CardTitle>
            <Package className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalServices}</div>
            <p className="text-xs text-gray-500">
              {stats.activeServices} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBookings}</div>
            <p className="text-xs text-gray-500">
              {stats.pendingBookings} pending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Provider Bookings</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.providerBookings}</div>
            <p className="text-xs text-gray-500">
              {stats.completedBookings} completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-gray-500">OMR</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Services */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>My Services</CardTitle>
                <CardDescription>Services you've created</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLocation('/marketplace/services')}
              >
                View All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {servicesLoading ? (
              <div className="text-center py-8">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-500">Loading services...</p>
              </div>
            ) : myServices.length === 0 ? (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">No services yet</p>
                <Button onClick={() => setLocation('/marketplace/services/create')}>
                  Create Your First Service
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {myServices.slice(0, 5).map((service) => (
                  <div
                    key={service.id}
                    className="flex items-center gap-4 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => setLocation(`/marketplace/services/${service.id}`)}
                  >
                    <img
                      src={getServiceCardImageUrl(service.category, service.title, service.cover_image_url, 80, 80)}
                      alt={service.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{service.title}</h3>
                      <p className="text-sm text-gray-500">{service.category}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {service.approval_status === 'pending' && (
                          <Badge variant="outline" className="text-yellow-600 border-yellow-200 bg-yellow-50">
                            Pending Approval
                          </Badge>
                        )}
                        {service.status === 'active' && service.approval_status === 'approved' && (
                          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                            Active
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{service.base_price} {service.currency}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* My Bookings */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>My Bookings</CardTitle>
                <CardDescription>Services you've booked</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLocation('/marketplace/bookings')}
              >
                View All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {bookingsLoading ? (
              <div className="text-center py-8">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-500">Loading bookings...</p>
              </div>
            ) : myBookings.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No bookings yet</p>
                <p className="text-sm text-gray-400 mt-2">
                  Browse services and book your first one!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {myBookings.slice(0, 5).map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center gap-4 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => setLocation(`/marketplace/bookings/${booking.id}`)}
                  >
                    {booking.service?.cover_image_url ? (
                      <img
                        src={getServiceCardImageUrl(
                          booking.service.category,
                          booking.service.title,
                          booking.service.cover_image_url,
                          80,
                          80
                        )}
                        alt={booking.service.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                        <Package className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{booking.service?.title || 'Unknown Service'}</h3>
                      <p className="text-sm text-gray-500">
                        {booking.provider?.full_name || 'Unknown Provider'}
                      </p>
                      {booking.scheduled_date && (
                        <p className="text-xs text-gray-400 mt-1">
                          <Clock className="h-3 w-3 inline mr-1" />
                          {new Date(booking.scheduled_date).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{booking.total_amount} {booking.currency}</p>
                      {getStatusBadge(booking.status)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

