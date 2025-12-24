import { useState, useEffect } from 'react'
import { useLocation, useRoute } from 'wouter'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Calendar, Clock, DollarSign, User } from 'lucide-react'
import { getServiceById } from '@/lib/services'
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext'
import { useBookings } from '@/hooks/useBookings'
import { getServiceCardImageUrl } from '@/lib/service-images'
import { toast } from 'sonner'
import type { Service } from '@/lib/services'

export default function BookServicePage() {
  const [, setLocation] = useLocation()
  const [match, params] = useRoute('/marketplace/services/:id/book')
  const { user } = useSupabaseAuth()
  const { addBooking } = useBookings()

  const [service, setService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const [scheduledDate, setScheduledDate] = useState('')
  const [scheduledTime, setScheduledTime] = useState('')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    async function loadService() {
      if (!params?.id) return

      try {
        setLoading(true)
        const data = await getServiceById(params.id)
        setService(data)
      } catch (error: any) {
        toast.error(error?.message || 'Failed to load service')
        setLocation('/marketplace/services')
      } finally {
        setLoading(false)
      }
    }

    loadService()
  }, [params?.id, setLocation])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast.error('Please sign in to book a service')
      setLocation('/marketplace/auth/sign-in')
      return
    }

    if (!service) return

    try {
      setSubmitting(true)

      // Combine date and time
      let scheduledDateTime: string | undefined
      if (scheduledDate && scheduledTime) {
        scheduledDateTime = new Date(`${scheduledDate}T${scheduledTime}`).toISOString()
      }

      await addBooking(
        {
          service_id: service.id,
          scheduled_date: scheduledDateTime,
          notes: notes || undefined,
          total_amount: service.base_price,
          currency: service.currency,
        },
        user.id
      )

      toast.success('Booking created successfully!')
      setLocation('/marketplace/dashboard')
    } catch (error: any) {
      toast.error(error?.message || 'Failed to create booking')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-500">Loading service...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-600">Service Not Found</CardTitle>
            <CardDescription>The service you're looking for doesn't exist.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setLocation('/marketplace/services')}>
              Back to Services
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Sign In Required</CardTitle>
            <CardDescription>Please sign in to book this service.</CardDescription>
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

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setLocation(`/marketplace/services/${service.id}`)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Service
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Booking Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Book Service</CardTitle>
              <CardDescription>Fill in the details to book this service</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="scheduledDate">Preferred Date (Optional)</Label>
                  <Input
                    id="scheduledDate"
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    min={today}
                    disabled={submitting}
                  />
                </div>

                <div>
                  <Label htmlFor="scheduledTime">Preferred Time (Optional)</Label>
                  <Input
                    id="scheduledTime"
                    type="time"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    disabled={submitting || !scheduledDate}
                  />
                  {!scheduledDate && (
                    <p className="text-xs text-gray-500 mt-1">Select a date first</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="notes">Additional Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any special requirements or notes..."
                    rows={4}
                    disabled={submitting}
                  />
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={submitting}>
                  {submitting ? 'Booking...' : 'Confirm Booking'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Service Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Service Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <img
                src={getServiceCardImageUrl(service.category, service.title, service.cover_image_url, 400, 200)}
                alt={service.title}
                className="w-full h-40 object-cover rounded-lg"
              />
              <div>
                <h3 className="font-bold text-lg">{service.title}</h3>
                <p className="text-sm text-gray-500">{service.category}</p>
              </div>

              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">Price</span>
                  </div>
                  <span className="font-bold">{service.base_price} {service.currency}</span>
                </div>

                {service.provider && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">Provider</span>
                    </div>
                    <span className="text-sm">{service.provider.full_name}</span>
                  </div>
                )}

                {service.estimated_duration && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">Duration</span>
                    </div>
                    <span className="text-sm">{service.estimated_duration}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

