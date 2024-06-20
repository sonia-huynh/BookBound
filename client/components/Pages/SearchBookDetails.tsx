import { useNavigate, useSearchParams } from 'react-router-dom'
import { useGetSearchBookById } from '../../hooks/useSearchBooks'
import '../../styles/book.css'
import { useAddBookToShelf } from '../../hooks/useMyBooks'
import { useEffect, useState } from 'react'
import { BookDetails } from '../../../models/books'

export default function SearchBookDetails() {
  // console.log(window.localStorage)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const addBookToShelf = useAddBookToShelf()

  const getInitialState = () => {
    const books = localStorage.getItem('savedBooks')
    return books ? JSON.parse(books) : {}
  }

  const [addBook, setAddBook] = useState<{ [key: string]: boolean }>(
    getInitialState,
  )

  // Custom hooks:
  //set list of saved books in local storage
  useEffect(() => {
    localStorage.setItem('savedBooks', JSON.stringify(addBook))
  }, [addBook])
  const {
    data: searchBookData,
    isPending,
    isError,
    error,
  } = useGetSearchBookById(searchParams.get('id') || '')
  // console.log(window.location)

  function handleAddBook(details: BookDetails) {
    const bookDetails = {
      title: details.title,
      author: details.author[0],
      image: details.image,
      bookId: details.bookId,
      description: String(details.description),
    }
    addBookToShelf.mutate(bookDetails)

    const bookKey = `${details.title}, ${details.bookId}`
    setAddBook((prevAddedBooks) => ({
      ...prevAddedBooks,
      [bookKey]: true,
    }))
  }
  function handleClick(details: BookDetails) {
    navigate(`/my-books/search?id=${details.bookId}&title=${details.title}`)
  }

  if (isPending) {
    return <p>Retreiving book data...</p>
  }

  if (isError) {
    return (
      <p>Sorry, the book details could not be retrieved! {String(error)}</p>
    )
  }

  // get rid of HTML tags in description
  const strippedHTML = (text: string) => {
    if (text === null) {
      return text
    } else {
      let cleaned = text.replace(/<[^>]+>/g, '')
      cleaned = cleaned.replace(/[*_(){}[\]]+/g, '')

      // Step 3: Remove excessive whitespace
      cleaned = cleaned.replace(/\s+/g, ' ').trim()

      return cleaned
    }
  }
  return (
    <>
      <div className="box">
        <div className="searchBookCard card">
          <div>
            {searchBookData.map((book, i) => (
              <div key={book.bookId + i}>
                <div key={book.bookId + i}>
                  <div className="flex justify-center">
                    <img
                      src={book.image}
                      alt={`cover of book for ${book.title}`}
                      className="book-single"
                    />
                  </div>
                  <div className="ml-4">
                    <h1 className="mb-2 mt-4 text-center">{book.title}</h1>
                    <p className=" mt-2 text-center">by {book.author}</p>
                    <p className="p-8">
                      {strippedHTML(book.description as string)}
                    </p>
                  </div>
                </div>
                <div>
                  {!addBook[`${book.title}, ${book.bookId}`] ? (
                    <>
                      <div
                        key={book.title}
                        className="mt-2 flex justify-center"
                      >
                        <strong>
                          Add this book to your shelf to write a review!
                        </strong>
                      </div>
                      <div className="flex justify-center">
                        <button
                          className="searchButt  mt-8"
                          onClick={() => {
                            handleAddBook(book)
                          }}
                        >
                          Add book to shelf
                        </button>
                      </div>
                    </>
                  ) : (
                    <div>
                      <div
                        className="mt-8 flex justify-center"
                        key={book.title}
                      >
                        <strong>
                          This book has now been added to your shelf, click the
                          button to write a review!
                        </strong>
                      </div>
                      <div className="flex justify-center">
                        <button
                          onClick={() => handleClick(book)}
                          className="searchButt mt-8"
                        >
                          Write a review
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
