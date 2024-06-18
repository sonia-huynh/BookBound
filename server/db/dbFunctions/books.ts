import db from '../connection.ts'
//SEARCHED BOOKS:
// add searched up book to book table
export async function addBook(details: {
  title: string
  author: string
  image: string
  bookId: number
  description: string
}) {
  const books = await db('books').insert({
    title: details.title,
    author: details.author,
    image: details.image,
    book_id: details.bookId,
    description: details.description,
  })
  return books
}

//MY BOOKS:
// get all books from book table
export async function getBooks() {
  const books = await db('books').select()
  return books
}

// get single book by id
export async function getBookById(bookId: string) {
  const book = await db('books').where({ book_id: bookId }).select().first()
  return book
}

// delete book
export async function deleteBookById(bookId: string) {
  const bookReview = await db('books').where({ book_id: bookId }).delete()
  return bookReview
}
