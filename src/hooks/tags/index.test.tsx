import { renderHook, act } from '@testing-library/react'
import { useGetAllTags, useGetTagById, useAddTag, useUpdateTag } from './index'
import { Tag } from '../../types/types'

describe('Categories hooks', () => {
  beforeEach(() => {
    localStorage.clear()
    localStorage.setItem('tag', JSON.stringify([{ id: 1, name: 'Test Tag' }]))
  })
  test('useGetAllTags returns all tags', () => {
    const { result } = renderHook(() => useGetAllTags())
    expect(result.current.length).toEqual(1)
  })

  test('useGetTagById returns a tag by id', () => {
    const { result } = renderHook(() => useGetTagById(1))
    expect(result.current).toEqual({ id: 1, name: 'Test Tag' })
  })

  test('useAddTag adds a tag', () => {
    const { result } = renderHook(() => useAddTag())
    act(() => {
      result.current({ id: 2, name: 'Test Tag 2' } as Tag)
    })
    const allCategories = renderHook(() => useGetAllTags())
    expect(allCategories.result.current).toContainEqual({
      id: 2,
      name: 'Test Tag 2',
    })
  })

  test('useAddTag throws an error for duplicate names', () => {
    const { result } = renderHook(() => useAddTag())
    try {
      act(() => {
        result.current({ id: 2, name: 'Test Tag' } as Tag)
      })
    } catch (err) {
      expect(err).toEqual(new Error('Tag name already exists'))
    }
  })

  test('useUpdateTag updates a tag', () => {
    const { result } = renderHook(() => useUpdateTag())
    act(() => {
      result.current({ id: 1, name: 'Updated Test Tag' } as Tag)
    })
    const updatedTag = renderHook(() => useGetTagById(1))
    expect(updatedTag.result.current).toEqual({
      id: 1,
      name: 'Updated Test Tag',
    })
  })
})
