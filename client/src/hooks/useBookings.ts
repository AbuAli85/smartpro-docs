import { useState, useEffect, useCallback } from 'react'
import { getBookings, createBooking, updateBooking, cancelBooking, type Booking, type CreateBookingData } from '@/lib/bookings'
import { toast } from 'sonner'

export function useBookings(filters?: {
  client_id?: string
  provider_id?: string
  status?: string
}) {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getBookings(filters)
      setBookings(data)
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to load bookings'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [filters?.client_id, filters?.provider_id, filters?.status])

  useEffect(() => {
    fetchBookings()
  }, [fetchBookings])

  const addBooking = useCallback(async (bookingData: CreateBookingData, clientId: string) => {
    try {
      const newBooking = await createBooking(bookingData, clientId)
      setBookings(prev => [newBooking, ...prev])
      toast.success('Booking created successfully!')
      return newBooking
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to create booking'
      toast.error(errorMessage)
      throw err
    }
  }, [])

  const updateBookingById = useCallback(async (id: string, updates: Partial<Booking>) => {
    try {
      const updated = await updateBooking(id, updates)
      setBookings(prev => prev.map(b => b.id === id ? updated : b))
      toast.success('Booking updated successfully')
      return updated
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to update booking'
      toast.error(errorMessage)
      throw err
    }
  }, [])

  const cancelBookingById = useCallback(async (id: string) => {
    try {
      await cancelBooking(id)
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'cancelled' as const } : b))
      toast.success('Booking cancelled successfully')
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to cancel booking'
      toast.error(errorMessage)
      throw err
    }
  }, [])

  return {
    bookings,
    loading,
    error,
    addBooking,
    updateBooking: updateBookingById,
    cancelBooking: cancelBookingById,
    refetch: fetchBookings,
  }
}

