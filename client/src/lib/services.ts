import { supabase } from './supabase/client'

export interface Service {
  id: string
  title: string
  description: string
  category: string
  base_price: number
  currency: string
  status: string
  approval_status: string
  featured: boolean
  created_at: string
  updated_at: string
  cover_image_url?: string
  provider_id: string
  provider?: {
    id: string
    full_name: string
    email: string
  }
}

export interface ServiceFilters {
  category?: string
  provider_id?: string
  status?: string
  approval_status?: string
  page?: number
  limit?: number
  search?: string
  min_price?: number
  max_price?: number
  sort_by?: 'created_at' | 'title' | 'base_price' | 'rating' | 'booking_count'
  sort_order?: 'asc' | 'desc'
}

export async function getServices(filters?: ServiceFilters): Promise<Service[]> {
  let query = supabase
    .from('services')
    .select('*, provider:profiles(*)')
  
  // Status filter - if 'all' or not specified, don't filter by status
  if (filters?.status && filters.status !== 'all') {
    query = query.eq('status', filters.status)
  }
  
  // Approval status filter
  if (filters?.approval_status && filters.approval_status !== 'all') {
    query = query.eq('approval_status', filters.approval_status)
  }
  
  // Category filter
  if (filters?.category && filters.category !== 'all') {
    query = query.eq('category', filters.category)
  }
  
  // Provider filter
  if (filters?.provider_id) {
    query = query.eq('provider_id', filters.provider_id)
  }
  
  // Price range filters
  if (filters?.min_price !== undefined) {
    query = query.gte('base_price', filters.min_price)
  }
  if (filters?.max_price !== undefined) {
    query = query.lte('base_price', filters.max_price)
  }
  
  // Search filter - search in title and description
  if (filters?.search) {
    const searchTerm = filters.search.trim()
    if (searchTerm) {
      // Search in title (primary) and description (secondary)
      // Note: Supabase doesn't support OR in a single query easily, so we search title first
      // For better results, we could do multiple queries and combine, but for now, search title
      query = query.ilike('title', `%${searchTerm}%`)
    }
  }
  
  // Pagination
  const page = filters?.page || 1
  const limit = filters?.limit || 100 // Increased default limit for better filtering
  
  // Sorting
  const sortBy = filters?.sort_by || 'created_at'
  const sortOrder = filters?.sort_order || 'desc'
  
  const { data, error } = await query
    .range((page - 1) * limit, page * limit - 1)
    .order(sortBy, { ascending: sortOrder === 'asc' })
  
  if (error) {
    console.error('Error fetching services:', error)
    throw error
  }
  
  return data || []
}

export async function getServiceById(id: string): Promise<Service | null> {
  const { data, error } = await supabase
    .from('services')
    .select('*, provider:profiles(*)')
    .eq('id', id)
    .single()
  
  if (error) {
    console.error('Error fetching service:', error)
    throw error
  }
  
  return data
}

export async function createService(serviceData: {
  title: string
  description: string
  category: string
  base_price: number
  currency?: string
  estimated_duration?: string
  location?: string
  tags?: string[]
  requirements?: string
  provider_id: string
}): Promise<Service> {
  const { data, error } = await supabase
    .from('services')
    .insert({
      ...serviceData,
      currency: serviceData.currency || 'OMR',
      status: 'pending',
      approval_status: 'pending',
    })
    .select('*, provider:profiles(*)')
    .single()
  
  if (error) {
    console.error('Error creating service:', error)
    throw error
  }
  
  return data
}

export async function updateService(
  id: string,
  updates: Partial<Service>
): Promise<Service> {
  const { data, error } = await supabase
    .from('services')
    .update(updates)
    .eq('id', id)
    .select('*, provider:profiles(*)')
    .single()
  
  if (error) {
    console.error('Error updating service:', error)
    throw error
  }
  
  return data
}

export async function deleteService(id: string): Promise<void> {
  const { error } = await supabase
    .from('services')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('Error deleting service:', error)
    throw error
  }
}

