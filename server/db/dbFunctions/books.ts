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
  const book = await db('books').where({ book_id: bookId }).delete()
  return book
}

// update read START date
export async function updateReadStartDate(bookId: string, startDate: string) {
  const bookStartDate = await db('books')
    .where({ book_id: bookId })
    .select('start_date')
    .update({ start_date: startDate, updated_at: db.fn.now() })
  return bookStartDate
}

// update read END date
export async function updateReadEndDate(bookId: string, endDate: string) {
  const bookStartDate = await db('books')
    .where({ book_id: bookId })
    .select('start_date')
    .update({ end_date: endDate, updated_at: db.fn.now() })
  return bookStartDate
}

//get recent activity
export async function getRecentActivity() {
  throw new Error('Function not implemented.')
}
