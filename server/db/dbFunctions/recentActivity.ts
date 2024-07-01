import { Books, Ratings, Reviews } from '../../../models/books.ts'
import db from '../connection.ts'

// get all recent activity
export async function getRecentActivity() {
  const recentActivityBooks: Books[] = await db('books')
    .select(
      'books.title',
      'books.author',
      'books.image',
      'books.description',
      'books.created_at',
      'books.updated_at',
    )
    .orderBy([
      { column: 'books.updated_at', order: 'desc' },
      { column: 'books.created_at', order: 'desc' },
    ])
    .limit(10)

  const recentActivityReviews: Reviews[] = await db('reviews')
    .join('books', 'reviews.book_id', 'books.book_id')
    .select(
      'books.title',
      'books.author',
      'books.image',
      'reviews.review',
      'reviews.created_at',
      'reviews.updated_at',
    )
    .orderBy([
      { column: 'reviews.updated_at', order: 'desc' },
      { column: 'reviews.created_at', order: 'desc' },
    ])
    .limit(10)
  const recentActivityRatings: Ratings[] = await db('ratings')
    .join('books', 'ratings.book_id', 'books.book_id')
    .select(
      'books.title',
      'books.author',
      'books.image',
      'ratings.rating',
      'ratings.created_at',
      'ratings.updated_at',
    )
    .orderBy([
      { column: 'ratings.updated_at', order: 'desc' },
      { column: 'ratings.created_at', order: 'desc' },
    ])
    .limit(10)

  const allRecentActivities = [
    ...recentActivityBooks,
    ...recentActivityReviews,
    ...recentActivityRatings,
  ]

  allRecentActivities.sort((a, b) => {
    const updatedAtA = new Date(a.updated_at).getTime()
    const updatedAtB = new Date(b.updated_at).getTime()

    if (updatedAtB !== updatedAtA) {
      return updatedAtB - updatedAtA
    }

    const createdAtA = new Date(a.created_at).getTime()
    const createdAtB = new Date(b.created_at).getTime()

    return createdAtB - createdAtA
  })
  return allRecentActivities
}
