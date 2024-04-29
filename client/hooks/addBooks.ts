import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { addBookToShelf } from '../apis/books.ts'

export function useAddBookToShelf() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (details: { title: string; author: string }) =>
      addBookToShelf(details),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['bookDetails'],
      })
    },
  })
}
