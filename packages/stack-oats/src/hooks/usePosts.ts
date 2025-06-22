import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { client } from '../api'

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await client.GET('/api/posts')
      if (!response.data) throw new Error('Failed to fetch posts')
      return response.data
    }
  })
}

export function usePost(id: string) {
  return useQuery({
    queryKey: ['posts', id],
    queryFn: async () => {
      const response = await client.GET('/api/posts/{id}', {
        params: { path: { id } }
      })
      if (!response.data) throw new Error('Failed to fetch post')
      return response.data
    }
  })
}

export function useCreatePost() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await client.POST('/api/posts', {
        body: data
      })
      if (!response.data) throw new Error('Failed to create post')
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    }
  })
}

export function useUpdatePost() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await client.PUT('/api/posts/{id}', {
        params: { path: { id } },
        body: data
      })
      if (!response.data) throw new Error('Failed to update post')
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    }
  })
}

export function useDeletePost() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await client.DELETE('/api/posts/{id}', {
        params: { path: { id } }
      })
      if (response.error) throw new Error('Failed to delete post')
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    }
  })
}