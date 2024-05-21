import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateReview } from '../apis/books'

// Add a searched book to myBooks
export function useUpdateReview() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (update: { bookId: string; review: string }) =>
      updateReview(update.bookId, update.review),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['updateBookReview'],
      })
    },
  })
}
