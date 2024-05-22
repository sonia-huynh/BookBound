import { useQuery } from '@tanstack/react-query'
import { getSearchBook, getSearchBookById } from '../apis/books.ts'

export function useGetSearchBook(search: string) {
  return useQuery({
    queryKey: ['searchBook', search],
    queryFn: async () => {
      const data = await getSearchBook(search)
      if (!data) {
        throw new Error('Failed to fetch book data')
      }
      return data
    },
  })
}

export function useGetSearchBookById(id: string) {
  return useQuery({
    queryKey: ['searchBookId', id],
    queryFn: async () => {
      const data = await getSearchBookById(id)
      // console.log(data)
      if (!data) {
        throw new Error('Failed to fetch specific book data')
      }
      return data
    },
  })
}
