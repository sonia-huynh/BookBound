import '../../styles/myBooks.css'
import { useGetBooks } from '../../hooks/useMyBooks'
import { useNavigate } from 'react-router-dom'

export default function MyBooks() {
  const navigate = useNavigate()
  const { data, isPending, isError, error } = useGetBooks()

  if (isPending) {
    return <p>Getting book...</p>
  }

  if (isError) {
    return <p>Oops! could not get book...{String(error)}</p>
  }

  return (
    <>
      <div className="ml-8 mr-8">
        <h1 className="mt-10 text-3xl font-bold underline">My Books</h1>
        <br></br>
        {data && (
          <div className="bookshelfContainer">
            {data.map((book) => (
              <div key={book.id} className="buttonbox">
                <img
                  src={book.image}
                  alt={`cover of book ${book.title}`}
                  className="book-cover"
                />
                <button
                  className="viewButton mt-4"
                  onClick={() => {
                    navigate(
                      `/my-books/search?id=${book.book_id}&title=${book.title}`,
                    )
                  }}
                >
                  View more
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
