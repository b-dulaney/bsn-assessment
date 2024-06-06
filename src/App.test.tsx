import { render, screen } from '@testing-library/react'
import App from './App'

describe('App tests', () => {
  test('renders App component', async () => {
    render(<App />)
    expect(screen.getByText('Vite + React')).toBeInTheDocument()
  })
})