import { Alert, Snackbar } from '@mui/material'
import { useState } from 'react'
import BookForm from '../../components/books/book-form'
import { useAddBook } from '../../hooks/books'
import { Book } from '../../types/types'
import { useNavigate } from 'react-router-dom'

function AddBook() {
  // Hooks and state
  const addBook = useAddBook()
  const navigate = useNavigate()

  const [snackbarOpen, setSnackbarOpen] = useState(false)

  // Handlers and functions
  const handleSubmit = (book: Book) => {
    addBook(book)
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
        <h1 className="text-2xl text-zinc-900 font-semibold">Add Book</h1>
        <BookForm onSubmit={handleSubmit} />
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          Book created successfully!
        </Alert>
      </Snackbar>
    </>
  )
}

export default AddBook
