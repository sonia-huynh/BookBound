import { useQuery } from '@tanstack/react-query'
import { getReviewById } from '../apis/books'

export function useGetReviewById(bookId: string) {
  return useQuery({
    queryKey: ['bookReviewId', bookId],
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
