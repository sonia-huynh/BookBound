import { useDeleteBookById } from '../../hooks/useMyBooks'

interface Props {
  setDeleting: React.Dispatch<React.SetStateAction<boolean>>
  bookName: string
  bookId: string
}

export default function DeleteBookPopup({
  setDeleting,
  bookName,
  bookId,
}: Props) {
  const deleteBook = useDeleteBookById()

  function handleDelete() {
    deleteBook.mutate(bookId)
    setDeleting(false)
  }

  return (
    <div className="mt-5">
      <h1>
        <strong>
          Are you sure you want to delete the book - <u>{bookName}</u> ?
        </strong>
      </h1>
      <br />
      <p>
        This action will also permanently delete any book reviews and ratings
        associated with this book.
      </p>
      <div className="mt-5 flex justify-around">
        <div>
          <button className="yes-button" onClick={handleDelete}>
            Yes
          </button>
        </div>
        <div>
          <button className="no-button" onClick={() => setDeleting(false)}>
            No
          </button>
        </div>
      </div>
      <button className="close" onClick={() => setDeleting(false)}>
        x
      </button>
    </div>
  )
}
