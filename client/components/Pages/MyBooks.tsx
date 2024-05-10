import '../../styles/myBooks.css'
import { useGetBooks } from '../../hooks/useBooks'

export default function MyBooks() {
  const { data, isPending, isError, error } = useGetBooks()

  if (isPending) {
    return <p>Getting book...</p>
  }

  if (isError) {
    return <p>Oops! Coudl not get book...{String(error)}</p>
  }

  return (
    <>
      <div>
        <h1 className="ml-10 mt-10 text-3xl font-bold underline">My Books</h1>
        <br></br>
        <div className="bookshelfContainer">
          {data.map((book) => (
            <div key={book.id}>
              <img
                src={book.image}
                alt={`cover of book ${book.title}`}
                className="book-cover m-2"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
