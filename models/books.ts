interface BaseActivity {
  id: number
  username: string
  created_at: Date
  updated_at: Date
  book_id: string
  title: string
  author: string
  image: string
  description?: string
}

export interface Books extends BaseActivity {
  // start_date: string | null
  // end_date: string | null
  review_exist: boolean
  rating_exist: boolean
  type: 'book'
}

export interface BookDates extends BaseActivity {
  start_date: string | null
  end_date: string | null
  type: 'bookDates'
}
export interface Reviews extends BaseActivity {
  review: string
  created_at: Date
  updated_at: Date
  type: 'review'
}

export interface Ratings extends BaseActivity {
  rating: number
  created_at: Date
  updated_at: Date
  type: 'rating'
}

export type Activity = Books | Ratings | Reviews | BookDates
export interface BookDetails {
  title: string
  author: string[]
  description?: string
  rating?: number
  image: string
  bookId: string
}
