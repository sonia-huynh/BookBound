import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  addBookRating,
  deleteBookRating,
  getBookRatingById,
} from '../apis/ratings'

//get rating by id
export function useGetBookRatingById(bookId: string) {
  return useQuery({
    queryKey: ['rating', bookId],
    queryFn: async () => {
      const data = await getBookRatingById(bookId)

      if (!data) {
        throw new Error('Failed to fetch book rating')
      }

      return data
    },
  })
}

//add rating by id
export function useAddBookRating() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (ratingDeets: { bookId: string; rating: number }) =>
      addBookRating(ratingDeets.bookId, ratingDeets.rating),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['rating'],
      })
    },
  })
}

//delete rating by id
export function useDeleteBookRating() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteBookRating,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['rating'],
      })
    },
  })
}
