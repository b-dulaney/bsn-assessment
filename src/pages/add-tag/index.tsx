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

  // Handlers and functions
  const handleSubmit = (tag: Tag) => {
    addTag(tag)
    setSnackbarOpen(true)

    setTimeout(() => {
      navigate('/tags')
    }, 1500)
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
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
    </>
  )
}

export default AddTag
