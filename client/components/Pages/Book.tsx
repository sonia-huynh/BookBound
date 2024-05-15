import { useSearchParams } from 'react-router-dom'
import { useGetSearchBook } from '../../hooks/useBooks'
import '../../styles/main.css'

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
    <>
      {searchData && (
        <div className="flex">
          {searchData.map((book) => (
            <div
              key={book.bookId}
              className="book-details mb-4 mt-8 flex rounded-lg border border-gray-200 bg-white p-6"
            >
              <div className="mr-4">
                <img
                  src={book.image}
                  alt={`cover of book ${book.title}`}
                  className="book-single"
                />
              </div>
              <div className="details">
                <h1 className="mb-2">{book.title}</h1>
                <p className=" mb-2">by {book.author}</p>
                <p className="mb-4">{book.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
