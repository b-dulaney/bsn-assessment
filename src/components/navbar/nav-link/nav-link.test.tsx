import { screen } from '@testing-library/react'
import { renderWithRouter } from '../../../../utils/test-utils'
import NavLink from './nav-link'

describe('NavLink', () => {
  it('renders the link with the correct href', () => {
    renderWithRouter(
      <NavLink path="/books" active={false}>
        Books
      </NavLink>
    )
    const linkElement = screen.getByText('Books')
    expect(linkElement).toBeInTheDocument()
    expect(linkElement).toHaveAttribute('href', '/books')
  })

  it('applies the correct color class when active', () => {
    renderWithRouter(
      <NavLink path="/books" active={true}>
        Books
      </NavLink>
    )
    const linkElement = screen.getByText('Books')
    expect(linkElement).toHaveClass('text-pink-500')
  })

  it('applies the correct color class when not active', () => {
    renderWithRouter(
      <NavLink path="/books" active={false}>
        Books
      </NavLink>
    )
    const linkElement = screen.getByText('Books')
    expect(linkElement).toHaveClass('text-zinc-900')
  })
})
