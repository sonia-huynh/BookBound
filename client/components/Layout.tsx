import { Route, Routes } from 'react-router-dom'
import NavBar from './NavBar'
import Home from './Pages/Home'
import MyBooks from './Pages/MyBooks'
import MyReviews from './Pages/MyReviews'
import Search from './Search'

// export function useSearchTerm() {
// return useOutletContext() as [string, (term: string) => void]
// }

export default function Layout() {
  // const searchTermState = useState('')
  return (
    <div className="app">
      <header>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="search/:search" element={<Search />} />
            <Route path="my-books" element={<MyBooks />} />
            <Route path="my-reviews" element={<MyReviews />} />
          </Route>
        </Routes>
      </header>
      <main></main>
      <footer></footer>
    </div>
  )
}
