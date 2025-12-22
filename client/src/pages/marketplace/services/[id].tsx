import { useState, useEffect } from 'react'
import { useLocation, useRoute } from 'wouter'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Edit, Star, DollarSign, Calendar, User, MapPin, Clock } from 'lucide-react'
import { getServiceById } from '@/lib/services'
import { getServiceCardImageUrl } from '@/lib/service-images'
import { toast } from 'sonner'
import type { Service } from '@/lib/services'

export default function ServiceDetailPage() {
  const [, setLocation] = useLocation()
  const [match, params] = useRoute('/marketplace/services/:id')
  const [service, setService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)

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

  const getStatusBadge = () => {
    if (service.approval_status === 'pending') {
      return <Badge variant="outline" className="text-yellow-600 border-yellow-200 bg-yellow-50">Pending Approval</Badge>
    }
    
    switch (service.status) {
      case 'active':
        return <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">Active</Badge>
      case 'suspended':
        return <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">Suspended</Badge>
      case 'inactive':
        return <Badge variant="outline" className="text-gray-600 border-gray-200 bg-gray-50">Inactive</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setLocation('/marketplace/services')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Services
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-900">{service.title}</h1>
            {getStatusBadge()}
            {service.featured && (
              <Badge variant="outline" className="text-yellow-600 border-yellow-200 bg-yellow-50">
                <Star className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            )}
          </div>
          <p className="text-gray-500">{service.category}</p>
        </div>
        <Button onClick={() => setLocation(`/marketplace/services/${service.id}/edit`)}>
          <Edit className="h-4 w-4 mr-2" />
          Edit Service
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image */}
          <Card>
            <CardContent className="p-0">
              <img
                src={getServiceCardImageUrl(service.category, service.title, service.cover_image_url, 800, 400)}
                alt={service.title}
                className="w-full h-64 object-cover rounded-t-lg"
              />
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 whitespace-pre-wrap">{service.description}</p>
            </CardContent>
          </Card>

          {/* Requirements */}
          {service.requirements && (
            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 whitespace-pre-wrap">{service.requirements}</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pricing Card */}
          <Card>
            <CardHeader>
              <CardTitle>Pricing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="h-5 w-5 text-gray-400" />
                <span className="text-3xl font-bold">{service.base_price}</span>
                <span className="text-gray-500">{service.currency}</span>
              </div>
              <Button className="w-full" size="lg">
                Book This Service
              </Button>
            </CardContent>
          </Card>

          {/* Service Details */}
          <Card>
            <CardHeader>
              <CardTitle>Service Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {service.estimated_duration && (
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium">Duration</p>
                    <p className="text-sm text-gray-500">{service.estimated_duration}</p>
                  </div>
                </div>
              )}

              {service.location && (
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm text-gray-500">{service.location}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium">Created</p>
                  <p className="text-sm text-gray-500">
                    {new Date(service.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Provider Info */}
          <Card>
            <CardHeader>
              <CardTitle>Provider</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium">{service.provider?.full_name || 'Unknown'}</p>
                  {service.provider?.company_name && (
                    <p className="text-sm text-gray-500">{service.provider.company_name}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

