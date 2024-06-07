// const pages = ['Books', 'Tags', 'Categories']
import { useLocation } from 'react-router-dom'
import NavLink from './nav-link/nav-link'

function Navbar() {
  const location = useLocation()
  const { pathname } = location

  return (
    <nav className="w-full bg-white border-b border-b-zinc-200">
      <div className="grid grid-cols-2 max-w-7xl mx-auto items-center">
        <a href="/">
          <h1 className="inline-block text-3xl p-4">
            <span className="font-extrabold inline-block text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-500">
              Bookly
            </span>
          </h1>
        </a>

        <div className="flex justify-end p-4 gap-4 md:gap-8">
          <NavLink
            path="/"
            active={pathname === '/' || pathname.includes('books')}
          >
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
