import MyBooks from './Pages/MyBooks.tsx'
import NavBar from './NavBar.tsx'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home.tsx'
import Search from './Search.tsx'

function App() {
  return (
    <>
      <div className="app">
        <NavBar />
        {/* <Routes>
          <Route path="/" element={<Home />}>
            <Route path="search/:search" element={<Search />} />
            <Route path="my-books" element={<MyBooks />} />
            <Route path="my-reviews" element={<MyReviews />} />
          </Route>
        </Routes> */}
      </div>
    </>
  )
}

export default App
