import { Outlet, useSearchParams } from 'react-router-dom'
import { useGetBookById } from '../../hooks/useMyBooks'
import '../../styles/book.css'
import { useUpdateReview } from '../../hooks/useGetReview'
import { useEffect, useState } from 'react'
import { useAddReview } from '../../hooks/useGetReview'
import { useDeleteReview } from '../../hooks/useGetReview'
import FetchReviews from './FetchReviews'
import { StarRating } from './StarRating'

export default function MyBookDetails() {
  const [searchParams] = useSearchParams()
  const [input, setInput] = useState('')
  const [changeReview, setChangeReview] = useState(false)
  const [reviewExist, setReviewExist] = useState(false)
  const [oldReview, setOldReview] = useState('')

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

  // turn description sentences into an array of them and then map through them
  const paragraphStrings = (text: string) => {
    const parArr = [text]
    const splitPar = parArr[0].split('.')
    return console.log(splitPar)
  }
  paragraphStrings(
    'The quick brown fox jumps over the lazy dog. Sally sells sea shells by the sea shore. I am so cool. This is crazy... What is this? Name a fruit. I am a durian. ',
  )

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
    setInput('')
  }

  function handleUpdate(text: string) {
    const bookId = String(searchParams.get('id'))
    updateReview.mutate({
      bookId: bookId,
      review: text,
    })
    setChangeReview(false)
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
                <div className="flex justify-center">
                  <img
                    src={myBooksData.image}
                    alt={`cover of book for ${myBooksData.title}`}
                    className="book-single "
                  />
                </div>
                <div className="ml-6">
                  <h1 className="mb-2 ">{myBooksData.title}</h1>
                  <p className=" mb-2">by {myBooksData.author}</p>
                  <p className="mb-4">
                    {strippedHTML(myBooksData.description as string)}
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
