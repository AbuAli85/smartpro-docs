import { useState, useMemo } from 'react'
import { useLocation } from 'wouter'
import { ServiceTable } from '@/components/marketplace/services/ServiceTable'
import { useServices } from '@/hooks/useServices'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Package, RefreshCw, LogIn, User, Search, X, Filter } from 'lucide-react'
import { toast } from 'sonner'
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext'
import type { Service, ServiceFilters } from '@/lib/services'

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

export default function ServicesPage() {
  const [, setLocation] = useLocation()
  const { user, signOut } = useSupabaseAuth()
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [recentlyApproved, setRecentlyApproved] = useState<Set<string>>(new Set())
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [approvalStatusFilter, setApprovalStatusFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'created_at' | 'title' | 'base_price' | 'rating' | 'booking_count'>('created_at')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  
  // Build filters object
  const filters: ServiceFilters = useMemo(() => {
    const filterObj: ServiceFilters = {
      page: 1,
      limit: 100,
      sort_by: sortBy,
      sort_order: sortOrder,
    }
    
    if (statusFilter !== 'all') {
      filterObj.status = statusFilter
    }
    
    if (approvalStatusFilter !== 'all') {
      filterObj.approval_status = approvalStatusFilter
    }
    
    if (categoryFilter !== 'all') {
      filterObj.category = categoryFilter
    }
    
    if (searchQuery.trim()) {
      filterObj.search = searchQuery.trim()
    }
    
    return filterObj
  }, [searchQuery, categoryFilter, statusFilter, approvalStatusFilter, sortBy, sortOrder])
  
  const { 
    services, 
    loading, 
    error, 
    deleteService, 
    updateService,
    refetch 
  } = useServices(filters)
  
  // Get unique categories from services (for dynamic category list)
  const availableCategories = useMemo(() => {
    const cats = new Set(services.map(s => s.category).filter(Boolean))
    return Array.from(cats).sort()
  }, [services])
  
  // Clear all filters
  const handleClearFilters = () => {
    setSearchQuery('')
    setCategoryFilter('all')
    setStatusFilter('all')
    setApprovalStatusFilter('all')
    setSortBy('created_at')
    setSortOrder('desc')
  }
  
  // Check if any filters are active
  const hasActiveFilters = searchQuery.trim() || 
    categoryFilter !== 'all' || 
    statusFilter !== 'all' || 
    approvalStatusFilter !== 'all' ||
    sortBy !== 'created_at' ||
    sortOrder !== 'desc'

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
          {user ? (
            <>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                <span>{user.email}</span>
              </div>
              <Button
                variant="outline"
                onClick={() => signOut()}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              onClick={() => setLocation('/marketplace/auth/sign-in')}
            >
              <LogIn className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          )}
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          {user && (
            <Button onClick={handleCreateService}>
              <Plus className="h-4 w-4 mr-2" />
              Create Service
            </Button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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

      {/* Filters & Search */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search services by title, description, or provider..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Filter Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {/* Category Filter */}
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {availableCategories.length > 0 ? (
                    availableCategories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))
                  ) : (
                    categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>

              {/* Approval Status Filter */}
              <Select value={approvalStatusFilter} onValueChange={setApprovalStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Approval" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Approval</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>

              {/* Sort By */}
              <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="created_at">Date Created</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                  <SelectItem value="base_price">Price</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="booking_count">Popularity</SelectItem>
                </SelectContent>
              </Select>

              {/* Sort Order */}
              <div className="flex gap-2">
                <Select value={sortOrder} onValueChange={(value: 'asc' | 'desc') => setSortOrder(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Order" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="desc">Descending</SelectItem>
                    <SelectItem value="asc">Ascending</SelectItem>
                  </SelectContent>
                </Select>
                {hasActiveFilters && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClearFilters}
                    className="whitespace-nowrap"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Clear
                  </Button>
                )}
              </div>
            </div>

            {/* Active Filters Summary */}
            {hasActiveFilters && (
              <div className="flex items-center gap-2 text-sm text-gray-600 pt-2 border-t">
                <Filter className="h-4 w-4" />
                <span>Active filters:</span>
                {searchQuery && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                    Search: "{searchQuery}"
                  </span>
                )}
                {categoryFilter !== 'all' && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                    Category: {categoryFilter}
                  </span>
                )}
                {statusFilter !== 'all' && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                    Status: {statusFilter}
                  </span>
                )}
                {approvalStatusFilter !== 'all' && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                    Approval: {approvalStatusFilter}
                  </span>
                )}
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded">
                  Sort: {sortBy} ({sortOrder})
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

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
        searchQueryExternal={searchQuery}
        statusFilterExternal={statusFilter}
        categoryFilterExternal={categoryFilter}
        hideInternalFilters={true}
        disableClientSorting={true}
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
                  onClick={async () => {
                    if (selectedIds.length === 0) {
                      toast.error('Please select at least one service');
                      return;
                    }

                    if (!confirm(`Are you sure you want to approve ${selectedIds.length} service(s)?`)) {
                      return;
                    }

                    try {
                      let successCount = 0;
                      let failCount = 0;

                      for (const id of selectedIds) {
                        try {
                          await updateService(id, {
                            approval_status: 'approved',
                            status: 'active'
                          });
                          successCount++;
                        } catch (err) {
                          failCount++;
                        }
                      }

                      if (successCount > 0) {
                        toast.success(`Successfully approved ${successCount} service(s)`);
                      }
                      if (failCount > 0) {
                        toast.error(`Failed to approve ${failCount} service(s)`);
                      }

                      setSelectedIds([]);
                      refetch();
                    } catch (err) {
                      toast.error('Failed to approve services. Please try again.');
                    }
                  }}
                >
                  Approve Selected
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={async () => {
                    if (selectedIds.length === 0) {
                      toast.error('Please select at least one service');
                      return;
                    }

                    if (!confirm(`Are you sure you want to delete ${selectedIds.length} service(s)? This action cannot be undone.`)) {
                      return;
                    }

                    try {
                      let successCount = 0;
                      let failCount = 0;

                      for (const id of selectedIds) {
                        try {
                          await deleteService(id);
                          successCount++;
                        } catch (err) {
                          failCount++;
                        }
                      }

                      if (successCount > 0) {
                        toast.success(`Successfully deleted ${successCount} service(s)`);
                      }
                      if (failCount > 0) {
                        toast.error(`Failed to delete ${failCount} service(s)`);
                      }

                      setSelectedIds([]);
                      refetch();
                    } catch (err) {
                      toast.error('Failed to delete services. Please try again.');
                    }
                  }}
                >
                  Delete Selected
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

