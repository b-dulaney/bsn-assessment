import { useState, useEffect, useCallback } from 'react'
import { LocalStorageKey } from '../../types/types'

/**
 *
 * @param key The key of the data to fetch from local storage (Book, Category, or Tag)
 * @returns The data fetched from local storage
 */
function useFetchLocalStorage<T>(key: LocalStorageKey): T[] {
  const json = localStorage.getItem(key)
  const [data, setData] = useState<T[]>(JSON.parse(json || '[]'))

  useEffect(() => {
    const json = localStorage.getItem(key)

    if (json != null) {
      setData(JSON.parse(json))
    }

    // Event listener to listen for changes in local storage
    // and update the state accordingly
    const handleStorageChange = (e: Event) => {
      if (e.type === 'storage') {
        const newData = localStorage.getItem(key)

        if (newData != null) {
          setData(JSON.parse(newData))
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [key])

  return data
}

/**
 *
 * @param key The key of the data to update in local storage (Book, Category, or Tag)
 * @returns A function to update the data in local storage
 */
function useUpdateLocalStorage<T>(key: LocalStorageKey) {
  const updateData = useCallback(
    (data: T[]) => {
      const json = JSON.stringify(data)
      localStorage.setItem(key, json)
      window.dispatchEvent(new Event('storage'))
    },
    [key]
  )

  return updateData
}

/**
 *
 * @param key The key of the data to delete from local storage (Book, Category, or Tag)
 * @returns A function to delete an item from the data in local storage
 */
function useDeleteLocalStorage<T extends { id: number }>(key: LocalStorageKey) {
  const deleteData = useCallback(
    (id: number) => {
      const json = localStorage.getItem(key)
      if (json != null) {
        const data: T[] = JSON.parse(json)
        const newData = data.filter((item) => item.id !== id)
        localStorage.setItem(key, JSON.stringify(newData))
        window.dispatchEvent(new Event('storage'))
      }
    },
    [key]
  )

  return deleteData
}

export { useFetchLocalStorage, useUpdateLocalStorage, useDeleteLocalStorage }
