import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { getServices, createService, updateService, deleteService, type Service, type ServiceFilters } from '@/lib/services'
import { toast } from 'sonner'

// Helper function to create a stable key from filters object
function getFiltersKey(filters?: ServiceFilters): string {
  if (!filters) return 'default'
  return JSON.stringify({
    category: filters.category,
    provider_id: filters.provider_id,
    status: filters.status,
    page: filters.page,
    limit: filters.limit,
    search: filters.search,
  })
}

export function useServices(filters?: ServiceFilters) {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Create a stable filters key to prevent unnecessary re-fetches
  const filtersKey = useMemo(() => getFiltersKey(filters), [
    filters?.category,
    filters?.provider_id,
    filters?.status,
    filters?.page,
    filters?.limit,
    filters?.search,
  ])
  
  // Store the current filters in a ref to use in the callback
  const filtersRef = useRef(filters)
  useEffect(() => {
    filtersRef.current = filters
  }, [filters])

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getServices(filtersRef.current)
      setServices(data)
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to load services'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [filtersKey]) // Use filtersKey instead of filters object

  useEffect(() => {
    fetchServices()
  }, [fetchServices])

  const addService = useCallback(async (serviceData: Parameters<typeof createService>[0]) => {
    try {
      const newService = await createService(serviceData)
      setServices(prev => [newService, ...prev])
      toast.success('Service created successfully')
      return newService
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to create service'
      toast.error(errorMessage)
      throw err
    }
  }, [])

  const updateServiceById = useCallback(async (id: string, updates: Partial<Service>) => {
    try {
      const updated = await updateService(id, updates)
      setServices(prev => prev.map(s => s.id === id ? updated : s))
      toast.success('Service updated successfully')
      return updated
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to update service'
      toast.error(errorMessage)
      throw err
    }
  }, [])

  const removeService = useCallback(async (id: string) => {
    try {
      await deleteService(id)
      setServices(prev => prev.filter(s => s.id !== id))
      toast.success('Service deleted successfully')
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to delete service'
      toast.error(errorMessage)
      throw err
    }
  }, [])

  return {
    services,
    loading,
    error,
    addService,
    updateService: updateServiceById,
    deleteService: removeService,
    refetch: fetchServices,
  }
}

