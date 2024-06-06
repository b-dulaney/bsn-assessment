// const pages = ['Books', 'Tags', 'Categories']
import { useLocation } from 'react-router-dom'
import NavLink from './nav-link/nav-link'

function Navbar() {
  const location = useLocation()
  const { pathname } = location

  return (
    <nav className="absolute top-0 w-full bg-zinc-800">
      <div className="grid grid-cols-2 p-4 max-w-7xl mx-auto items-center">
        <h1 className="inline-block text-2xl">
          <span className="font-extrabold inline-block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-500">
            Bookly
          </span>
        </h1>
        <div className="flex justify-end gap-4 md:gap-8">
          <NavLink path="/books" active={pathname.includes('/books')}>
            Books
          </NavLink>
          <NavLink path="/tags" active={pathname.includes('/tags')}>
            Tags
          </NavLink>
          <NavLink path="/categories" active={pathname.includes('/categories')}>
            Categories
          </NavLink>
        </div>
      </div>
    </nav>
  )
}
export default Navbar
