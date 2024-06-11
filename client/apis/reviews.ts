import request from 'superagent'
import { Reviews } from '../../models/reviews'

const reviewsUrl = '/api/reviews/'

// Get ALL reviews
export async function getAllBookReviews() {
  try {
    const result = await request.get(reviewsUrl)
    return result.body as Reviews[]
  } catch (error) {
    console.error('Error fetching all your book reviews')
    throw new Error('Failed to fetch all your book reviews')
  }
}

// Get review by Id
export async function getReviewById(bookId: string) {
  try {
    const result = await request
      .get(reviewsUrl + `${bookId}`)
      .query({ id: bookId })
    return result.body
  } catch (error) {
    console.error('Error fetching your book review')
    throw new Error('Failed to fetch your book review')
  }
}

//Add a review
export async function addReview(bookId: string, title: string, review: string) {
  try {
    const response = await request
      .post(reviewsUrl + `${bookId}`)
      .query({ title: title })
      .send({ review: review })
    return response.body.review
  } catch (error) {
    console.error('Error adding review')
    throw new Error('Failed to add review to book')
  }
}

//update review
export async function updateReview(bookId: string, review: string) {
  try {
    await request.patch(reviewsUrl + `${bookId}`).send({ review: review })
  } catch (error) {
    console.error('Error updating review')
    throw new Error('Failed to add review to book')
  }
}

//delete review
export async function deleteReview(bookId: string) {
  try {
    await request.delete(reviewsUrl + `${bookId}`)
  } catch (error) {
    console.error('Error deleting review')
    throw new Error('Failed to delete book review')
  }
}
