import { Alert, Snackbar } from '@mui/material'
import { useState } from 'react'
import AddButton from '../../components/ui/add-button'
import { useDeleteCategory, useGetAllCategories } from '../../hooks/categories'
import CategoryTable from '../../components/categories/category-table'

function Categories() {
  // Hooks and state
  const categories = useGetAllCategories()
  const deleteCategory = useDeleteCategory()

  const [snackbarOpen, setSnackbarOpen] = useState(false)

  // Handlers and functions
  function handleDeleteCategory(id: number) {
    deleteCategory(id)
    setSnackbarOpen(true)
  }

  function handleSnackbarClose() {
    setSnackbarOpen(false)
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
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          Category successfully deleted!
        </Alert>
      </Snackbar>
    </>
  )
}

export default Categories
