import Search from './Search'
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <>
      <div className="mx-4 mt-4 flex space-x-4">
        <div>
          <img
            src="../../Public/bookbound.png"
            alt="bookbound logo"
            style={{ height: '125px' }}
          />
        </div>
        <div className="mt-8 space-x-4">
          <Link to="/">
            <button className="rounded-full bg-yellow-600 px-12 py-4 text-xl text-xl font-bold text-white hover:bg-yellow-700 md:px-12 md:py-4">
              Home
            </button>
          </Link>
          <Link to="my-books">
            <button className="rounded-full bg-yellow-600 px-12 py-4 text-xl font-bold text-white hover:bg-yellow-700 md:px-12 md:py-4">
              My Books
            </button>
          </Link>
          <Link to="my-reviews">
            <button className="rounded-full bg-yellow-600 px-12 py-4 text-xl font-bold text-white hover:bg-yellow-700 md:px-12 md:py-4">
              My Reviews
            </button>
          </Link>
        </div>
        <div className="mt-8 space-x-4">
          <Search />
        </div>
      </div>
    </>
  )
}
