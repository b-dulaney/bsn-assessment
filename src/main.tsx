import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import Books from './pages/books'
import Categories from './pages/categories/categories.tsx'
import Tags from './pages/tags/tags.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Books /> },
      { path: 'tags', element: <Tags /> },
      { path: 'categories', element: <Categories /> },
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
