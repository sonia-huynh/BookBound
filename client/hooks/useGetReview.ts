import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  addReview,
  deleteReview,
  getReviewById,
  updateReview,
} from '../apis/reviews.ts'

export function useGetReviewById(bookId: string) {
  return useQuery({
    queryKey: ['review', bookId],
    queryFn: async () => {
      const data = await getReviewById(bookId)
      console.log(data)
      if (!data) {
        throw new Error('Failed to fetch book review')
      }
      return data
    },
  })
}

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
        queryKey: ['review'],
      })
    },
  })
}

export function useDeleteReview() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['review'],
      })
    },
  })
}

export function useUpdateReview() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (update: { bookId: string; review: string }) =>
      updateReview(update.bookId, update.review),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['review'],
      })
    },
  })
}
