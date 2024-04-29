import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addBookToShelf } from '../apis/books.ts'

export function useAddBookToShelf() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (details: {
      title: string
      author: string
      image: string
      bookId: number
    }) => addBookToShelf(details),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['bookDetails'],
      })
    },
  })
}
