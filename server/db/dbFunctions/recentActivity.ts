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
      'books.recent_activity',
    )
    .orderBy('books.recent_activity', 'desc')
    .limit(10) // Fetch most recent activities from books, adjust limit as needed

  const recentActivityReviews: Reviews[] = await db('reviews')
    .join('books', 'reviews.book_id', 'books.book_id')
    .select(
      'books.title',
      'books.author',
      'books.image',
      'reviews.review',
      'reviews.recent_activity',
    )
    .orderBy('reviews.recent_activity', 'desc')
    .limit(10)

  const recentActivityRatings: Ratings[] = await db('ratings')
    .join('books', 'ratings.book_id', 'books.book_id')
    .select(
      'books.title',
      'books.author',
      'books.image',
      'ratings.rating',
      'ratings.recent_activity',
    )
    .orderBy('ratings.recent_activity', 'desc')
    .limit(10)

  const allRecentActivities = [
    ...recentActivityBooks,
    ...recentActivityReviews,
    ...recentActivityRatings,
  ]

  allRecentActivities
    .sort(
      (a, b) =>
        new Date(b.recent_activity).getTime() -
        new Date(a.recent_activity).getTime(),
    )
    .slice(0, 10)
  return allRecentActivities
}
