import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowsProp,
} from '@mui/x-data-grid'
import { Book } from '../../../types/types'
import BookRating from '../book-rating'
import { useGetAllCategories } from '../../../hooks/categories'
import { useGetAllTags } from '../../../hooks/tags'

interface BookTableProps {
  books: Book[]
  handleDeleteBook: (id: number) => void
}

function BookTable({ books, handleDeleteBook }: BookTableProps) {
  const rows: GridRowsProp = books

  const categories = useGetAllCategories()
  const tags = useGetAllTags()

  const columns: GridColDef[] = [
    {
      field: 'title',
      headerName: 'Title',
      flex: 1,
      renderCell: (params: GridRenderCellParams<Book, string>) => (
        <a
          className="text-sky-600 hover:text-sky-700 hover:underline"
          href={`/books/${params.id}`}
        >
          {params.value}
        </a>
      ),
    },
    {
      field: 'author',
      headerName: 'Author',
      flex: 1,
    },
    {
      field: 'genre',
      headerName: 'Genre',
      flex: 1,
    },
    {
      field: 'rating',
      flex: 1,
      headerName: 'Rating',
      renderCell: (params: GridRenderCellParams<Book, number>) => (
        <div className="inline-flex items-center">
          <BookRating rating={params.value!} />
        </div>
      ),
    },
    {
      field: 'tags',
      headerName: 'Tags',
      flex: 1,
      renderCell: (params: GridRenderCellParams<Book, number[]>) => (
        <div className="inline-flex gap-1 items-center">
          {params.value?.map((tag) => {
            const tagData = tags.find((t) => t.id === tag)!
            return (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs"
              >
                {tagData.name}
              </span>
            )
          })}
        </div>
      ),
    },
    {
      field: 'categories',
      headerName: 'Categories',
      flex: 1,
      renderCell: (params: GridRenderCellParams<Book, number[]>) => (
        <div className="inline-flex gap-1 items-center">
          {params.value?.map((category) => {
            const categoryData = categories.find((c) => c.id === category)!
            return (
              <span
                key={category}
                className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs"
              >
                {categoryData.name}
              </span>
            )
          })}
        </div>
      ),
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params: GridRenderCellParams<Book, number>) => (
        <div className="flex gap-2">
          <a
            href={`/books/${params.row.id}`}
            className="text-sky-600 hover:text-sky-700 hover:underline"
          >
            Edit
          </a>
          <button
            title="Delete book"
            onClick={() => handleDeleteBook(params.row.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5 ms-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      ),
    },
  ]

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 10,
          },
        },
      }}
      pageSizeOptions={[5, 10, 20]}
      disableRowSelectionOnClick
    />
  )
}

export default BookTable
