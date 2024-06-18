import request from 'superagent'

const ratingsUrl = '/api/ratings/'

// Get rating by Id
export async function getBookRatingById(bookId: string) {
  try {
    const rating = await request
      .get(ratingsUrl + `${bookId}`)
      .query({ id: bookId })
    return rating.body
  } catch (error) {
    console.error('Error fetching your book rating')
    throw new Error('Failed to fetch your book rating')
  }
}

//Add a rating
export async function addBookRating(bookId: string, rating: number) {
  try {
    const response = await request
      .put(ratingsUrl + `${bookId}`)
      .send({ rating: rating })
    return response.body.review
  } catch (error) {
    console.error('Error adding rating')
    throw new Error('Failed to add rating to book')
  }
}

//Delete a rating
export async function deleteBookRating(bookId: string) {
  try {
    await request.delete(ratingsUrl + `${bookId}`)
  } catch (error) {
    console.error('Error adding rating')
    throw new Error('Failed to add rating to book')
  }
}
