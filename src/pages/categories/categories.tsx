import { Alert, Snackbar } from '@mui/material'
import { useState } from 'react'
import AddButton from '../../components/ui/add-button'
import { useDeleteCategory, useGetAllCategories } from '../../hooks/categories'
import CategoryTable from '../../components/categories/category-table'
import { useGetAllBooks } from '../../hooks/books'

function Categories() {
  // Hooks and state
  const categories = useGetAllCategories()
  const books = useGetAllBooks()
  const deleteCategory = useDeleteCategory()

  const [deleteSnackbarOpen, setDeleteSnackbarOpen] = useState(false)
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false)

  // Handlers and functions
  const canDeleteCategory = (id: number) =>
    books.every((book) => !book.categories.includes(id))

  function handleDeleteCategory(id: number) {
    if (canDeleteCategory(id)) {
      deleteCategory(id)
      setErrorSnackbarOpen(true)
    } else {
      setErrorSnackbarOpen(true)
    }
  }

  function handleDeleteSnackbarClose() {
    setDeleteSnackbarOpen(false)
  }

  function handleErrorSnackbarClose() {
    setErrorSnackbarOpen(false)
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-center text-zinc-900 mt-8">
        My Categories
      </h1>
      {categories && categories.length > 0 && (
        <>
          <div className="flex justify-end max-w-5xl mx-auto items-center px-2 sm:px-4 mt-4">
            <AddButton href="/categories/add">Add Category</AddButton>
          </div>
          <div className="max-w-5xl mx-auto py-4 sm:px-4">
            <CategoryTable
              categories={categories}
              handleDeleteCategory={handleDeleteCategory}
            />
          </div>
        </>
      )}

      {categories && categories.length === 0 && (
        <div className="max-w-5xl mx-auto py-4 sm:px-4">
          <div className="flex flex-col gap-4 items-center">
            <p className="text-zinc-800 text-center">No categories found.</p>
            <AddButton href="/categories/add">Add Category</AddButton>
          </div>
        </div>
      )}
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={deleteSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleDeleteSnackbarClose}
      >
        <Alert onClose={handleDeleteSnackbarClose} severity="success">
          Category successfully deleted!
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={errorSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleErrorSnackbarClose}
      >
        <Alert onClose={handleErrorSnackbarClose} severity="error">
          Category is associated with one or more books and cannot be deleted.
        </Alert>
      </Snackbar>
    </>
  )
}

export default Categories
