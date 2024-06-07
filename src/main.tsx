import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import Books from './pages/books'
import Categories from './pages/categories/categories.tsx'
import EditBook from './pages/edit-book'
import Tags from './pages/tags'
import AddBook from './pages/add-book'
import AddTag from './pages/add-tag'
import EditTag from './pages/edit-tag'
import EditCategory from './pages/edit-category/index.tsx'
import AddCategory from './pages/add-category/index.tsx'

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
      { path: 'tags/:id', element: <EditTag /> },
      { path: 'tags/add', element: <AddTag /> },
      { path: 'categories', element: <Categories /> },
      { path: 'categories/:id', element: <EditCategory /> },
      { path: 'categories/add', element: <AddCategory /> },
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
