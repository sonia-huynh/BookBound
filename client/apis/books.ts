import request from 'superagent'
import { BookDetails, Books } from '../../models/books'

const booksUrl = '/api/books/'
const externalApiUrl = '/api/external/search'

// EXTERNAL API CALLS
export async function getSearchBook(search: string): Promise<BookDetails[]> {
  if (search.length < 3) {
    return []
  }

  try {
    const res = await request.get(externalApiUrl).query({ q: search })
    console.log(res.body as BookDetails[])
    return res.body as BookDetails[]
  } catch (error) {
    console.error('Error fetching search results')
    throw new Error('Failed to fetch search results')
  }
}

export async function getSearchBookById(id: string): Promise<BookDetails[]> {
  if (id.length < 3) {
    return []
  }

  try {
    const res = await request.get(`/api/external/search/${id}`)
    return res.body as BookDetails[]
  } catch (error) {
    console.error('Error fetching specific book results')
    throw new Error('Failed to fetch specific book')
  }
}

// DATABASE API CALLS

// Calls for Add Books
export async function addBookToShelf(details: {
  title: string
  author: string
  image: string
  bookId: string
  description: string
}) {
  try {
    await request.post(booksUrl).send(details)
  } catch (error) {
    console.error('Error posting book')
    throw new Error('Failed to add book to shelf')
  }
}

// Calls for get all Books
export async function getBooks() {
  try {
    const res = await request.get(booksUrl)
    return res.body as Books[]
  } catch (error) {
    console.error('Could not get books from database')
    throw new Error('Failed to get books from database')
  }
}

// Calls for get Book by Id
export async function getBookById(bookId: string) {
  try {
    const res = await request.get(booksUrl + `${bookId}`)
    return res.body as Books
  } catch (error) {
    console.error('Could not get book from database')
    throw new Error('Failed to get book from database')
  }
}

// Update book read START date by id
export async function updateBookStartdate(
  bookId: string,
  startDate: string | null,
) {
  try {
    const res = await request
      .patch(booksUrl + `${bookId}`)
      .send({ startDate: startDate })
    return res.body
  } catch (error) {
    console.error('Could not update book start date')
    throw new Error('Failed to update book start date')
  }
}

// Update book read End date by id
export async function updateBookEndDate(
  bookId: string,
  endDate: string | null,
) {
  try {
    const res = await request
      .patch(booksUrl + `${bookId}`)
      .send({ endDate: endDate })
    return res.body
  } catch (error) {
    console.error('Could not update book end date')
    throw new Error('Failed to update book end date')
  }
}

// Calls for delete Book by id
export async function deleteBookById(bookId: string) {
  try {
    const res = await request.delete(booksUrl + `${bookId}`)
    return res
  } catch (error) {
    console.error('Could not delete book from database')
    throw new Error('Failed to delete book from database')
  }
}
