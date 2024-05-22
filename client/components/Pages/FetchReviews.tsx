import { useSearchParams } from 'react-router-dom'
import '../../styles/book.css'

import { useGetReviewById } from '../../hooks/useGetReview'
import { useEffect } from 'react'

interface Props {
  // setReview: React.Dispatch<React.SetStateAction<string>>
  review: string
}

export default function FetchReviews(review: Props) {
  const [searchParams] = useSearchParams()

  const {
    data: reviewData,
    isPending,
    isError,
    error,
    refetch,
  } = useGetReviewById(searchParams.get('id') || '')

  useEffect(() => {
    refetch()
  }, [refetch, review])

  if (isPending) {
    return <p>Retreiving book data...</p>
  }

  if (isError) {
    return (
      <p>Sorry, the book details could not be retrieved! {String(error)}</p>
    )
  }

  return (
    <>
      <p>{reviewData}</p>
    </>
  )
}
