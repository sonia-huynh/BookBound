import { useState } from 'react'
import '../../styles/book.css'
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa'

export function StarRating() {
  const [starRating, setStarRating] = useState(0)
  const [hover, setHover] = useState(0)

  function handleClick(i: number) {
    const value = i + 0.5
    console.log('single')

    setStarRating(value)
  }

  function handleDoubleClick(i: number) {
    const value = i + 1
    console.log('double')
    setStarRating(value)
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
      return <FaStar color="gold" size="30" className="star" />
    } else if (hover >= ratingHalfValue || starRating >= ratingHalfValue) {
      return <FaStarHalfAlt color="gold" size="30" className="star" />
    } else {
      return <FaRegStar color="lightgray" size="30" className="star" />
    }
  }

  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <div key={i}>
          <label
            htmlFor={`star-rating-${i}`}
            onMouseEnter={() => {
              handleMouseEnter(i)
            }}
            onMouseLeave={() => handleMouseLeave()}
            onDoubleClick={() => handleDoubleClick(i)}
          >
            <button
              value={i}
              id={`star-rating-${i}`}
              onClick={() => handleClick(i)}
            >
              {starIcon(i)}
            </button>
          </label>
        </div>
      ))}
    </div>
  )
}
