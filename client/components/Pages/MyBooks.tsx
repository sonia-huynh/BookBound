import '../../styles/myBooks.css'
import { useGetBooks } from '../../hooks/useMyBooks'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import DeleteBookPopUp from './DeleteBookPopUp'
import { StarRating } from './StarRating'

export default function MyBooks() {
  const navigate = useNavigate()

  const { data, isPending, isError, error, refetch } = useGetBooks()
  const [edit, setEdit] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [bookTitle, setBookTitle] = useState('')
  const [bookId, setBookId] = useState('')

  useEffect(() => {
    refetch()
  }, [refetch])

  if (isPending) {
    return <p>Getting book...</p>
  }

  if (isError) {
    return <p>Oops! could not get book...{String(error)}</p>
  }

  console.log(bookId)
  function handleDeleteBook(title: string, bookId: string) {
    setBookTitle(title)
    setBookId(bookId)
    setDeleting(true)
  }

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
                className="mt-10 text-3xl font-bold underline hover:text-red-700"
                onClick={() => setEdit(true)}
              >
                Edit
              </button>
            ) : (
              <button
                className="mt-10 text-3xl font-bold underline hover:text-green-700"
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
                <div className="mt-2">
                  <StarRating bookId={book.book_id} />
                </div>
                {!edit ? (
                  <button
                    className="viewButton mt-2"
                    onClick={() => {
                      navigate(`/my-books/${book.book_id}/${book.title}`)
                    }}
                  >
                    View more
                  </button>
                ) : (
                  <>
                    <button
                      className="deleteButton mt-4"
                      onClick={() => handleDeleteBook(book.title, book.book_id)}
                    >
                      Delete Book
                    </button>
                  </>
                )}
              </div>
            ))}
            {deleting && (
              <div className="popup-overlay">
                <div className="popup">
                  <DeleteBookPopUp
                    setDeleting={setDeleting}
                    bookName={bookTitle}
                    bookId={bookId}
                    bookTitle={bookTitle}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}
