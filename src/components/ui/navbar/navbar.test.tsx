import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Navbar from './navbar'

describe('Navbar', () => {
  it('renders the correct active link', () => {
    render(
      <MemoryRouter initialEntries={['/tags']}>
        <Navbar />
        <Routes>
          <Route path="/tags">Tags Page</Route>
        </Routes>
      </MemoryRouter>
    )
    const activeLinkElement = screen.getByText('Tags')
    expect(activeLinkElement).toHaveClass('text-sky-500')
  })

  it('renders the correct non-active links', () => {
    render(
      <MemoryRouter initialEntries={['/tags']}>
        <Navbar />
        <Routes>
          <Route path="/tags">Tags Page</Route>
        </Routes>
      </MemoryRouter>
    )
    const nonActiveLinkElement = screen.getByText('Books')
    expect(nonActiveLinkElement).toHaveClass('text-zinc-900')
  })
})
