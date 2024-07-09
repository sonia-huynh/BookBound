import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  addBookReadDates,
  deleteBookReadDates,
  getBookReadDates,
  updateBookDates,
} from '../apis/dates.ts'

// Add book dates
export function useAddBookReadDates() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (dates: {
      bookId: string
      startDate: string | null
      endDate: string | null
    }) => addBookReadDates(dates.bookId, dates.startDate, dates.endDate),
    onSuccess: () => {
      console.log('working')
      queryClient.invalidateQueries({
        queryKey: ['dates'],
      })
    },
  })
}

// Get book dates
export function useGetBookReadDates(bookId: string) {
  return useQuery({
    queryKey: ['dates'],
    queryFn: async () => {
      const dates = await getBookReadDates(bookId)
      return dates
    },
  })
}

// Update Book dates
export function useUpdateBookDates() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (dates: {
      bookId: string
      startDate: string | null
      endDate: string | null
    }) => updateBookDates(dates.bookId, dates.startDate, dates.endDate),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['dates'],
      })
    },
  })
}

// Delete Book dates
export function useDeleteBookById() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (bookId: string) => deleteBookReadDates(bookId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['dates'],
      })
    },
  })
}
