import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addBookToShelf } from '../apis/books.ts'

// Add a searched book to myBooks
export function useAddBookToShelf() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (details: {
      title: string
      author: string
      image: string
      bookId: number
      review: string
    }) => addBookToShelf(details),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['bookDetails'],
      })
    },
  })
}
