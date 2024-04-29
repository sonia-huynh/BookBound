import db from './connection.ts'
import { Books } from '../../models/books.ts'

export async function getBookByTitle(title: string) {
  const book = await db('books').select().where({ title }).first()
  return book
}

export async function updateReview(title: string, update: string) {
  const review = await db('books')
    .select('review')
    .where({ title })
    .update(update)
  return review
}

export async function deleteReview(title: string) {
  const bookReview = await db('books')
    .where({ title })
    .select('review')
    .update({ review: '' })
  return bookReview
}

export async function addBook(details: {
  title: string
  author: string
  image: string
  bookId: number
}) {
  const books = await db('books').insert({
    title: details.title,
    author: details.author,
    image: details.image,
    book_id: details.bookId,
  })
  return books
}
