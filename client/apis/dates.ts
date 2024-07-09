import request from 'superagent'

const datesUrl = '/api/dates/'

// Get dates by Id
export async function getBookReadDates(bookId: string) {
  try {
    const readDates = await request.get(datesUrl + `${bookId}`)

    return readDates.body
  } catch (error) {
    console.error('Error fetching your book dates')
    throw new Error('Failed to fetch your book dates')
  }
}

//Add book dates
export async function addBookReadDates(
  bookId: string,
  startDate: string | null,
  endDate: string | null,
) {
  try {
    const response = await request
      .post(datesUrl + `${bookId}`)
      .send({ startDate: startDate, endDate: endDate })
    console.log(response.body)
    return response.body
  } catch (error) {
    console.error('Error adding book dates')
    throw new Error('Failed to add  book dates')
  }
}

//Update book dates
export async function updateBookDates(
  bookId: string,
  startDate: string | null,
  endDate: string | null,
) {
  try {
    const response = await request
      .patch(datesUrl + `${bookId}`)
      .send({ startDate: startDate, endDate: endDate })
    return response.body
  } catch (error) {
    console.error('Error updating book dates')
    throw new Error('Failed to update book dates')
  }
}

//Delete book dates
export async function deleteBookReadDates(bookId: string) {
  try {
    await request.delete(datesUrl + `${bookId}`)
  } catch (error) {
    console.error('Error deleting book dates')
    throw new Error('Failed to deleting book dates')
  }
}
