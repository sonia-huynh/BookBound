import { useGetAllBookReviews } from '../../hooks/useGetReview'
import { useNavigate } from 'react-router-dom'

export default function MyReviews() {
  const navigate = useNavigate()
  const { data: reviews, isPending, isError, error } = useGetAllBookReviews()

  if (isPending) {
    return <p>Retrieving book reviews...</p>
  }

  if (isError) {
    return (
      <p>Sorry, the book revoews could not be retrieved! {String(error)}</p>
    )
  }

  function truncation(text: string) {
    const words = 45
    const lines = text.split(' ').filter((sentence) => sentence !== ' ')
    if (lines.length <= 44) {
      return text
    } else {
      const shortened = lines.slice(0, words).join(' ') + '...'
      return shortened
    }
  }

  return (
    <>
      <div className="ml-10 mr-10 mt-10 ">
        <h1 className="text-3xl font-bold underline">My Reviews</h1>
        <div className="reviewBox">
          {reviews.map((bookReview, i) => (
            <div key={bookReview.id || i} className="reviewBookCover card">
              <img
                src={bookReview.image}
                alt={bookReview.title}
                className="book-cover"
              />

              <div
                role="button"
                tabIndex={0}
                key={bookReview.book_id + i}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    navigate(
                      `/my-books/${bookReview.book_id}/${bookReview.title}`,
                    )
                  }
                }}
                className="reviewCard"
                onClick={() => {
                  navigate(
                    `/my-books/${bookReview.book_id}/${bookReview.title}`,
                  )
                }}
              >
                <h1
                  className={
                    bookReview.title.length > 25 ? 'text-xl' : 'text-2xl'
                  }
                >
                  <strong>{bookReview.title}</strong>
                </h1>
                <p className="text-truncate mt-4">
                  {truncation(bookReview.review)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
