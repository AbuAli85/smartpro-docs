import { useState, useEffect, useCallback } from 'react'
import { getServices, createService, updateService, deleteService, type Service, type ServiceFilters } from '@/lib/services'
import { toast } from 'sonner'

export function useServices(filters?: ServiceFilters) {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getServices(filters)
      setServices(data)
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to load services'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [filters])

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

