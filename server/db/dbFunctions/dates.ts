import db from '../connection.ts'

// ADD read dates
export async function addReadDates(
  bookId: string,
  startDate: string | null,
  endDate: string | null,
) {
  const bookDates = await db('dates').insert({
    book_id: bookId,
    start_date: startDate,
    end_date: endDate,
  })

  return bookDates
}

// UPDATE read dates
export async function updateReadDates(
  bookId: string,
  startDate: string | null | undefined,
  endDate: string | null | undefined,
) {
  if (startDate && endDate) {
    const bookDates = await db('dates').where({ book_id: bookId }).update({
      start_date: startDate,
      end_date: endDate,
      updated_at: db.fn.now(),
    })
    return bookDates
  } else if (startDate === '') {
    const emptyStart = await db('dates').where({ book_id: bookId }).update({
      start_date: null,
      updated_at: db.fn.now(),
    })
    return emptyStart
  } else if (endDate === '') {
    const emptyEnd = await db('dates').where({ book_id: bookId }).update({
      end_date: null,
      updated_at: db.fn.now(),
    })
    return emptyEnd
  }
}

// Get read dates
export async function getReadDates(bookId: string) {
  return await db('dates')
    .where({ book_id: bookId })
    .select('start_date', 'end_date')
}

// DELETE read dates
export async function deleteReadDates(bookId: string) {
  await db('dates').where({ book_id: bookId }).delete()
}
