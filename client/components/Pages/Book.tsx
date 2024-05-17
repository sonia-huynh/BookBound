import { useSearchParams } from 'react-router-dom'
import { useGetSearchBookById } from '../../hooks/useBooks'
import '../../styles/books.css'

export default function Book() {
  const [searchParams] = useSearchParams()
  const { data, isPending, isError, error } = useGetSearchBookById(
    searchParams.get('id') || '',
  )
  console.log(searchParams.get('id'))
  if (isPending) {
    return <p>Retreiving book data...</p>
  }

  if (isError) {
    return (
      <p>Sorry, the book details could not be retrieved! {String(error)}</p>
    )
  }

  const strippedHTML = (text: string) => {
    return text.replace(/<[^>]+>/g, '')
  }

  return (
    <>
      <div className="box">
        <div className="card">
          {data && (
            <div>
              <div>
                {data.map((book) => (
                  <div key={book.bookId} className="detail">
                    <div>
                      <img
                        src={book.image}
                        alt={`cover of book for ${book.title}`}
                        className="book-single"
                      />
                    </div>
                    <div className="ml-4">
                      <h1 className=" mb-2">{book.title}</h1>
                      <p className=" mb-2">by {book.author}</p>
                      <p className="mb-4">
                        {strippedHTML(book.description as string)}
                      </p>
                    </div>
                  </div>
                ))}
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
    </>
  )
}
