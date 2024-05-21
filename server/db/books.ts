import db from './connection.ts'

// get all books from book table
export async function getBooks() {
  const books = await db('books').select()
  return books
}

// add review by id
export async function addReview(bookId: string, title: string, review: string) {
  const bookReview = await db('reviews').insert({
    book_id: bookId,
    title: title,
    review: review,
  })
  return bookReview
}

// get review by id
export async function getReviewById(bookId: string) {
  const bookReview = await db('reviews')
    .join('books', 'reviews.book_id', 'books.book_id')
    .select()
    .where('reviews.book_id', bookId)
  return bookReview
}

// update book review
export async function updateReview(bookId: string, update: string) {
  const review = await db('reviews')
    .where({ book_id: bookId })
    .update({ review: update })
  return review
}

// delete book review
export async function deleteReview(bookId: string) {
  const review = await db('reviews').where({ book_id: bookId }).delete()
  return review
}

// delete book
export async function deleteBookById(bookId: string) {
  const bookReview = await db('books').where({ book_id: bookId }).delete()
  return bookReview
}

// add searched up book to book table
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
