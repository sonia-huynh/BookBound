import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  addBookToShelf,
  deleteBookById,
  getBookById,
  getBooks,
  updateBookEndDate,
  updateBookStartdate,
} from '../apis/books.ts'
import { Books } from '../../models/books.ts'

// Add a searched book to myBooks
export function useAddBookToShelf() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (details: {
      title: string
      author: string
      image: string
      bookId: string
      description: string
    }) => addBookToShelf(details),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['books'],
      })
    },
  })
}

// Get ALL Books
export function useGetBooks() {
  return useQuery({
    queryKey: ['books'],
    queryFn: async () => {
      const books = await getBooks()
      return books as Books[]
    },
  })
}

// Get Book by Id
export function useGetBookById(bookId: string) {
  return useQuery({
    queryKey: ['bookId', bookId],
    queryFn: async () => {
      const books = await getBookById(bookId)
      // console.log(`got book ${bookId}`)
      if (!books) {
        throw new Error('Failed to fetch book review')
      }
      return books as Books
    },
  })
}

// Delete Book by Id
export function useDeleteBookById() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (bookId: string) => deleteBookById(bookId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['books'],
      })
    },
  })
}

// Update read Start date by ID
export function useUpdateBookStartDate() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (bookDeets: { bookId: string; startDate: string }) =>
      updateBookStartdate(bookDeets.bookId, bookDeets.startDate),
    onSuccess: () => {
      console.log('invalidating queries for start date has occured!!!')
      queryClient.invalidateQueries({
        queryKey: ['books'],
      })
    },
  })
}

// Update read END date by ID
export function useUpdateBookEndDate() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (bookDeets: { bookId: string; endDate: string }) =>
      updateBookEndDate(bookDeets.bookId, bookDeets.endDate),
    onSuccess: () => {
      console.log('invalidating queries for end date has occured!!!')
      queryClient.invalidateQueries({
        queryKey: ['books'],
      })
    },
  })
}
