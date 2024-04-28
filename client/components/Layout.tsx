import { useState } from 'react'
import { Outlet, useOutlet, useOutletContext } from 'react-router-dom'
import NavBar from './NavBar'

export function useSearchTerm() {
  return useOutletContext() as [string, (term: string) => void]
}

export default function Layout() {
  const searchTermState = useState('')
  return (
    <div className="app">
      <header>
        <NavBar />
      </header>
      <main>
        <Outlet context={searchTermState} />
      </main>
      <footer></footer>
    </div>
  )
}
