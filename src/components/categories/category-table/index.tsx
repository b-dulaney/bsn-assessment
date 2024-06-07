import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowsProp,
} from '@mui/x-data-grid'
import { Category } from '../../../types/types'

interface CategoryTableProps {
  categories: Category[]
  handleDeleteCategory: (id: number) => void
}

function CategoryTable({
  categories,
  handleDeleteCategory,
}: CategoryTableProps) {
  const rows: GridRowsProp = categories

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      renderCell: (params: GridRenderCellParams<Category, string>) => (
        <a
          className="text-sky-600 hover:text-sky-700 hover:underline"
          href={`/categories/${params.id}`}
        >
          {params.value}
        </a>
      ),
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params: GridRenderCellParams<Category, number>) => (
        <div className="flex gap-2">
          <a
            href={`/categories/${params.row.id}`}
            className="text-sky-600 hover:text-sky-700 hover:underline"
          >
            Edit
          </a>
          <button
            title="Delete category"
            onClick={() => handleDeleteCategory(params.row.id)}
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

export default CategoryTable
