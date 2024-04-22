import db from './connection.ts'
import { Fruit, FruitData } from '../../models/fruit.ts'

export async function getBookByTitle(title: string) {
  const book = await db('books').select().where({ title }).first()
  return book
}

export async function addReview(title: string, review: string) {
  const bookReview = await db('books')
    .where({ title })
    .select('review')
    .update({ review: review })
  return bookReview
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
