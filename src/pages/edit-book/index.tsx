import { useLocation } from 'react-router-dom'
import { useGetBookById, useUpdateBook } from '../../hooks/books'
import BookForm from '../../components/books/book-form'
import { Alert, Snackbar } from '@mui/material'
import { useState } from 'react'
import { Book } from '../../types/types'
import { useNavigate } from 'react-router-dom'

function EditBook() {
  // Hooks and state
  const updateBook = useUpdateBook()
  const location = useLocation()
  const navigate = useNavigate()

  const { pathname } = location
  const id = parseInt(pathname.split('/').pop()!, 10)
  const book = useGetBookById(id)

  const [snackbarOpen, setSnackbarOpen] = useState(false)

  // Handlers and functions
  const handleSubmit = (book: Book) => {
    updateBook(book)
    setSnackbarOpen(true)
    setTimeout(() => {
      navigate('/')
    }, 1500)
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }

  return (
    <>
      <div className="flex flex-col items-center mt-8 mx-auto max-w-xl gap-8">
        <h1 className="text-2xl text-zinc-900 font-semibold">Edit Book</h1>
        <BookForm book={book} onSubmit={handleSubmit} />
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          Book updated successfully!
        </Alert>
      </Snackbar>
    </>
  )
}

export default EditBook
