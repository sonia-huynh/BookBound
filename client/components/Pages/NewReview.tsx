import { useState } from 'react'
import { useAddReview } from '../../hooks/useGetReview'
import { useParams } from 'react-router-dom'

export default function NewReview() {
  const { id } = useParams()
  const bookIdString = id as string
  const [input, setInput] = useState('')

  // Custom hooks:
  const addReview = useAddReview()
  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value)
  }

  function handleAdd(text: string) {
    const bookId = bookIdString
    const bookReview = text

    if (bookId !== null) {
      addReview.mutate({
        bookId,
        review: bookReview,
      })
    } else {
      console.log('title parameter is null and review')
    }
    setInput('')
  }

  return (
    <div>
      <h1 className="mt-8">Your Book Review:</h1>
      <div className="book-review mt-4">
        <h2 className="mb-2">Write a review!</h2>
      </div>
      <div>
        <textarea
          aria-label="book review text area"
          name="review"
          id="review"
          className="review-edit-textarea"
          placeholder="Write your review here"
          onChange={handleChange}
        />
      </div>
      <div className="flex justify-end">
        <button onClick={() => handleAdd(input)} className="brown-button">
          Save Review
        </button>
      </div>
    </div>
  )
}
