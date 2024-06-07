import { Alert, Snackbar } from '@mui/material'
import { useState } from 'react'
import CategoryForm from '../../components/categories/category-form'
import { useAddCategory } from '../../hooks/categories'
import { Category } from '../../types/types'
import { useNavigate } from 'react-router-dom'

function AddCategory() {
  // Hooks and state
  const addCategory = useAddCategory()
  const navigate = useNavigate()

  const [snackbarOpen, setSnackbarOpen] = useState(false)

  // Handlers and functions
  const handleSubmit = (category: Category) => {
    addCategory(category)
    setSnackbarOpen(true)

    setTimeout(() => {
      navigate('/categories')
    }, 1500)
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }

  return (
    <>
      <div className="flex flex-col items-center mt-8 mx-auto max-w-xl gap-8">
        <h1 className="text-2xl text-zinc-900 font-semibold">Add Category</h1>
        <CategoryForm onSubmit={handleSubmit} />
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          Category created successfully!
        </Alert>
      </Snackbar>
    </>
  )
}

export default AddCategory
