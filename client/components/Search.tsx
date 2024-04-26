import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useGetSearchBook } from '../hooks/useBooks'

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [input, setInput] = useState(searchParams.get('q') || '')

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
  }

  return (
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
      <button>Search!</button>
    </form>
  )
}
