import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useUpdateReview } from '../../hooks/useGetReview'
import { useParams } from 'react-router-dom'

interface Props {
  prevReview: string
  setChangeReview: Dispatch<SetStateAction<boolean>>
  oldReview: string
}

export default function EditReview({
  prevReview,
  setChangeReview,
  oldReview,
}: Props) {
  const { id } = useParams()
  const bookIdString = id as string
  const [input, setInput] = useState('')

  // Custom hooks:
  useEffect(() => {
    if (oldReview) {
      setInput(oldReview)
    }
  }, [oldReview])

  const updateReview = useUpdateReview()
  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value)
  }

  console.log(oldReview)
  function handleUpdate(text: string) {
    const bookId = bookIdString
    if (text === oldReview) {
      // Do nothing if the text hasn't changed
      console.log('Review text has not changed.')
      setChangeReview(false)
    } else if (text !== oldReview) {
      updateReview.mutate({
        bookId,
        review: text,
      })
      setChangeReview(false)
    }
  }

  return (
    <div>
      <h1 className="mt-8">Current Review:</h1>
      <div className="book-review-display">
        {prevReview.length > 0 ? <p>{prevReview}</p> : <p>Write a review!</p>}
      </div>
      <h1>Update Your Current Review:</h1>
      <div>
        <textarea
          name="review"
          id="review"
          className="review-edit-textarea"
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
          className="brown-button  mr-2 hover:bg-lime-600 hover:text-white"
        >
          Save Updated Review
        </button>
      </div>
    </div>
  )
}
