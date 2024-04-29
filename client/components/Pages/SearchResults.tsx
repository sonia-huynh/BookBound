import { useAddBookToShelf } from '../../hooks/addBooks'
import { useGetSearchBook } from '../../hooks/useBooks'
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import { BookDetails } from '../../../models/books'

export default function SearchResults() {
  const [searchParams] = useSearchParams()
  const { data, isPending, isError, error } = useGetSearchBook(
    searchParams.get('q') || '',
  )
  const addBookToShelf = useAddBookToShelf()
  const [addBook, setAddBook] = useState<{ [key: string]: boolean }>({})

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
    const bookKey = `${details.bookId}`
    setAddBook((prevAddedBooks) => ({
      ...prevAddedBooks,
      [bookKey]: true,
    }))
  }

  return (
    <>
      <div className="flex justify-center">
        <h1 className="text-3xl font-bold underline">Search Results</h1>
      </div>
      <br />
      <div className="flex justify-center">
        {data && (
          <div className="container">
            {data.map((details) => (
              <div
                key={details.bookId}
                className="book-details mb-4 flex rounded-lg border border-gray-200 bg-white p-6"
              >
                <div className="img mr-4">
                  <img
                    src={details.image}
                    alt={`cover of book ${details.title}`}
                    className="book-cover mt-4"
                  />
                </div>
                <div className="details">
                  <h1 className=" mb-2">{details.title}</h1>
                  <p className="  mb-2">by {details.author}</p>
                  <p className=" mb-4">
                    {shorten(String(details.description))}
                  </p>
                  <div className="space-x-2">
                    <button className="searchButt">View More</button>
                    {!addBook[`${details.bookId}`] ? (
                      <button
                        className="searchButt"
                        onClick={() => {
                          const bookDetails = {
                            title: details.title,
                            author: details.author[0],
                            image: details.image,
                            bookId: details.bookId,
                          }
                          addBookToShelf.mutate(bookDetails)
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
