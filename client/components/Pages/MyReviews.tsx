import { useState } from 'react'
import { useGetAllBookReviews } from '../../hooks/useGetReview'
import '../../styles/myReviews.css'

interface ReadMore {
  par: string
  shouldShowReadMore: boolean
}

interface ExpandedReviews {
  [key: string]: boolean
}

export default function MyReviews() {
  const [expanded, setExpanded] = useState<ExpandedReviews>({})
  const { data: reviews, isPending, isError, error } = useGetAllBookReviews()

  if (isPending) {
    return <p>Retrieving book reviews...</p>
  }

  if (isError) {
    return (
      <p>Sorry, the book revoews could not be retrieved! {String(error)}</p>
    )
  }

  function truncation(text: string, expanded: boolean): ReadMore {
    const lines = 1
    const sentences = text.split('.').filter((sentence) => sentence !== ' ')
    if (sentences.length <= 3 || expanded) {
      return { par: text, shouldShowReadMore: false }
    } else {
      const shortened = sentences.slice(0, lines).join('. ') + '.'
      return { par: shortened, shouldShowReadMore: true }
    }
  }

  function handleReadMore(id: string) {
    setExpanded((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }))
  }
  console.log('Rendering with updated state:', expanded)

  return (
    <>
      <div className="ml-10 mr-10 mt-10 ">
        <h1 className="text-3xl font-bold underline">My Reviews</h1>
        <div className="reviewBox">
          {reviews.map((bookReview) => {
            const isExpanded = expanded[bookReview.book_id] || false
            const { par, shouldShowReadMore } = truncation(
              bookReview.review,
              isExpanded,
            )
            return (
              <div key={bookReview.id} className="reviewCard">
                <h1>{bookReview.title}</h1>
                <p>{par}</p>
                {shouldShowReadMore && (
                  <button
                    className="readMore"
                    onClick={() => handleReadMore(bookReview.book_id)}
                  >
                    Read More...
                  </button>
                )}
                {!shouldShowReadMore && isExpanded && (
                  <button
                    className="readMore"
                    onClick={() => handleReadMore(bookReview.book_id)}
                  >
                    Show Less
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
