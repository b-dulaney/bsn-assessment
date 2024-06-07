import { Book } from '../../types/types'

type FakerBookResponse = {
  id: number
  title: string
  author: string
  genre: string
  description: string
  isbn: string
  image: string
  published: string
  publisher: string
}

export const isBookDataInitialized = (books: Book[]) => {
  return books && books.length === 0 && !localStorage.getItem('book')
}

export async function populateBookData() {
  const books = await fetchMockBookData()
  const json = JSON.stringify(books)

  localStorage.setItem('book', json)
  window.dispatchEvent(new Event('storage'))
}

async function fetchMockBookData(): Promise<Book[]> {
  try {
    const response = await fetch(
      'https://fakerapi.it/api/v1/books?_quantity=20'
    )

    const { data } = (await response.json()) as { data: FakerBookResponse[] }

    return data.map((book) => ({
      id: book.id,
      title: book.title,
      author: book.author,
      genre: book.genre,
      rating: Math.floor(Math.random() * 5) + 1,
      categories: [],
      tags: [],
    }))
  } catch (error) {
    console.error(error)
    return []
  }
}
