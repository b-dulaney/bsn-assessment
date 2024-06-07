import { Alert, Snackbar } from '@mui/material'
import { useEffect, useState } from 'react'
import AddBookButton from '../../components/books/add-book-button'
import BookTable from '../../components/books/book-table'
import { useDeleteBook, useGetAllBooks } from '../../hooks/books'
import { isBookDataInitialized, populateBookData } from './utils'

function Books() {
  // Hooks and state
  const books = useGetAllBooks()
  const deleteBook = useDeleteBook()

  const [snackbarOpen, setSnackbarOpen] = useState(false)

  // Populates book data from faker API only if it has not been previously initialized
  useEffect(() => {
    if (isBookDataInitialized(books)) {
      populateBooks()
    }

    async function populateBooks() {
      await populateBookData()
    }
  }, [books])

  // Handlers and functions
  function handleDeleteBook(id: number) {
    deleteBook(id)
    setSnackbarOpen(true)
  }

  function handleSnackbarClose() {
    setSnackbarOpen(false)
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-center text-zinc-900 mt-8">
        My Books
      </h1>
      <div className="flex justify-end max-w-5xl mx-auto items-center px-2 sm:px-4 mt-4">
        <AddBookButton />
      </div>
      <div className="max-w-5xl mx-auto py-4 sm:px-4">
        {books && books.length > 0 && (
          <BookTable books={books} handleDeleteBook={handleDeleteBook} />
        )}
        {books && books.length === 0 && (
          <div className="flex flex-col gap-4 items-center">
            <p className="text-white text-center">No books found.</p>
            <AddBookButton />
          </div>
        )}
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          Book successfully deleted!
        </Alert>
      </Snackbar>
    </>
  )
}

export default Books
