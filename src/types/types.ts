export type Book = {
  id: number
  title: string
  author: string
  genre: string
  rating: number
  categories: Category[]
  tags: Tag[]
}

export type Category = {
  id: number
  name: string
}

export type Tag = {
  id: number
  name: string
}

export type LocalStorageKey = 'book' | 'category' | 'tag'
