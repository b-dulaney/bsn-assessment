import { Category } from '../../types/types'
import {
  useDeleteLocalStorage,
  useFetchLocalStorage,
  useUpdateLocalStorage,
} from '../local-storage'

export function useGetAllCategories() {
  return useFetchLocalStorage<Category>('category')
}

export function useGetCategoryById(id: number) {
  const categories = useFetchLocalStorage<Category>('category')
  return categories.find((category) => category.id === id)
}

export function useAddCategory() {
  const categories = useFetchLocalStorage<Category>('category')
  const updateCategories = useUpdateLocalStorage<Category>('category')

  const id = categories.length
    ? Math.max(...categories.map((category) => category.id)) + 1
    : 1
  return (category: Category) => {
    if (
      categories.some(
        (existingCategory) => existingCategory.name === category.name
      )
    ) {
      throw new Error('Category name already exists')
    }
    category.id = id
    updateCategories([...categories, category])
  }
}

export function useUpdateCategory() {
  const categories = useFetchLocalStorage<Category>('category')
  const updateCategories = useUpdateLocalStorage<Category>('category')

  return (category: Category) => {
    if (categoryNameIsDuplicate(categories, category.name)) {
      throw new Error('Category name already exists')
    }
    const index = categories.findIndex((c) => c.id === category.id)
    categories[index] = category
    updateCategories([...categories])
  }
}

export function useDeleteCategory() {
  const deleteCategory = useDeleteLocalStorage<Category>('category')
  return (id: number) => {
    deleteCategory(id)
  }
}

const categoryNameIsDuplicate = (categories: Category[], name: string) =>
  categories.some(
    (category) => category.name.toLowerCase() === name.toLowerCase()
  )
