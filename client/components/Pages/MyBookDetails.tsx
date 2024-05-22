import { useSearchParams } from 'react-router-dom'
import {
  useGetBookById,
  useGetBooks,
  useGetSearchBookById,
} from '../../hooks/useBooks'
import '../../styles/book.css'
import { useUpdateReview } from '../../hooks/updateReview'
import { useEffect, useState } from 'react'
import { useGetReviewById } from '../../hooks/useGetReview'
import { useAddReview } from '../../hooks/addReview'
import { useDeleteReview } from '../../hooks/deleteReview'

export default function MyBookDetails() {
  const [searchParams] = useSearchParams()
  const [input, setInput] = useState('')
  const [changeReview, setChangeReview] = useState(false)
  const [newReview, setNewReview] = useState(false)

  // Custom hooks:
  const updateReview = useUpdateReview()
  const addReview = useAddReview()
  const deleteReview = useDeleteReview()

  const { data: myBooksData } = useGetBookById(searchParams.get('id') || '')

  // const { data: reviewData, refetch: refetchReview } = useGetReviewById(
  //   searchParams.get('id') || '',
  // )

  // Check if book exists in libary

  // useEffects:
  // useEffect(() => {
  //   setTimeout(() => {
  //     refetchReview()
  //   }, 0)
  // }, [refetchReview, newReview])

  // if (isPending) {
  //   return <p>Retreiving book data...</p>
  // }

  // if (isError) {
  //   return (
  //     <p>Sorry, the book details could not be retrieved! {String(error)}</p>
  //   )
  // }

  // get rid of HTML tags in description
  // const strippedHTML = (text: string) => {
  //   return text.replace(/<[^>]+>/g, '')
  // }

  // function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
  //   setInput(e.target.value)
  //   // console.log(input)
  // }

  // function handleSave(text: string) {
  //   const bookId = String(searchParams.get('id'))
  //   const title = String(searchParams.get('title'))
  //   const bookReview = text

  //   if (bookId !== null) {
  //     addReview.mutate({
  //       bookId: bookId,
  //       title: title,
  //       review: bookReview,
  //     })
  //     // console.log({ bookId: bookId }, { title: title }, { review: text })
  //   } else {
  //     console.log('title parameter is null and review')
  //   }
  //   setNewReview((newReview) => !newReview)
  //   setInput('')
  // }

  // function handleUpdate(text: string) {
  //   setChangeReview(true)
  //   const bookId = String(searchParams.get('id'))

  //   updateReview.mutate({
  //     bookId: bookId,
  //     review: text,
  //   })
  //   setNewReview((newReview) => !newReview)
  //   setChangeReview(!changeReview)
  // }

  // function handleDelete() {
  //   const bookId = String(searchParams.get('id'))
  //   deleteReview.mutate(bookId)
  //   setChangeReview(!changeReview)
  //   setNewReview(!newReview)
  // }

  return (
    <>
      <div className="box">
        <div className="card">
          <div>
            <div>
              {myBooksData && (
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
                    <p className="mb-4">{myBooksData.description}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* <br />
          <br />
          {!checkId?.includes(id) ? (
            <div className="flex justify-center">
              <strong>Add this book to your library to write a review!</strong>
            </div>
          ) : (
            <>
              {!reviewData ? (
                <div>
                  <div className="bookReview">
                    <p>{reviewData}</p>
                  </div>
                  <div>
                    <textarea
                      name="review"
                      id="review"
                      className="review"
                      placeholder="Write your review here"
                      value={input}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleSave(input)}
                      className="searchButt"
                    >
                      Save Review
                    </button>
                  </div>
                </div>
              ) : reviewData && changeReview === true ? (
                <div>
                  <h1>Your Old Review:</h1>
                  <div className="bookReview">
                    <p>{reviewData}</p>
                  </div>
                  <h1>Update Your Review:</h1>
                  <div>
                    <textarea
                      name="review"
                      id="review"
                      className="review"
                      placeholder="Write your review here"
                      defaultValue={reviewData}
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
                  <h1>Your Book Review:</h1>
                  <div className="bookReview mt-4">
                    <p>{reviewData}</p>
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleUpdate(input)}
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
          )} */}
        </div>
      </div>
    </>
  )
}
