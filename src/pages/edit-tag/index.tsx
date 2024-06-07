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

  // Handlers and functions
  const handleSubmit = (tag: Tag) => {
    updateTag(tag)
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
    </>
  )
}

export default EditTag
