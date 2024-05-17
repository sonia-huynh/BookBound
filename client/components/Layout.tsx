import { Route, Routes } from 'react-router-dom'
import NavBar from './NavBar'
import Home from './Pages/Home'
import MyBooks from './Pages/MyBooks'
import MyReviews from './Pages/MyReviews'
import App from './App'
import SearchResults from './Pages/SearchResults'
import Book from './Pages/Book'

// export function useSearchTerm() {
// return useOutletContext() as [string, (term: string) => void]
// }

export default function Layout() {
  return (
    <div className="app">
      <header>
        <NavBar />
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="home" element={<Home />} />
            <Route path="search" element={<SearchResults />} />
            <Route path="my-books" element={<MyBooks />} />
            <Route path="my-books/:title" element={<Book />} />
            <Route path="my-reviews" element={<MyReviews />} />
          </Route>
        </Routes>
      </header>
      <main></main>
      <footer></footer>
    </div>
  )
}
