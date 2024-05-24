import express from 'express'
import db from './connection.ts'

const router = express.Router()

// GET rating by ID
export async function getRatingById(bookId: string) {
  const book = await db('ratings')
    .where({ book_id: bookId })
    .select('ratings.rating')
    .first()
  return book
}

// ADD rating by ID
export async function addRating(bookId: string, title: string, rating: number) {
  const trx = await db.transaction()

  try {
    const bookRating = await trx('ratings').insert({
      book_id: bookId,
      title: title,
      rating: rating,
    })

    await trx('books').where({ book_id: bookId }).update({ rating: true })

    await trx.commit()
    return bookRating
  } catch (error) {
    trx.rollback()
    throw error
  }
}

// UPDATE rating by ID
export async function updateRating(bookId: string, rating: number) {
  const bookRating = await db('ratings')
    .where({ book_id: bookId })
    .update({ rating: rating })

  return bookRating
}

//DELETE rating by ID
export async function deleteRating(bookId: string) {
  const trx = await db.transaction()

  try {
    const bookRating = await trx('ratings').where({ book_id: bookId }).delete()

    await trx('books').where({ book_id: bookId }).update({ rating: false })

    await trx.commit()
    return bookRating
  } catch (error) {
    trx.rollback()
    throw error
  }
}
export default router
