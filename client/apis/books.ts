import request from 'superagent'
import { BookDetails, Books } from '../../models/books'

const databaseUrl = '/api/books'
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

// Calls for My Books
export async function addBookToShelf(details: {
  title: string
  author: string
  image: string
  bookId: string
  description: string
}) {
  try {
    await request.post(databaseUrl).send(details)
  } catch (error) {
    console.error('Error posting book')
    throw new Error('Failed to add book to shelf')
  }
}

export async function getBooks() {
  try {
    const res = await request.get(databaseUrl)
    return res.body as Books[]
  } catch (error) {
    console.error('Could not get books from database')
    throw new Error('Failed to get books from database')
  }
}

export async function getBookById(bookId: string) {
  try {
    const res = await request.get(databaseUrl + `/${bookId}`)
    return res.body as Books
  } catch (error) {
    console.error('Could not get book from database')
    throw new Error('Failed to get book from database')
  }
}

// Calls for Reviews
// Get review by Id
export async function getReviewById(bookId: string) {
  try {
    const result = await request
      .get(databaseUrl + `/review/${bookId}`)
      .query({ id: bookId })
    return result.body
  } catch (error) {
    console.error('Error fetching your book review')
    throw new Error('Failed to fetch your book review')
  }
}

//Add a review
export async function addReview(bookId: string, title: string, review: string) {
  try {
    const response = await request
      .post(databaseUrl + `/review/${bookId}`)
      .query({ title: title })
      .send({ review: review })
    return response.body.review
  } catch (error) {
    console.error('Error adding review')
    throw new Error('Failed to add review to book')
  }
}

//update review
export async function updateReview(bookId: string, review: string) {
  try {
    await request
      .patch(databaseUrl + `/review/${bookId}`)
      .send({ review: review })
  } catch (error) {
    console.error('Error updating review')
    throw new Error('Failed to add review to book')
  }
}

export async function deleteReview(bookId: string) {
  try {
    await request.delete(databaseUrl + `/review/${bookId}`)
  } catch (error) {
    console.error('Error deleting review')
    throw new Error('Failed to delete book review')
  }
}
