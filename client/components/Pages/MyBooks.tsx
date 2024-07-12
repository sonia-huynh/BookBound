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
    return <p className="text-center">Getting book...</p>
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
      <div className="my-books-box ml-8 mr-8">
        <div className="flex justify-between">
          <div>
            <h1 className="my-book mt-10 text-3xl font-bold underline">
              My Books
            </h1>
          </div>
          <div>
            {!edit ? (
              <button
                className="edit mt-10 text-3xl font-bold underline hover:text-red-700"
                onClick={() => setEdit(true)}
              >
                Edit
              </button>
            ) : (
              <button
                className="finish-edit mt-10 text-3xl font-bold underline hover:text-green-700"
                onClick={() => setEdit(false)}
              >
                Finished Edit
              </button>
            )}
          </div>
        </div>
        <br></br>
        {data && (
          <div className="my-books-container">
            {data.map((book) => (
              <div key={book.id} className="my-books-buttonbox">
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
                    className="my-books-view-more-button mt-2"
                    onClick={() => {
                      navigate(`/my-books/${book.book_id}/${book.title}`)
                    }}
                  >
                    View more
                  </button>
                ) : (
                  <>
                    <button
                      className="my-books-delete-button mt-2"
                      onClick={() => handleDeleteBook(book.title, book.book_id)}
                    >
                      Delete Book
                    </button>
                  </>
                )}
              </div>
            ))}
            {deleting && (
              <div className="my-books-popup-overlay">
                <div className="my-books-popup">
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
      <br />
    </>
  )
}
