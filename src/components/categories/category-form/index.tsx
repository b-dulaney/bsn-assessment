import { TextField } from '@mui/material'
import { useState } from 'react'
import { Category } from '../../../types/types'

interface CategoryFormProps {
  category?: Category
  onSubmit: (category: Category) => void
}

function CategoryForm({
  category = {
    id: 0,
    name: '',
  },
  onSubmit,
}: CategoryFormProps) {
  const [formState, setFormState] = useState<Category>(category)

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
            href="/"
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

export default CategoryForm
