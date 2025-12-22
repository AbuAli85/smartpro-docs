import { useState, useEffect } from 'react'
import { useLocation, useRoute } from 'wouter'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Save, X } from 'lucide-react'
import { getServiceById, updateService } from '@/lib/services'
import { useServices } from '@/hooks/useServices'
import { toast } from 'sonner'
import type { Service } from '@/lib/services'

const categories = [
  'Digital Marketing',
  'Legal Services',
  'Accounting',
  'IT Services',
  'Design & Branding',
  'Consulting',
  'Translation',
  'HR Services',
  'Web Development',
  'Content Creation'
]

export default function ServiceEditPage() {
  const [, setLocation] = useLocation()
  const [match, params] = useRoute('/marketplace/services/:id/edit')
  const { updateService: updateServiceFromHook } = useServices()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [service, setService] = useState<Service | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    base_price: '',
    currency: 'OMR',
    estimated_duration: '',
    location: '',
    requirements: '',
  })

  useEffect(() => {
    async function loadService() {
      if (!params?.id) return

      try {
        setLoading(true)
        const data = await getServiceById(params.id)
        setService(data)
        setFormData({
          title: data.title,
          description: data.description,
          category: data.category,
          base_price: data.base_price.toString(),
          currency: data.currency,
          estimated_duration: data.estimated_duration || '',
          location: data.location || '',
          requirements: data.requirements || '',
        })
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
    
    if (!formData.title || !formData.description || !formData.category || !formData.base_price) {
      toast.error('Please fill in all required fields')
      return
    }

    if (!service) return

    try {
      setSaving(true)

      await updateServiceFromHook(service.id, {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        base_price: parseFloat(formData.base_price),
        currency: formData.currency as 'OMR' | 'USD' | 'EUR',
        estimated_duration: formData.estimated_duration || undefined,
        location: formData.location || undefined,
        requirements: formData.requirements || undefined,
      })

      toast.success('Service updated successfully!')
      setLocation(`/marketplace/services/${service.id}`)
    } catch (error: any) {
      toast.error(error?.message || 'Failed to update service')
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
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
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Service</h1>
          <p className="text-gray-500 mt-1">Update your service information</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Update details about your service</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Service Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="e.g., Professional Web Design"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Describe your service in detail..."
                  rows={5}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleChange('category', value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="currency">Currency *</Label>
                  <Select
                    value={formData.currency}
                    onValueChange={(value) => handleChange('currency', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="OMR">OMR (Omani Rial)</SelectItem>
                      <SelectItem value="USD">USD (US Dollar)</SelectItem>
                      <SelectItem value="EUR">EUR (Euro)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="base_price">Base Price *</Label>
                <Input
                  id="base_price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.base_price}
                  onChange={(e) => handleChange('base_price', e.target.value)}
                  placeholder="0.00"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Additional Details */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Details</CardTitle>
              <CardDescription>Optional information about your service</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="estimated_duration">Estimated Duration</Label>
                <Input
                  id="estimated_duration"
                  value={formData.estimated_duration}
                  onChange={(e) => handleChange('estimated_duration', e.target.value)}
                  placeholder="e.g., 2-3 weeks, 1 month"
                />
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  placeholder="e.g., Muscat, Oman or Remote"
                />
              </div>

              <div>
                <Label htmlFor="requirements">Requirements</Label>
                <Textarea
                  id="requirements"
                  value={formData.requirements}
                  onChange={(e) => handleChange('requirements', e.target.value)}
                  placeholder="What do clients need to provide? (e.g., brand guidelines, content, etc.)"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setLocation(`/marketplace/services/${service.id}`)}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

