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
        <h1 className="text-3xl font-bold underline">My Books</h1>
        <p>This will house the bookshelves</p>
        <div className="flex space-x-8">
          {data.map((book) => (
            <div key={book.id}>
              <img
                src={book.image}
                alt={`cover of book ${book.title}`}
                className="book-cover mt-4"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
