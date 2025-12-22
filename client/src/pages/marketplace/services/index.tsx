import { useState } from 'react'
import { useLocation } from 'wouter'
import { ServiceTable } from '@/components/marketplace/services/ServiceTable'
import { useServices } from '@/hooks/useServices'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Package, RefreshCw } from 'lucide-react'
import { toast } from 'sonner'
import type { Service } from '@/lib/services'

export default function ServicesPage() {
  const [, setLocation] = useLocation()
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [recentlyApproved, setRecentlyApproved] = useState<Set<string>>(new Set())
  
  const { 
    services, 
    loading, 
    error, 
    deleteService, 
    updateService,
    refetch 
  } = useServices({
    status: 'all', // Show all services, filter in table
    page: 1,
    limit: 100
  })

  const handleViewService = (service: Service) => {
    setLocation(`/marketplace/services/${service.id}`)
  }

  const handleEditService = (service: Service) => {
    setLocation(`/marketplace/services/${service.id}/edit`)
  }

  const handleDeleteService = async (service: Service) => {
    if (confirm(`Are you sure you want to delete "${service.title}"?`)) {
      try {
        await deleteService(service.id)
      } catch (err) {
        // Error is already handled in the hook
      }
    }
  }

  const handleApproveService = async (service: Service) => {
    try {
      await updateService(service.id, {
        approval_status: 'approved',
        status: 'active'
      })
      // Add to recently approved set for animation
      setRecentlyApproved(prev => new Set(prev).add(service.id))
      // Remove after animation completes
      setTimeout(() => {
        setRecentlyApproved(prev => {
          const next = new Set(prev)
          next.delete(service.id)
          return next
        })
      }, 3000)
    } catch (err) {
      // Error is already handled in the hook
    }
  }

  const handleSuspendService = async (service: Service) => {
    try {
      await updateService(service.id, {
        status: 'suspended'
      })
    } catch (err) {
      // Error is already handled in the hook
    }
  }

  const handleFeatureService = async (service: Service) => {
    try {
      await updateService(service.id, {
        featured: true
      })
    } catch (err) {
      // Error is already handled in the hook
    }
  }

  const handleCreateService = () => {
    setLocation('/marketplace/services/create')
  }

  const handleRefresh = () => {
    refetch()
    toast.success('Services refreshed')
  }

  if (loading && services.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500">Loading services...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error && services.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-600">Error Loading Services</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleRefresh} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const stats = {
    total: services.length,
    active: services.filter(s => s.status === 'active').length,
    pending: services.filter(s => s.approval_status === 'pending').length,
    suspended: services.filter(s => s.status === 'suspended').length,
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Services</h1>
          <p className="text-gray-500 mt-1">Manage your service offerings</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={handleCreateService}>
            <Plus className="h-4 w-4 mr-2" />
            Create Service
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Services</CardDescription>
            <CardTitle className="text-2xl">{stats.total}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Active</CardDescription>
            <CardTitle className="text-2xl text-green-600">{stats.active}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Pending Approval</CardDescription>
            <CardTitle className="text-2xl text-yellow-600">{stats.pending}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Suspended</CardDescription>
            <CardTitle className="text-2xl text-red-600">{stats.suspended}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Services Table */}
      <ServiceTable
        services={services}
        onViewService={handleViewService}
        onEditService={handleEditService}
        onDeleteService={handleDeleteService}
        onApproveService={handleApproveService}
        onSuspendService={handleSuspendService}
        onFeatureService={handleFeatureService}
        selectable={true}
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        allowFeature={true}
        recentlyApproved={recentlyApproved}
      />

      {/* Bulk Actions (if items selected) */}
      {selectedIds.length > 0 && (
        <Card className="mt-4 border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-blue-700">
                {selectedIds.length} service{selectedIds.length !== 1 ? 's' : ''} selected
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // Bulk approve logic
                    toast.info('Bulk approve feature coming soon')
                  }}
                >
                  Approve Selected
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedIds([])}
                >
                  Clear Selection
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

