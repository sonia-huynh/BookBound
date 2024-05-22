import { useSearchParams } from 'react-router-dom'
import { useGetBookById } from '../../hooks/useBooks'
import '../../styles/book.css'
import { useUpdateReview } from '../../hooks/useGetReview'
import { useEffect, useState } from 'react'
import { useGetReviewById } from '../../hooks/useGetReview'
import { useAddReview } from '../../hooks/useGetReview'
import { useDeleteReview } from '../../hooks/useGetReview'
import FetchReviews from './FetchReviews'

export default function MyBookDetails() {
  const [searchParams] = useSearchParams()
  const [input, setInput] = useState('')
  const [changeReview, setChangeReview] = useState(false)
  const [review, setReview] = useState('')
  const [reviewExist, setReviewExist] = useState(false)

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
  }, [refetch, reviewExist, changeReview, input])

  if (isPending) {
    return <p>Retreiving book data...</p>
  }

  if (isError) {
    return (
      <p>Sorry, the book details could not be retrieved! {String(error)}</p>
    )
  }

  // get rid of HTML tags in description
  const strippedHTML = (text: string) => {
    return text.replace(/<[^>]+>/g, '')
  }

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value)
    // console.log(input)
  }

  function handleAdd(text: string) {
    const bookId = String(searchParams.get('id'))
    const title = String(searchParams.get('title'))
    const bookReview = text

    if (bookId !== null) {
      addReview.mutate({
        bookId: bookId,
        title: title,
        review: bookReview,
      })
      // console.log({ bookId: bookId }, { title: title }, { review: text })
    } else {
      console.log('title parameter is null and review')
    }
    setReviewExist(true)
    setChangeReview(false)
    setReview(text)
    setInput('')
    console.log(review)
  }

  function handleUpdate(text: string) {
    const bookId = String(searchParams.get('id'))
    updateReview.mutate({
      bookId: bookId,
      review: text,
    })
    setChangeReview(false)
    setReview(text)
    console.log(review)
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
        <div className="card">
          {myBooksData && (
            <>
              <div className="detail">
                <div>
                  <img
                    src={myBooksData.image}
                    alt={`cover of book for ${myBooksData.title}`}
                    className="book-single"
                  />
                </div>
                <div className="ml-4">
                  <h1 className=" mb-2">{myBooksData.title}</h1>
                  <p className=" mb-2">by {myBooksData.author}</p>
                  <p className="mb-4">
                    {strippedHTML(String(myBooksData.description))}
                  </p>
                </div>
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
                    <FetchReviews review={review} />
                  </div>
                  <h1>Update Your Review:</h1>
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
                  <h1>Review exists:</h1>
                  <div className="bookReview mt-2">
                    <FetchReviews review={review} />
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
