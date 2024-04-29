import MyBooks from './Pages/MyBooks.tsx'
import NavBar from './NavBar.tsx'
import { Outlet, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home.tsx'
import Search from './Search.tsx'

function App() {
  return (
    <>
      <div className="app">
        <Outlet />
      </div>
    </>
  )
}

export default App
