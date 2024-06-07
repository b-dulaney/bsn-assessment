import { useLocation } from 'react-router-dom'
import { useGetCategoryById, useUpdateCategory } from '../../hooks/categories'
import CategoryForm from '../../components/categories/category-form'
import { Alert, Snackbar } from '@mui/material'
import { useState } from 'react'
import { Category } from '../../types/types'
import { useNavigate } from 'react-router-dom'

function EditCategory() {
  // Hooks and state
  const updateCategory = useUpdateCategory()
  const location = useLocation()
  const navigate = useNavigate()

  const { pathname } = location
  const id = parseInt(pathname.split('/').pop()!, 10)
  const category = useGetCategoryById(id)

  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false)

  // Handlers and functions
  const handleSubmit = (category: Category) => {
    try {
      updateCategory(category)
      setSnackbarOpen(true)
      setTimeout(() => {
        navigate('/categories')
      }, 1500)
    } catch (error) {
      setErrorSnackbarOpen(true)
    }
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }

  function handleErrorSnackbarClose() {
    setErrorSnackbarOpen(false)
  }

  return (
    <>
      <div className="flex flex-col items-center mt-8 mx-auto max-w-xl gap-8">
        <h1 className="text-2xl text-zinc-900 font-semibold">Edit Category</h1>
        <CategoryForm category={category} onSubmit={handleSubmit} />
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          Category updated successfully!
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={errorSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleErrorSnackbarClose}
      >
        <Alert onClose={handleErrorSnackbarClose} severity="error">
          A category with this name already exists. Choose a different name.
        </Alert>
      </Snackbar>
    </>
  )
}

export default EditCategory
