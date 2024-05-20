import db from './connection.ts'

// get all books from book table
export async function getBooks() {
  const books = await db('books').select()
  return books
}

// get individual book by book title
export async function getBookByTitle(title: string) {
  const book = await db('books').select().where({ title }).first()
  return book
}

// update book review
export async function updateReview(bookId: string, update: string) {
  const review = await db('books')
    .where({ book_id: bookId })
    .update({ review: update })
  return review
}

// delete book review
export async function deleteReview(title: string) {
  const bookReview = await db('books')
    .where({ title })
    .select('review')
    .update({ review: '' })
  return bookReview
}

// add searched up book to book table
export async function addBook(details: {
  title: string
  author: string
  image: string
  bookId: number
  review: string
}) {
  const books = await db('books').insert({
    title: details.title,
    author: details.author,
    image: details.image,
    book_id: details.bookId,
    review: details.review,
  })
  return books
}
