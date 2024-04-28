import { useGetSearchBook } from '../hooks/useBooks.ts'
import { useSearchParams } from 'react-router-dom'

export default function Home() {
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold underline">Home</h1>
      </div>
      <div>
        <SearchResults />
      </div>
    </>
  )
}

function SearchResults() {
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
    <ol>
      {data.map((details) => (
        <li key={details.title}>
          <h3>{details.title}</h3>
          <h4>by {details.author}</h4>
          <img src={details.image} alt={`cover of book ${details.title}`} />
        </li>
      ))}
    </ol>
  )
}
