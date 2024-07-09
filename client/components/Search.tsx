import React, { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [input, setInput] = useState(searchParams.get('q') || '')
  const navigate = useNavigate()

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    setInput(e.target.value)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    console.log('submitted')
    setSearchParams((prev) => {
      prev.set('q', input)
      return prev
    })
    navigate(`/search?q=${input}`)
    setInput('')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          name="search-form"
          id="search-form"
          className="search-input"
          placeholder="🔎 Search"
          value={input}
          onChange={handleChange}
          style={{ width: '350px' }}
          autoComplete="off"
          aria-label="search bar"
        />
      </form>
    </div>
  )
}
