import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import Books from './pages/books'
import Categories from './pages/categories/categories.tsx'
import EditBook from './pages/edit-book/index.tsx'
import Tags from './pages/tags/tags.tsx'
import AddBook from './pages/add-book/index.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Books />,
      },
      { path: 'books/:id', element: <EditBook /> },
      { path: 'books/add', element: <AddBook /> },
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
