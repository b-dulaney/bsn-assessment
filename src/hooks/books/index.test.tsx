import { renderHook, act } from '@testing-library/react'
import {
  useGetAllBooks,
  useGetBookById,
  useAddBook,
  useUpdateBook,
  useDeleteBook,
} from './index'

describe('Books hooks', () => {
  beforeEach(() => {
    localStorage.clear()
    localStorage.setItem('book', JSON.stringify([{ id: 1, name: 'Book 1' }]))
  })
  test('useGetAllBooks returns all books', () => {
    const { result } = renderHook(() => useGetAllBooks())
    expect(result.current.length).toEqual(1)
  })

  test('useGetBookById returns a book by id', () => {
    const { result } = renderHook(() => useGetBookById(1))
    expect(result.current).toEqual({ id: 1, name: 'Book 1' })
  })

  test('useAddBook adds a book', () => {
    const { result } = renderHook(() => useAddBook())
    act(() => {
      result.current({
        id: 2,
        title: 'Test Book',
        author: 'Test Author',
        genre: 'Test Genre',
        rating: 5,
        categories: [],
        tags: [],
      })
    })
    const allBooks = renderHook(() => useGetAllBooks())
    expect(allBooks.result.current.length).toEqual(2)
  })

  test('useUpdateBook updates a book', () => {
    const { result } = renderHook(() => useUpdateBook())
    act(() => {
      result.current({
        id: 1,
        title: 'Updated Test Book',
        author: 'Test Author',
        genre: 'Test Genre',
        rating: 5,
        categories: [],
        tags: [],
      })
    })
    const updatedBook = renderHook(() => useGetBookById(1))
    expect(updatedBook.result.current).toEqual({
      id: 1,
      title: 'Updated Test Book',
      author: 'Test Author',
      genre: 'Test Genre',
      rating: 5,
      categories: [],
      tags: [],
    })
  })

  test('useDeleteBook deletes a book', () => {
    const { result } = renderHook(() => useDeleteBook())
    act(() => {
      result.current(1)
    })
    const deletedBook = renderHook(() => useGetBookById(1))
    expect(deletedBook.result.current).toBeUndefined()
  })
})
