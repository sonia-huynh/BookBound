import { BookDates, Books, Ratings, Reviews } from '../../../models/books.ts'
import db from '../connection.ts'

// Get all recent detail activity
export async function getRecentDetailActivity() {
  const recentActivityReviews: Reviews[] = (
    await db('reviews')
      .join('books', 'reviews.book_id', 'books.book_id')
      .select(
        'books.title',
        'books.book_id',
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
  ).map((review) => ({ ...review, type: 'review' }))

  const recentActivityRatings: Ratings[] = (
    await db('ratings')
      .join('books', 'ratings.book_id', 'books.book_id')
      .select(
        'books.book_id',
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
  ).map((rating) => ({ ...rating, type: 'rating' }))

  const recentActivityReadDates: BookDates[] = (
    await db('dates')
      .join('books', 'dates.book_id', 'books.book_id')
      .select(
        'books.title',
        'books.book_id',
        'books.author',
        'books.image',
        'books.description',
        'dates.start_date',
        'dates.end_date',
        'dates.created_at',
        'dates.updated_at',
      )
      .orderBy([
        { column: 'dates.created_at', order: 'desc' },
        { column: 'dates.updated_at', order: 'desc' },
      ])
      .limit(10)
  ).map((book) => ({ ...book, type: 'bookDates' }))

  const allRecentDetailActivities = [
    ...recentActivityReviews,
    ...recentActivityRatings,
    ...recentActivityReadDates,
  ]

  return allRecentDetailActivities
}

// Get all recent book activity
export async function getRecentBookActivity() {
  const recentActivityBooks: Books[] = (
    await db('books')
      .select(
        'books.title',
        'books.book_id',
        'books.author',
        'books.image',
        'books.description',
        'books.created_at',
        'books.updated_at',
      )
      .orderBy([
        { column: 'books.created_at', order: 'desc' },
        { column: 'books.updated_at', order: 'desc' },
      ])
      .limit(10)
  ).map((book) => ({ ...book, type: 'book' }))

  const allRecentBookActivity = [...recentActivityBooks]

  return allRecentBookActivity
}

// Combine and sort all activities
export async function getAllRecentActivity() {
  const recentDetailActivities = await getRecentDetailActivity()
  const recentBookActivities = await getRecentBookActivity()

  const allRecentActivities = [
    ...recentDetailActivities,
    ...recentBookActivities,
  ]

  console.log('Combined Activities Before Sorting:', allRecentActivities)

  allRecentActivities.sort((a, b) => {
    const mostRecentA = Math.max(
      new Date(a.updated_at).getTime(),
      new Date(a.created_at).getTime(),
    )

    const mostRecentB = Math.max(
      new Date(b.updated_at).getTime(),
      new Date(b.created_at).getTime(),
    )

    return mostRecentB - mostRecentA
  })

  console.log('Combined Activities After Sorting:', allRecentActivities)

  return allRecentActivities
}
