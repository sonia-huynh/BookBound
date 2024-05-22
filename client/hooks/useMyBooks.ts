import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addBookToShelf, getBookById, getBooks } from '../apis/books.ts'
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
        queryKey: ['addBook'],
      })
    },
  })
}

export function useGetBooks() {
  return useQuery({
    queryKey: ['book'],
    queryFn: async () => {
      const books = await getBooks()
      return books as Books[]
    },
  })
}

export function useGetBookById(bookId: string) {
  return useQuery({
    queryKey: ['bookId'],
    queryFn: async () => {
      const books = await getBookById(bookId)
      return books as Books
    },
  })
}
