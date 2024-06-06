import { renderHook, act } from '@testing-library/react'
import {
  useFetchLocalStorage,
  useUpdateLocalStorage,
  useDeleteLocalStorage,
} from './index'

describe('useFetchLocalStorage', () => {
  it('fetches data from local storage', () => {
    localStorage.setItem('book', JSON.stringify([{ id: '1', name: 'Book 1' }]))
    const { result } = renderHook(() => useFetchLocalStorage('book'))
    expect(result.current).toEqual([{ id: '1', name: 'Book 1' }])
  })
})

describe('useUpdateLocalStorage', () => {
  it('updates data in local storage', () => {
    const { result } = renderHook(() => useUpdateLocalStorage('book'))
    act(() => {
      result.current([{ id: '1', name: 'Book 1' }])
    })
    expect(JSON.parse(localStorage.getItem('book')!)).toEqual([
      { id: '1', name: 'Book 1' },
    ])
  })
})

describe('useDeleteLocalStorage', () => {
  it('deletes an item from data in local storage', () => {
    localStorage.setItem(
      'book',
      JSON.stringify([
        { id: '1', name: 'Book 1' },
        { id: '2', name: 'Book 2' },
      ])
    )
    const { result } = renderHook(() => useDeleteLocalStorage('book'))
    act(() => {
      result.current('1')
    })
    expect(JSON.parse(localStorage.getItem('book')!)).toEqual([
      { id: '2', name: 'Book 2' },
    ])
  })
})
