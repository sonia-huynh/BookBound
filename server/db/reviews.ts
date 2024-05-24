import db from './connection.ts'

// add review by id AND update the books table whether review exists using transaction in a single atomic unit
export async function addReview(bookId: string, title: string, review: string) {
  const trx = await db.transaction()

  try {
    const bookReview = await trx('reviews').insert({
      book_id: bookId,
      title: title,
      review: review,
    })

    await trx('books').where({ book_id: bookId }).update({ review: true })

    await trx.commit()
    return bookReview
  } catch (error) {
    trx.rollback()
    throw error
  }
}

// get review by id
export async function getReviewById(bookId: string) {
  const bookReview = await db('reviews')
    .select()
    .where('reviews.book_id', bookId)
    .first()
  return bookReview
}

// update review
export async function updateReview(bookId: string, update: string) {
  const review = await db('reviews')
    .where({ book_id: bookId })
    .update({ review: update })
  return review
}

// delete review and update books table that review is false
export async function deleteReview(bookId: string) {
  const trx = await db.transaction()

  try {
    const review = await trx('reviews').where({ book_id: bookId }).delete()
    await trx('books').where({ book_id: bookId }).update({ review: false })

    trx.commit()
    return review
  } catch (error) {
    trx.rollback()
    throw error
  }
}
