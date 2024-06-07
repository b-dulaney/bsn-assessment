import { renderHook, act } from '@testing-library/react'
import {
  useGetAllCategories,
  useGetCategoryById,
  useAddCategory,
  useUpdateCategory,
} from './index'
import { Category } from '../../types/types'

describe('Categories hooks', () => {
  beforeEach(() => {
    localStorage.clear()
    localStorage.setItem(
      'category',
      JSON.stringify([{ id: 1, name: 'Test Category' }])
    )
  })
  test('useGetAllCategories returns all categories', () => {
    const { result } = renderHook(() => useGetAllCategories())
    expect(result.current.length).toEqual(1)
  })

  test('useGetCategoryById returns a category by id', () => {
    const { result } = renderHook(() => useGetCategoryById(1))
    expect(result.current).toEqual({ id: 1, name: 'Test Category' })
  })

  test('useAddCategory adds a category', () => {
    const { result } = renderHook(() => useAddCategory())
    act(() => {
      result.current({ id: 2, name: 'Test Category 2' } as Category)
    })
    const allCategories = renderHook(() => useGetAllCategories())
    expect(allCategories.result.current).toContainEqual({
      id: 2,
      name: 'Test Category 2',
    })
  })

  test('useAddCategory throws an error for duplicate names', () => {
    const { result } = renderHook(() => useAddCategory())
    try {
      act(() => {
        result.current({ id: 2, name: 'Test Category' } as Category)
      })
    } catch (err) {
      expect(err).toEqual(new Error('Category name already exists'))
    }
  })

  test('useUpdateCategory updates a category', () => {
    const { result } = renderHook(() => useUpdateCategory())
    act(() => {
      result.current({ id: 1, name: 'Updated Test Category' } as Category)
    })
    const updatedCategory = renderHook(() => useGetCategoryById(1))
    expect(updatedCategory.result.current).toEqual({
      id: 1,
      name: 'Updated Test Category',
    })
  })
})
