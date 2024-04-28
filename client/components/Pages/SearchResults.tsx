import { useGetSearchBook } from '../../hooks/useBooks'
import { useSearchParams } from 'react-router-dom'

export default function SearchResults() {
  const [searchParams] = useSearchParams()
  const { data, isPending, isError, error } = useGetSearchBook(
    searchParams.get('q') || '',
  )

  function shorten(description: string) {
    const maxDescriptionLength = 3
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
      <div className="flex justify-center	">
        <h1 className="text-3xl font-bold underline	">Search Results</h1>
      </div>
      <br></br>
      <div className="flex justify-center">
        {data && (
          <div className="container">
            {data.map((details) => (
              <div
                key={details.image}
                className="book-details flex flex-col rounded-lg border border-gray-200 bg-white p-6"
              >
                <div className="detail">
                  <img
                    src={details.image}
                    alt={`cover of book ${details.title}`}
                    className="mt-4"
                  />
                  <p className="mb-2">{details.title}</p>
                  <p className="mb-2">by {details.author}</p>
                </div>
                <div className="">
                  <p className="mb-4 text-base">
                    {shorten(String(details.description))}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
