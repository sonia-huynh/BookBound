import { useQuery } from '@tanstack/react-query'
import { getSearchBook } from '../apis/books.ts'

export function useGetSearchBook(search: string) {
  return useQuery({
    queryKey: ['searchBook', search],
    queryFn: async () => {
      const data = await getSearchBook(search)
      return data
    },
  })
}
