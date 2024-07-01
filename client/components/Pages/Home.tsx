import { Activity, Books, Ratings, Reviews } from '../../../models/books'
import { useGetRecentActivityHome } from '../../hooks/recentActivity'

export default function Home() {
  const { data, isPending, isError, error } = useGetRecentActivityHome()

  function isBook(activity: Activity): activity is Books {
    return activity.type === 'book'
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
      <div className="box">
        <div className="bookshelfContainer">
          <div className="ml-10 mt-10 "></div>
          <div>
            {data.map((activity, i) => (
              <div key={i} className="homeCard card ">
                <img
                  src={activity.image}
                  alt={`${activity.title} book cover`}
                  className="book-cover"
                />
                <div>
                  <h1> {activity.title}</h1>
                  <p>{activity.author}</p>
                  {isBook(activity) && (
                    <div className="mt-4">
                      <strong>
                        You have added the book {activity.title} to your library
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
                      <p className="mt-2">{activity.review}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
