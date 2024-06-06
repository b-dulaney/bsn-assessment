import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import Books from './pages/books/books.tsx'
import Categories from './pages/categories/categories.tsx'
import Tags from './pages/tags/tags.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'books', element: <Books />, children: [] },
      { path: 'tags', element: <Tags />, children: [] },
      { path: 'categories', element: <Categories />, children: [] },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </>
)
