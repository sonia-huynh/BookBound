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
  startDate: string | null,
  endDate: string | null,
) {
  if (startDate && endDate) {
    const bookDates = await db('dates').where({ book_id: bookId }).update({
      start_date: startDate,
      end_date: endDate,
      updated_at: db.fn.now(),
    })
    return bookDates
  } else if (startDate) {
    const bookStartDate = await db('dates')
      .where({ book_id: bookId })
      .select('start_date')
      .update({ start_date: startDate, updated_at: db.fn.now() })
    return bookStartDate
  } else if (endDate) {
    const bookEndDate = await db('dates')
      .where({ book_id: bookId })
      .select('start_date')
      .update({ end_date: endDate, updated_at: db.fn.now() })
    return bookEndDate
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
