import { screen } from '@testing-library/react'
import { renderWithRouter } from '../utils/test-utils'

import App from './App'

describe('App tests', () => {
  test('renders App component', async () => {
    renderWithRouter(<App />)
    expect(screen.getByText('Bookly')).toBeInTheDocument()
  })
})
