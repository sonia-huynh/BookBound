import { useQuery } from '@tanstack/react-query'
import {
  getBookById,
  getBooks,
  getSearchBook,
  getSearchBookById,
} from '../apis/books.ts'
import { Books } from '../../models/books.ts'

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

export function useGetBooks() {
  return useQuery({
    queryKey: ['book'],
    queryFn: async () => {
      const books = await getBooks()
      return books as Books[]
    },
  })
}

export function useGetBookById(bookId: string) {
  return useQuery({
    queryKey: ['book'],
    queryFn: async () => {
      const books = await getBookById(bookId)
      return books as Books
    },
  })
}
