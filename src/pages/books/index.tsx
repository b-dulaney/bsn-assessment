import { Alert, Snackbar } from '@mui/material'
import { useEffect, useState } from 'react'
import AddButton from '../../components/ui/add-button'
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
      {books && books.length > 0 && (
        <>
          <div className="flex justify-end max-w-5xl mx-auto items-center px-2 sm:px-4 mt-4">
            <AddButton href="/books/add">Add Book</AddButton>
          </div>
          <div className="max-w-5xl mx-auto py-4 sm:px-4">
            <BookTable books={books} handleDeleteBook={handleDeleteBook} />
          </div>
        </>
      )}

      {books && books.length === 0 && (
        <div className="max-w-5xl mx-auto py-4 sm:px-4">
          <div className="flex flex-col gap-4 items-center">
            <p className="text-zinc-800 text-center">No books found.</p>
            <AddButton href="/books/add">Add Book</AddButton>
          </div>
        </div>
      )}
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
