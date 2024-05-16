import { useAddBookToShelf } from '../../hooks/addBooks'
import { useGetSearchBook } from '../../hooks/useBooks'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { BookDetails } from '../../../models/books'

export default function SearchResults() {
  const navigate = useNavigate()
  console.log(window.location)

  const [searchParams] = useSearchParams()
  const {
    data: searchData,
    isPending,
    isError,
    error,
  } = useGetSearchBook(searchParams.get('q') || '')

  //fetch book data from local storage:
  const getInitialState = () => {
    const books = localStorage.getItem('savedBooks')
    return books ? JSON.parse(books) : {}
  }

  const addBookToShelf = useAddBookToShelf()
  const [addBook, setAddBook] = useState<{ [key: string]: boolean }>(
    getInitialState,
  )

  //set list of saved books in local storage
  useEffect(() => {
    localStorage.setItem('savedBooks', JSON.stringify(addBook))
  }, [addBook])

  function shorten(description: string) {
    const maxDescriptionLength = 1
    const sentence = description.split('.')
    if (description.length <= maxDescriptionLength) {
      return description
    } else {
      const shorterSentence = sentence.slice(0, maxDescriptionLength)
      return shorterSentence.join('.') + '...'
    }
  }

  if (isPending) {
    return <p>Searching...</p>
  }

  if (isError) {
    return <p>Oops! {String(error)}</p>
  }

  function handleAddBook(details: BookDetails) {
    const bookDetails = {
      title: details.title,
      author: details.author[0],
      image: details.image,
      bookId: details.bookId,
    }
    addBookToShelf.mutate(bookDetails)

    const bookKey = `${details.title}, ${details.bookId}`
    setAddBook((prevAddedBooks) => ({
      ...prevAddedBooks,
      [bookKey]: true,
    }))
    console.log(addBook)
  }

  function viewMore(details: BookDetails) {
    navigate(`/my-books/search?q=${details.bookId}`)
    console.log(details.bookId)
  }

  return (
    <>
      <div className="flex justify-center">
        <h1 className="text-3xl font-bold underline">Search Results</h1>
      </div>
      <br />
      <div className="flex justify-center">
        {searchData && (
          <div className="container">
            {searchData.map((details) => (
              <div
                key={details.bookId}
                className="book-details mb-4 flex rounded-lg border border-gray-200 bg-white p-6"
              >
                <div className="mr-4">
                  <img
                    src={details.image}
                    alt={`cover of book ${details.title}`}
                    className="book-cover"
                  />
                </div>
                <div className="details">
                  <h1 className="mb-2">{details.title}</h1>
                  <p className=" mb-2">by {details.author}</p>
                  <p className="mb-4">{shorten(String(details.description))}</p>
                  <div className="space-x-2">
                    <button
                      className="searchButt"
                      onClick={() => {
                        viewMore(details)
                      }}
                    >
                      View More
                    </button>
                    {!addBook[`${details.title}, ${details.bookId}`] ? (
                      <button
                        className="searchButt"
                        onClick={() => {
                          handleAddBook(details)
                        }}
                      >
                        Add to Shelf
                      </button>
                    ) : (
                      <button className="searchButt">Added to Shelf</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
