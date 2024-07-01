import { useEffect, useState } from 'react'
import '../../styles/book.css'
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa'
import {
  useAddBookRating,
  useDeleteBookRating,
  useGetBookRatingById,
} from '../../hooks/useRatings'
import { useParams } from 'react-router-dom'

interface Props {
  bookId: string
}

export function StarRating({ bookId }: Props) {
  const { id } = useParams()
  const bookIdString = id as string
  const [starRating, setStarRating] = useState(0)
  const [hover, setHover] = useState(0)

  const addRating = useAddBookRating()
  const deleteRating = useDeleteBookRating()

  const { data, isPending, isError, error } = useGetBookRatingById(
    bookIdString || bookId,
  )

  useEffect(() => {
    if (data) {
      setStarRating(data.rating)
    } else if (!data) {
      setStarRating(0)
    }
  }, [data, starRating])

  function handleClick(i: number) {
    const value = i + 0.5
    addRating.mutate({
      bookId: bookIdString,
      rating: value,
    })
    setStarRating(value)
  }

  function handleDoubleClick(i: number) {
    const value = i + 1
    addRating.mutate({
      bookId: bookIdString,
      rating: value,
    })
    setStarRating(value)
  }

  function handleDelete() {
    setStarRating(0)
    deleteRating.mutate(bookIdString)
  }

  function handleMouseEnter(i: number) {
    const value = i > 3 ? i + 1 : i + 0.5
    setHover(value)
  }

  function handleMouseLeave() {
    setHover(0)
  }

  function starIcon(i: number) {
    const ratingValue = i + 1
    const ratingHalfValue = i + 0.5

    if (hover >= ratingValue || starRating >= ratingValue) {
      return (
        <FaStar color="gold" size={bookId ? '18' : '30'} className="star" />
      )
    } else if (hover >= ratingHalfValue || starRating >= ratingHalfValue) {
      return (
        <FaStarHalfAlt
          color="gold"
          size={bookId ? '18' : '30'}
          className="star"
        />
      )
    } else {
      return (
        <FaRegStar
          color="lightgray"
          size={bookId ? '15' : '30'}
          className="star"
        />
      )
    }
  }

  if (isPending) {
    return <p>Loading your book rating details... {String(error)}</p>
  }

  if (isError) {
    return (
      <p>
        Sorry, the book rating details could not be retrieved! {String(error)}
      </p>
    )
  }
  return (
    <>
      <div className={bookId ? 'flex justify-center' : 'flex '}>
        {[...Array(5)].map((_, i) => (
          <div key={i}>
            <label
              htmlFor={`star-rating-${i}`}
              onMouseEnter={() => {
                bookId ? null : starRating > 0 ? null : handleMouseEnter(i)
              }}
              onMouseLeave={() => handleMouseLeave()}
              onDoubleClick={() => (bookId ? null : handleDoubleClick(i))}
            >
              <button
                value={i}
                id={`star-rating-${i}`}
                onClick={() => (bookId ? null : handleClick(i))}
              >
                {starIcon(i)}
              </button>
            </label>
          </div>
        ))}
      </div>
      {bookIdString && starRating != null && (
        <div>
          <button
            onClick={handleDelete}
            className="hover:font-bold hover:text-red-500 "
          >
            Delete rating
          </button>
        </div>
      )}
    </>
  )
}
