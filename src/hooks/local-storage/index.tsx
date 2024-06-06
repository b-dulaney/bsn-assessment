import { useState, useEffect, useCallback } from 'react'
import { LocalStorageKey } from '../../types/types'

/**
 *
 * @param key The key of the data to fetch from local storage (Book, Category, or Tag)
 * @returns The data fetched from local storage
 */
function useFetchLocalStorage<T>(key: LocalStorageKey): T | null {
  const [data, setData] = useState<T | null>(null)

  useEffect(() => {
    const json = localStorage.getItem(key)
    if (json != null) {
      setData(JSON.parse(json))
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
    (data: T) => {
      const json = JSON.stringify(data)
      localStorage.setItem(key, json)
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
function useDeleteLocalStorage<T extends { id: string }>(key: LocalStorageKey) {
  const deleteData = useCallback(
    (id: string) => {
      const json = localStorage.getItem(key)
      if (json != null) {
        const data: T[] = JSON.parse(json)
        const newData = data.filter((item) => item.id !== id)
        localStorage.setItem(key, JSON.stringify(newData))
      }
    },
    [key]
  )

  return deleteData
}

export { useFetchLocalStorage, useUpdateLocalStorage, useDeleteLocalStorage }
