import { Alert, Snackbar } from '@mui/material'
import { useState } from 'react'
import AddButton from '../../components/ui/add-button'
import { useDeleteTag, useGetAllTags } from '../../hooks/tags'
import TagTable from '../../components/tags/tag-table'

function Tags() {
  // Hooks and state
  const tags = useGetAllTags()
  const deleteTag = useDeleteTag()

  const [snackbarOpen, setSnackbarOpen] = useState(false)

  // Handlers and functions
  function handleDeleteTag(id: number) {
    deleteTag(id)
    setSnackbarOpen(true)
  }

  function handleSnackbarClose() {
    setSnackbarOpen(false)
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-center text-zinc-900 mt-8">
        My Tags
      </h1>
      {tags && tags.length > 0 && (
        <>
          <div className="flex justify-end max-w-5xl mx-auto items-center px-2 sm:px-4 mt-4">
            <AddButton href="/tags/add">Add Tag</AddButton>
          </div>
          <div className="max-w-5xl mx-auto py-4 sm:px-4">
            <TagTable tags={tags} handleDeleteTag={handleDeleteTag} />
          </div>
        </>
      )}

      {tags && tags.length === 0 && (
        <div className="max-w-5xl mx-auto py-4 sm:px-4">
          <div className="flex flex-col gap-4 items-center">
            <p className="text-zinc-800 text-center">No tags found.</p>
            <AddButton href="/tags/add">Add Tag</AddButton>
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
          Tag successfully deleted!
        </Alert>
      </Snackbar>
    </>
  )
}

export default Tags
