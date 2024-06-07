import { Alert, Snackbar } from '@mui/material'
import { useState } from 'react'
import TagForm from '../../components/tags/tag-form'
import { useAddTag } from '../../hooks/tags'
import { Tag } from '../../types/types'
import { useNavigate } from 'react-router-dom'

function AddTag() {
  // Hooks and state
  const addTag = useAddTag()
  const navigate = useNavigate()

  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false)

  // Handlers and functions
  const handleSubmit = (tag: Tag) => {
    try {
      addTag(tag)
      setSnackbarOpen(true)

      setTimeout(() => {
        navigate('/tags')
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
        <h1 className="text-2xl text-zinc-900 font-semibold">Add Tag</h1>
        <TagForm onSubmit={handleSubmit} />
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          Tag created successfully!
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={errorSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleErrorSnackbarClose}
      >
        <Alert onClose={handleErrorSnackbarClose} severity="error">
          A tag with this name already exists. Choose a different name.
        </Alert>
      </Snackbar>
    </>
  )
}

export default AddTag
