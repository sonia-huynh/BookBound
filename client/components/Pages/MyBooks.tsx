import '../../styles/myBooks.css'
import { useGetBooks } from '../../hooks/useMyBooks'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function MyBooks() {
  const navigate = useNavigate()
  const { data, isPending, isError, error } = useGetBooks()
  const [edit, setEdit] = useState(false)

  if (isPending) {
    return <p>Getting book...</p>
  }

  if (isError) {
    return <p>Oops! could not get book...{String(error)}</p>
  }

  function handleDeleteBook() {}

  return (
    <>
      <div className="ml-8 mr-8">
        <div className="flex justify-between">
          <div className="">
            <h1 className="mt-10 text-3xl font-bold underline">My Books</h1>
          </div>
          <div className="">
            {!edit ? (
              <button
                className="mt-10 text-3xl font-bold underline"
                onClick={() => setEdit(true)}
              >
                Edit
              </button>
            ) : (
              <button
                className="mt-10 text-3xl font-bold underline"
                onClick={() => setEdit(false)}
              >
                Finished Edit
              </button>
            )}
          </div>
        </div>
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
                {!edit ? (
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
                ) : (
                  <button className="deleteButton mt-4">Delete Book</button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
