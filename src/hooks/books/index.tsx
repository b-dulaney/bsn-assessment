import { Book } from '../../types/types'
import {
  useDeleteLocalStorage,
  useFetchLocalStorage,
  useUpdateLocalStorage,
} from '../local-storage'

export function useGetAllBooks() {
  return useFetchLocalStorage<Book>('book')
}

export function useGetBookById(id: number) {
  const books = useFetchLocalStorage<Book>('book')
  return books.find((book) => book.id === id)
}

export function useAddBook() {
  const books = useFetchLocalStorage<Book>('book')
  const updateBooks = useUpdateLocalStorage<Book>('book')

  const id = books.length ? Math.max(...books.map((book) => book.id)) + 1 : 1
  return (book: Book) => {
    book.id = id
    updateBooks([...books, book])
  }
}

export function useUpdateBook() {
  const books = useFetchLocalStorage<Book>('book')
  const updateBooks = useUpdateLocalStorage<Book>('book')

  return (book: Book) => {
    const index = books.findIndex((b) => b.id === book.id)
    books[index] = book
    updateBooks([...books])
  }
}

export function useDeleteBook() {
  const deleteBook = useDeleteLocalStorage<Book>('book')
  return (id: number) => {
    deleteBook(id)
  }
}
