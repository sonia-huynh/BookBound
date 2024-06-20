import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  addReview,
  deleteReview,
  getAllBookReviews,
  getReviewById,
  updateReview,
} from '../apis/reviews.ts'

// Get ALL reviews
export function useGetAllBookReviews() {
  return useQuery({
    queryKey: ['review'],
    queryFn: async () => {
      const data = await getAllBookReviews()
      // console.log(data)
      if (!data) {
        throw new Error('Failed to fetch all the book reviews')
      }
      return data
    },
  })
}

// Get review by ID
export function useGetReviewById(bookId: string) {
  return useQuery({
    queryKey: ['review', bookId],
    queryFn: async () => {
      const data = await getReviewById(bookId)
      console.log(data)
      if (!data) {
        throw new Error('Failed to fetch book review')
      } else if (data === undefined) {
        console.log('no reviews here')
        return []
      }
      return data
    },
  })
}

// Add review
export function useAddReview() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (reviewDetails: { bookId: string; review: string }) =>
      addReview(reviewDetails.bookId, reviewDetails.review),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['review'],
      })
    },
  })
}

// Delete Review
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

// Update review
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
