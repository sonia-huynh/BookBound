import { useParams } from 'react-router-dom'
import { useGetBookById } from '../../hooks/useMyBooks'
import { useGetReviewById } from '../../hooks/useGetReview'
import { useEffect, useState } from 'react'
import { useDeleteReview } from '../../hooks/useGetReview'
import { StarRating } from './StarRating'
import { DatesRead } from './DatesRead'
import { useGetBookReadDates } from '../../hooks/dates'
import EditReview from './EditReview'
import NewReview from './NewReview'

interface CleanedTextResult {
  cleaned: string
  shouldShowReadMore: boolean
}

export default function MyBookDetails() {
  // const [searchParams] = useSearchParams()
  const { id } = useParams()
  const bookIdString = id as string
  const [input, setInput] = useState('')
  const [changeReview, setChangeReview] = useState(false)
  const [oldReview, setOldReview] = useState('')
  const [readMore, setReadMore] = useState(false)
  const [checkDeletePopup, setCheckDeletePopup] = useState(false)

  // Custom hooks:

  const deleteReview = useDeleteReview()

  const { data: datesData } = useGetBookReadDates(bookIdString)

  const {
    data: myBooksData,
    isPending,
    isError,
    error,
    refetch,
  } = useGetBookById(bookIdString)

  const { data: reviewData } = useGetReviewById(bookIdString)

  useEffect(() => {
    refetch()
  }, [refetch, myBooksData, changeReview, input])

  useEffect(() => {
    refetch()
    if (reviewData) {
      setOldReview(reviewData)
    }
  }, [refetch, reviewData, setOldReview])

  if (isPending) {
    return <p className="text-center">Retrieving book data...</p>
  }

  if (!reviewData || reviewData === undefined) {
    return <p>Loading review data right now...</p>
  }

  if (isError) {
    return (
      <p>Sorry, the book details could not be retrieved! {String(error)}</p>
    )
  }

  const cleanAndTruncate = (
    text: string,
    readMore: boolean,
  ): CleanedTextResult => {
    const cleaned = text
      .replace(/<[^>]+>/g, '')
      .replace(/[*_\-(){}[\]]+/g, '')
      .replace(/\s+/g, ' ')
      .trim()

    const sentences = cleaned.split('.').filter((sentence) => sentence !== ' ')
    const numSentences = 7

    if (sentences.length <= numSentences) {
      return { cleaned, shouldShowReadMore: false }
    } else if (readMore) {
      return { cleaned, shouldShowReadMore: false }
    } else {
      const shortenedText = sentences.slice(0, numSentences).join('. ')
      return { cleaned: shortenedText + '. ', shouldShowReadMore: true }
    }
  }

  const { cleaned: cleanText, shouldShowReadMore } = cleanAndTruncate(
    String(myBooksData?.description || ''),
    readMore,
  )

  function handleDelete() {
    const bookId = bookIdString

    setChangeReview(false)
    setInput('')
    deleteReview.mutate(bookId)
  }

  function checkDelete() {
    setCheckDeletePopup(true)
    setTimeout(() => setCheckDeletePopup(false), 5000)
  }
  console.log(myBooksData.review_exist)
  return (
    <>
      <div className="center-box">
        <div className="book-card card">
          {myBooksData && (
            <>
              <div className="my-book-detail">
                <div className="my-book-cover flex justify-center">
                  <img
                    src={myBooksData.image}
                    alt={`cover of book for ${myBooksData.title}`}
                    className="book-cover-big"
                  />
                </div>
                <div className="ml-6">
                  <h1 className="my-book-title mb-2 text-4xl">
                    <strong>{myBooksData.title}</strong>
                  </h1>
                  <p className="my-book-author mb-4 text-xl">
                    by {myBooksData.author}
                  </p>
                  <p className="mb-4">
                    {cleanText}
                    {shouldShowReadMore && (
                      <button
                        onClick={() => setReadMore(true)}
                        className="my-book-details-read-more"
                      >
                        {' '}
                        --- Read more
                      </button>
                    )}
                    {readMore && (
                      <button
                        onClick={() => setReadMore(false)}
                        className="my-book-details-read-more"
                      >
                        {' --- See Less'}
                      </button>
                    )}
                  </p>
                </div>
              </div>
              <div>
                <h1 className="mt-4">Your Rating:</h1>
                <StarRating bookId={''} />
              </div>
              <div>
                <h1 className="mb-2 mt-4">Dates Read:</h1>
                <DatesRead
                  startRead={datesData?.start_date}
                  endRead={datesData?.end_date}
                />
              </div>

              {!myBooksData.review_exist ? (
                <NewReview />
              ) : myBooksData.review_exist && changeReview === true ? (
                <EditReview
                  prevReview={reviewData}
                  setChangeReview={setChangeReview}
                  oldReview={oldReview}
                />
              ) : (
                <div>
                  <h1 className="mt-8">Your Book Review:</h1>
                  <div className="book-review-display mt-2">
                    {reviewData.length > 0 ? (
                      <p>{reviewData}</p>
                    ) : (
                      <p>Write a review!</p>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => setChangeReview(true)}
                      className="brown-button  hover:bg-yellow-600 hover:text-white"
                    >
                      Update Review
                    </button>
                    <button
                      onClick={checkDelete}
                      onDoubleClick={handleDelete}
                      className="brown-button  mx-2 hover:bg-red-600 hover:text-white "
                    >
                      Delete Review
                    </button>
                    {checkDeletePopup && (
                      <p className="text-red-600">
                        If you are sure you want to delete this book review,
                        please click the delete button twice
                      </p>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <br />
    </>
  )
}
