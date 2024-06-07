import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material'
import { useState } from 'react'
import { useFetchLocalStorage } from '../../../hooks/local-storage'
import { Book, Category, Tag } from '../../../types/types'

interface BookFormProps {
  book?: Book
  onSubmit: (book: Book) => void
}

function BookForm({
  book = {
    id: 0,
    title: '',
    author: '',
    genre: '',
    rating: 0,
    categories: [],
    tags: [],
  },
  onSubmit,
}: BookFormProps) {
  const tags = useFetchLocalStorage<Tag>('tag')
  const categories = useFetchLocalStorage<Category>('category')

  const [formState, setFormState] = useState<Book>(book)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSelectChange = (
    e: SelectChangeEvent<typeof formState.categories | typeof formState.tags>
  ) => {
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
          label="Title"
          size="small"
          name="title"
          required
          value={formState.title}
          onChange={handleChange}
        />
        <TextField
          label="Author"
          size="small"
          name="author"
          required
          value={formState.author}
          onChange={handleChange}
        />
        <TextField
          label="Genre"
          size="small"
          name="genre"
          required
          value={formState.genre}
          onChange={handleChange}
        />
        <TextField
          label="Rating"
          size="small"
          name="rating"
          type="number"
          required
          inputProps={{ min: 0, max: 5 }}
          value={formState.rating}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFormState({
              ...formState,
              rating: e.target.valueAsNumber,
            })
          }}
        />
        <FormControl sx={{ width: 300 }} size="small">
          <InputLabel id="tag-select-label">Tags</InputLabel>
          <Select
            labelId="tag-select-label"
            id="tag-select"
            multiple
            label="Tags"
            value={formState.tags}
            onChange={handleSelectChange}
            input={<OutlinedInput label="Tags" name="tags" />}
          >
            {tags.length ? (
              tags.map((tag) => (
                <MenuItem key={tag.id} value={tag.id}>
                  {tag.name}
                </MenuItem>
              ))
            ) : (
              <p className="p-2">No tags found.</p>
            )}
          </Select>
        </FormControl>
        <FormControl sx={{ width: 300 }} size="small">
          <InputLabel id="category-select-label">Categories</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            multiple
            label="Categories"
            value={formState.categories}
            onChange={handleSelectChange}
            input={<OutlinedInput label="Categories" name="categories" />}
          >
            {categories.length ? (
              categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))
            ) : (
              <p className="p-2">No categories found.</p>
            )}
          </Select>
        </FormControl>
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

export default BookForm
