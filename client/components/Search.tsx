import { useState } from 'react'

export default function Search() {
  const [search, setSearch] = useState('')

  function handleChange(e) {
    e.preventDefault()
    setSearch(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log('submitted')
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          placeholder="🔎 Search"
          value={search}
          onChange={handleChange}
        />
      </form>
    </>
  )
}
