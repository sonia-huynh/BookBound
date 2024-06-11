import { Route, Routes } from 'react-router-dom'
import NavBar from './NavBar'
import Home from './Pages/Home'
import MyBooks from './Pages/MyBooks'
import MyReviews from './Pages/MyReviews'
import App from './App'
import SearchResults from './Pages/SearchResults'
import SearchBookDetails from './Pages/SearchBookDetails'
import MyBookDetails from './Pages/MyBookDetails'

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
            <Route index element={<Home />} />
            <Route path="search" element={<SearchResults />} />
            <Route path="search/:title" element={<SearchBookDetails />} />
            <Route path="my-books" element={<MyBooks />} />
            <Route path="my-books/:title" element={<MyBookDetails />} />
            <Route path="my-reviews" element={<MyReviews />} />
          </Route>
        </Routes>
      </header>
      <main></main>
      <footer></footer>
    </div>
  )
}
