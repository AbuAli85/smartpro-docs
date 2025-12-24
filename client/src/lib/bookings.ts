import { supabase } from './supabase/client'

export interface Booking {
  id: string
  service_id: string
  client_id: string
  provider_id: string
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
  scheduled_date?: string
  total_amount: number
  currency: string
  notes?: string
  created_at: string
  updated_at: string
  service?: {
    id: string
    title: string
    category: string
    base_price: number
    cover_image_url?: string
  }
  provider?: {
    id: string
    full_name: string
    email: string
  }
  client?: {
    id: string
    full_name: string
    email: string
  }
}

export interface CreateBookingData {
  service_id: string
  scheduled_date?: string
  notes?: string
  total_amount: number
  currency?: string
}

export async function getBookings(filters?: {
  client_id?: string
  provider_id?: string
  status?: string
}): Promise<Booking[]> {
  let query = supabase
    .from('bookings')
    .select(`
      *,
      service:services(id, title, category, base_price, cover_image_url),
      provider:profiles!bookings_provider_id_fkey(id, full_name, email),
      client:profiles!bookings_client_id_fkey(id, full_name, email)
    `)
    .order('created_at', { ascending: false })

  if (filters?.client_id) {
    query = query.eq('client_id', filters.client_id)
  }

  if (filters?.provider_id) {
    query = query.eq('provider_id', filters.provider_id)
  }

  if (filters?.status) {
    query = query.eq('status', filters.status)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching bookings:', error)
    throw error
  }

  return data || []
}

export async function getBookingById(id: string): Promise<Booking | null> {
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      service:services(id, title, category, base_price, cover_image_url),
      provider:profiles!bookings_provider_id_fkey(id, full_name, email),
      client:profiles!bookings_client_id_fkey(id, full_name, email)
    `)
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching booking:', error)
    throw error
  }

  return data
}

export async function createBooking(bookingData: CreateBookingData, clientId: string): Promise<Booking> {
  // First, get the service to get provider_id
  const { data: service, error: serviceError } = await supabase
    .from('services')
    .select('provider_id, base_price, currency')
    .eq('id', bookingData.service_id)
    .single()

  if (serviceError || !service) {
    throw new Error('Service not found')
  }

  const { data, error } = await supabase
    .from('bookings')
    .insert({
      service_id: bookingData.service_id,
      client_id: clientId,
      provider_id: service.provider_id,
      status: 'pending',
      scheduled_date: bookingData.scheduled_date || null,
      total_amount: bookingData.total_amount || service.base_price,
      currency: bookingData.currency || service.currency || 'OMR',
      notes: bookingData.notes || null,
    })
    .select(`
      *,
      service:services(id, title, category, base_price, cover_image_url),
      provider:profiles!bookings_provider_id_fkey(id, full_name, email),
      client:profiles!bookings_client_id_fkey(id, full_name, email)
    `)
    .single()

  if (error) {
    console.error('Error creating booking:', error)
    throw error
  }

  return data
}

export async function updateBooking(id: string, updates: Partial<Booking>): Promise<Booking> {
  const { data, error } = await supabase
    .from('bookings')
    .update(updates)
    .eq('id', id)
    .select(`
      *,
      service:services(id, title, category, base_price, cover_image_url),
      provider:profiles!bookings_provider_id_fkey(id, full_name, email),
      client:profiles!bookings_client_id_fkey(id, full_name, email)
    `)
    .single()

  if (error) {
    console.error('Error updating booking:', error)
    throw error
  }

  return data
}

export async function cancelBooking(id: string): Promise<void> {
  const { error } = await supabase
    .from('bookings')
    .update({ status: 'cancelled' })
    .eq('id', id)

  if (error) {
    console.error('Error cancelling booking:', error)
    throw error
  }
}

