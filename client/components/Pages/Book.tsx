import { useSearchParams } from 'react-router-dom'
import { useGetSearchBook } from '../../hooks/useBooks'
import '../../styles/books.css'

export default function Book() {
  const [searchParams] = useSearchParams()
  console.log(window.location)
  const {
    data: searchData,
    isPending,
    isError,
    error,
  } = useGetSearchBook(searchParams.get('q') || '')

  if (isPending) {
    return <p>Retreiving book data...</p>
  }

  if (isError) {
    return (
      <p>Sorry, the book details could not be retrieved! {String(error)}</p>
    )
  }

  return (
    <div className="box">
      <div className="card">
        {searchData && (
          <div>
            <div className="detail">
              <div className="mr-4">
                <img
                  src={searchData[0].image}
                  alt={`cover of book ${searchData[0].title}`}
                  className="book-single"
                />
              </div>
              <div className="ml-4">
                <h1 className="mb-2">{searchData[0].title}</h1>
                <p className=" mb-2">by {searchData[0].author}</p>
                <p className="mb-4">{searchData[0].description}</p>
              </div>
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
          />
        </div>
      </div>
    </div>
  )
}
