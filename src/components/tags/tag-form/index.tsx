import { TextField } from '@mui/material'
import { useState } from 'react'
import { Tag } from '../../../types/types'

interface TagFormProps {
  tag?: Tag
  onSubmit: (tag: Tag) => void
}

function TagForm({
  tag = {
    id: 0,
    name: '',
  },
  onSubmit,
}: TagFormProps) {
  const [formState, setFormState] = useState<Tag>(tag)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(formState)
  }

  return (
    <div className="w-full bg-white rounded-lg p-8 shadow-md">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <TextField
          label="Name"
          size="small"
          name="name"
          required
          value={formState.name}
          onChange={handleChange}
        />

        <div className="flex justify-end gap-4">
          <a
            role="button"
            href="/tags"
            className="bg-zinc-200 text-zinc-900 inline-flex text-center rounded-lg px-3 py-1.5 shadow-sm font-semibold hover:bg-zinc-300 transition-colors"
          >
            Cancel
          </a>
          <button
            type="submit"
            className="bg-sky-500 text-white inline-flex text-center rounded-lg px-3 py-1.5 shadow-sm font-semibold hover:bg-sky-600 transition-colors"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

export default TagForm
