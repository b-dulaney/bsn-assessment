import { Tag } from '../../types/types'
import {
  useDeleteLocalStorage,
  useFetchLocalStorage,
  useUpdateLocalStorage,
} from '../local-storage'

export function useGetAllTags() {
  return useFetchLocalStorage<Tag>('tag')
}

export function useGetTagById(id: number) {
  const tags = useFetchLocalStorage<Tag>('tag')
  return tags.find((tag) => tag.id === id)
}

export function useAddTag() {
  const tags = useFetchLocalStorage<Tag>('tag')
  const updateTags = useUpdateLocalStorage<Tag>('tag')

  const id = tags.length ? Math.max(...tags.map((tag) => tag.id)) + 1 : 1
  return (tag: Tag) => {
    if (tags.some((existingTag) => existingTag.name === tag.name)) {
      throw new Error('Tag name already exists')
    }
    tag.id = id
    updateTags([...tags, tag])
  }
}

export function useUpdateTag() {
  const tags = useFetchLocalStorage<Tag>('tag')
  const updateTags = useUpdateLocalStorage<Tag>('tag')

  return (tag: Tag) => {
    if (tagNameIsDuplicate(tags, tag.name)) {
      throw new Error('Tag name already exists')
    }
    const index = tags.findIndex((t) => t.id === tag.id)
    tags[index] = tag
    updateTags([...tags])
  }
}

export function useDeleteTag() {
  const deleteTag = useDeleteLocalStorage<Tag>('tag')
  return (id: number) => {
    deleteTag(id)
  }
}

const tagNameIsDuplicate = (tags: Tag[], name: string) =>
  tags.some((tag) => tag.name.toLowerCase() === name.toLowerCase())
