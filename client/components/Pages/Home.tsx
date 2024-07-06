import { useNavigate } from 'react-router-dom'
import { Activity, Books, Ratings, Reviews } from '../../../models/books'
import { useGetRecentActivityHome } from '../../hooks/recentActivity'

export default function Home() {
  const navigate = useNavigate()
  const { data, isPending, isError, error } = useGetRecentActivityHome()

  function isBook(activity: Activity): activity is Books {
    return activity.type === 'book'
  }

  function isBookDates(activity: Activity): activity is Books {
    return activity.type === 'bookDates'
  }

  function isRating(activity: Activity): activity is Ratings {
    return activity.type === 'rating'
  }

  function isReview(activity: Activity): activity is Reviews {
    return activity.type === 'review'
  }

  if (isPending) {
    return <p>Retrieving your recent acitivity...</p>
  }

  if (isError) {
    return (
      <p>
        Sorry, your recent acitivity could not be retrieved! {String(error)}
      </p>
    )
  }
  return (
    <>
      <h1 className="mb-8 mt-4 text-center text-3xl font-bold underline">
        Your recent activity:
      </h1>
      <div className="center-box">
        <div>
          {data.map((activity, i) => (
            <div
              role="button"
              tabIndex={0}
              key={activity.book_id + i}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  navigate(`/my-books/${activity.book_id}/${activity.title}`)
                }
              }}
              className="homeCard card"
              onClick={() =>
                navigate(`/my-books/${activity.book_id}/${activity.title}`)
              }
            >
              <img
                src={activity.image}
                alt={`${activity.title} book cover`}
                className="book-cover"
              />
              <div>
                <h1> {activity.title}</h1>
                <p>{activity.author}</p>
                <div>
                  {isBookDates(activity) && (
                    <div className="mt-4">
                      <strong>
                        You have udpated the dates read for {activity.title}.
                      </strong>
                      <p>
                        Start Date: {activity.start_date} <br /> End Date:{' '}
                        {activity.end_date}
                      </p>
                    </div>
                  )}

                  {isBook(activity) && (
                    <div className="mt-4">
                      <strong>
                        You have added the book {activity.title} by{' '}
                        {activity.author} to your library
                      </strong>
                    </div>
                  )}
                  {isRating(activity) && (
                    <div className="mt-4">
                      <strong>
                        You have updated your rating for {activity.title} to{' '}
                        {activity.rating} stars
                      </strong>
                    </div>
                  )}

                  {isReview(activity) && (
                    <div className="mt-4">
                      <strong>
                        You have updated your review for {activity.title}:
                      </strong>
                      <p className="text-truncate mt-2">{activity.review}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
