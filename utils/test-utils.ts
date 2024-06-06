import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { JSX } from 'react/jsx-runtime'

export const renderWithRouter = (
  ui:
    | string
    | number
    | boolean
    | JSX.Element
    | Iterable<ReactNode>
    | null
    | undefined,
  { route = '/' } = {}
) => {
  window.history.pushState({}, 'Test page', route)

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: BrowserRouter }),
  }
}
