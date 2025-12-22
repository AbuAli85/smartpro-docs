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
  page?: number
  limit?: number
  search?: string
}

export async function getServices(filters?: ServiceFilters): Promise<Service[]> {
  let query = supabase
    .from('services')
    .select('*, provider:profiles(*)')
    .eq('status', filters?.status || 'active')
  
  if (filters?.category) {
    query = query.eq('category', filters.category)
  }
  
  if (filters?.provider_id) {
    query = query.eq('provider_id', filters.provider_id)
  }
  
  if (filters?.search) {
    query = query.ilike('title', `%${filters.search}%`)
  }
  
  const page = filters?.page || 1
  const limit = filters?.limit || 20
  
  const { data, error } = await query
    .range((page - 1) * limit, page * limit - 1)
    .order('created_at', { ascending: false })
  
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

