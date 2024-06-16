import { useSearchParams } from 'react-router-dom'
import { useGetBookById } from '../../hooks/useMyBooks'
import '../../styles/book.css'
import { useUpdateReview } from '../../hooks/useGetReview'
import { useEffect, useState } from 'react'
import { useAddReview } from '../../hooks/useGetReview'
import { useDeleteReview } from '../../hooks/useGetReview'
import FetchReviews from './FetchReviews'
import { StarRating } from './StarRating'

interface CleanedTextResult {
  cleaned: string
  shouldShowReadMore: boolean
}

export default function MyBookDetails() {
  const [searchParams] = useSearchParams()
  const [input, setInput] = useState('')
  const [changeReview, setChangeReview] = useState(false)
  const [reviewExist, setReviewExist] = useState(false)
  const [oldReview, setOldReview] = useState('')
  const [readMore, setReadMore] = useState(false)

  // Custom hooks:
  const updateReview = useUpdateReview()
  const addReview = useAddReview()
  const deleteReview = useDeleteReview()

  const {
    data: myBooksData,
    isPending,
    isError,
    error,
    refetch,
  } = useGetBookById(searchParams.get('id') || '')

  useEffect(() => {
    refetch()
  }, [refetch, myBooksData, reviewExist, changeReview, input])

  if (isPending) {
    return <p>Retrieving book data...</p>
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
    const numSentences = 6

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

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value)
  }

  function handleAdd(text: string) {
    const bookId = String(searchParams.get('id'))
    const title = String(searchParams.get('title'))
    const bookReview = text

    if (bookId !== null) {
      addReview.mutate({
        bookId,
        title,
        review: bookReview,
      })
    } else {
      console.log('title parameter is null and review')
    }
    setReviewExist(true)
    setChangeReview(false)
    setInput('')
  }

  function handleUpdate(text: string) {
    const bookId = String(searchParams.get('id'))

    if (text !== oldReview) {
      updateReview.mutate({
        bookId,
        review: text,
      })
      setChangeReview(false)
    } else {
      // Do nothing if the text hasn't changed
      console.log('Review text has not changed.')
    }
  }

  function handleDelete() {
    const bookId = String(searchParams.get('id'))

    setChangeReview(false)
    setReviewExist(false)
    setInput('')
    deleteReview.mutate(bookId)
  }

  return (
    <>
      <div className="box">
        <div className="bookCard card">
          {myBooksData && (
            <>
              <div className="detail">
                <div className="flex justify-center">
                  <img
                    src={myBooksData.image}
                    alt={`cover of book for ${myBooksData.title}`}
                    className="book-single"
                  />
                </div>
                <div className="ml-6">
                  <h1 className="mb-2 ">{myBooksData.title}</h1>
                  <p className=" mb-2">by {myBooksData.author}</p>
                  <p className="mb-4">
                    {cleanText}
                    {shouldShowReadMore && (
                      <button
                        onClick={() => setReadMore(true)}
                        className="readMore"
                      >
                        {' '}
                        --- Read more
                      </button>
                    )}
                    {readMore && (
                      <button
                        onClick={() => setReadMore(false)}
                        className="readMore"
                      >
                        {' --- See Less'}
                      </button>
                    )}
                  </p>
                </div>
              </div>
              <div>
                <h1 className="mt-4">Your Rating:</h1>
                <StarRating />
              </div>
              {!myBooksData.review ? (
                <div>
                  <h1 className=" mt-4">Your Book Review:</h1>
                  <div className="bookReview mt-4">
                    <p>Write a review!</p>
                  </div>
                  <div>
                    <textarea
                      name="review"
                      id="review"
                      className="review"
                      placeholder="Write your review here"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleAdd(input)}
                      className="searchButt"
                    >
                      Save Review
                    </button>
                  </div>
                </div>
              ) : myBooksData.review && changeReview === true ? (
                <div>
                  <h1 className="mt-8">
                    Review exists and you want to change:
                  </h1>
                  <div className="bookReview">
                    <FetchReviews
                      reviewExist={reviewExist}
                      setOldReview={setOldReview}
                    />
                  </div>
                  <h1>Update Your Review:</h1>
                  <div>
                    <textarea
                      name="review"
                      id="review"
                      className="review"
                      placeholder="Write your review here"
                      defaultValue={oldReview}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={() => {
                        handleUpdate(input)
                      }}
                      className="searchButt"
                    >
                      Save Updated Review
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h1 className=" mt-4">Your Book Review:</h1>
                  <div className="bookReview mt-2">
                    <FetchReviews
                      reviewExist={reviewExist}
                      setOldReview={setOldReview}
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => setChangeReview(true)}
                      className="searchButt"
                    >
                      Update Review
                    </button>
                    <button onClick={handleDelete} className="searchButt mx-2">
                      Delete Review
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}
