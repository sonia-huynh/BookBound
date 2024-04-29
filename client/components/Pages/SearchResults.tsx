import { useGetSearchBook } from '../../hooks/useBooks'
import { useSearchParams } from 'react-router-dom'

export default function SearchResults() {
  const [searchParams] = useSearchParams()
  const { data, isPending, isError, error } = useGetSearchBook(
    searchParams.get('q') || '',
  )

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
                key={details.image}
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
                  <h1 className="title mb-2">{details.title}</h1>
                  <p className=" author mb-2">by {details.author}</p>
                  <p className="description mb-4">
                    {shorten(String(details.description))}
                  </p>
                  <div className="space-x-2">
                    <button className="searchButt">View More</button>
                    <button className="searchButt">Add to Shelf</button>
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
