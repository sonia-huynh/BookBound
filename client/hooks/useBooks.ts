import { useQuery } from '@tanstack/react-query'
import { getBooks, getSearchBook } from '../apis/books.ts'
import { Books } from '../../models/books.ts'

export function useGetSearchBook(search: string) {
  return useQuery({
    queryKey: ['searchBook', search],
    queryFn: async () => {
      const data = await getSearchBook(search)
      return data
    },
  })
}

export function useGetBooks() {
  return useQuery({
    queryKey: ['book'],
    queryFn: async () => {
      const books = await getBooks()
      return books as Books[]
    },
  })
}
