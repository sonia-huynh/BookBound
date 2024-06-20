import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  addBookToShelf,
  deleteBookById,
  getBookById,
  getBooks,
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
      console.log('add book mutation successful, invalidating')
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
    queryKey: ['bookId'],
    queryFn: async () => {
      console.log('get books by id successful')
      const books = await getBookById(bookId)
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
      console.log('invalidating queries has occured!!!')
      queryClient.invalidateQueries({
        queryKey: ['books'],
      })
    },
  })
}
