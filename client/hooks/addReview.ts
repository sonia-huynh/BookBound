import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addReview } from '../apis/books.ts'

// Add a searched book to myBooks
export function useAddReview() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (reviewDetails: {
      bookId: string
      title: string
      review: string
    }) =>
      addReview(
        reviewDetails.bookId,
        reviewDetails.title,
        reviewDetails.review,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['addBookReview'],
      })
    },
  })
}
