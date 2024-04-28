import { useGetSearchBook } from '../../hooks/useBooks'
import { useSearchParams } from 'react-router-dom'

export default function SearchResults() {
  const [searchParams] = useSearchParams()
  const { data, isPending, isError, error } = useGetSearchBook(
    searchParams.get('q') || '',
  )

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
      <div className="flex justify-center	">
        {data && (
          <div className="flex max-w-sm	justify-center rounded-lg border border-gray-200 bg-white p-6">
            <ol>
              {data.map((details) => (
                <li key={details.image}>
                  <h3>{details.title}</h3>
                  <h4>by {details.author}</h4>
                  <img
                    src={details.image}
                    alt={`cover of book ${details.title}`}
                  />
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </>
  )
}
