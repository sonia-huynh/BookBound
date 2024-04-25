import { useState } from 'react'
import { useGetSearchBook } from '../hooks/useBooks'

export default function Search() {
  const [input, setInput] = useState('')
  const search = input
  const { data, isLoading, isError, error } = useGetSearchBook(search)

  function handleChange(e) {
    e.preventDefault()
    setInput(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()

    console.log('submitted')
  }

  console.log(data)
  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Error: {error.message}</p>
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          name="search-form"
          id="search-form"
          className="input"
          placeholder="🔎 Search"
          value={input}
          onChange={handleChange}
        />
      </form>
    </>
  )
}
