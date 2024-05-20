import { useSearchParams } from 'react-router-dom'
import { useGetSearchBookById } from '../../hooks/useBooks'
import '../../styles/book.css'
import { useUpdateReview } from '../../hooks/updateReview'
import { useState } from 'react'

export default function Book() {
  const [searchParams] = useSearchParams()
  const [input, setInput] = useState('')
  const updateReview = useUpdateReview()
  const { data, isPending, isError, error } = useGetSearchBookById(
    searchParams.get('id') || '',
  )
  // console.log(searchParams.get('id'))
  // console.log(window.location)
  if (isPending) {
    return <p>Retreiving book data...</p>
  }

  if (isError) {
    return (
      <p>Sorry, the book details could not be retrieved! {String(error)}</p>
    )
  }

  const strippedHTML = (text: string) => {
    return text.replace(/<[^>]+>/g, '')
  }

  function handleChange(e) {
    setInput(e.target.value)
    // console.log(input)
  }

  function handleSave(text: string) {
    const bookId = searchParams.get('id')
    const bookReview = text

    if (bookId !== null) {
      updateReview.mutate({ bookId: bookId, review: bookReview })
      // console.log({ bookId: bookId }, { review: text })
    } else {
      console.log('title parameter is null and review')
    }
  }

  return (
    <>
      <div className="box">
        <div className="card">
          {data && (
            <div>
              <div>
                {data.map((book) => (
                  <div key={book.bookId} className="detail">
                    <div>
                      <img
                        src={book.image}
                        alt={`cover of book for ${book.title}`}
                        className="book-single"
                      />
                    </div>
                    <div className="ml-4">
                      <h1 className=" mb-2">{book.title}</h1>
                      <p className=" mb-2">by {book.author}</p>
                      <p className="mb-4">
                        {strippedHTML(book.description as string)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <br />
          <br />
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
              className="rounded border border-orange-900 bg-orange-900 px-4 py-2 font-bold text-white hover:bg-orange-700"
            >
              Save Review
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
