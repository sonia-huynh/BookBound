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

export async function addBook(book: Books) {
  const books = await db('books').insert({ book })
  return books
}
