import { useLocation } from 'react-router-dom'
import { useGetTagById, useUpdateTag } from '../../hooks/tags'
import TagForm from '../../components/tags/tag-form'
import { Alert, Snackbar } from '@mui/material'
import { useState } from 'react'
import { Tag } from '../../types/types'
import { useNavigate } from 'react-router-dom'

function EditTag() {
  // Hooks and state
  const updateTag = useUpdateTag()
  const location = useLocation()
  const navigate = useNavigate()

  const { pathname } = location
  const id = parseInt(pathname.split('/').pop()!, 10)
  const tag = useGetTagById(id)

  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false)

  // Handlers and functions
  const handleSubmit = (tag: Tag) => {
    try {
      updateTag(tag)
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
        <h1 className="text-2xl text-zinc-900 font-semibold">Edit Tag</h1>
        <TagForm tag={tag} onSubmit={handleSubmit} />
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          Tag updated successfully!
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

export default EditTag
