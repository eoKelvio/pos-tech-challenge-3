import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/api';
import type { Post, CreatePostPayload, UpdatePostPayload } from '../types/Posts';

export const useFetchActivePosts = () => {
  return useQuery({
    queryKey: ['posts', 'active'],
    queryFn: async () => {
      const response = await api.get<Post[]>('/posts');
      return response.data;
    },
  });
};

export const useFetchAllPosts = () => {
  const hasToken = !!localStorage.getItem('access_token');
  return useQuery({
    queryKey: ['posts', 'all'],
    queryFn: async () => {
      const response = await api.get<Post[]>('/posts/all');
      return response.data;
    },
    enabled: hasToken,
  });
};

export const useFetchPostById = (id: number) => {
  return useQuery({
    queryKey: ['posts', id],
    queryFn: async () => {
      const response = await api.get<Post>(`/posts/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useSearchPosts = (title: string, enabled = true) => {
  return useQuery({
    queryKey: ['posts', 'search', title],
    queryFn: async () => {
      const response = await api.get<Post[]>(`/posts/search`, {
        params: { title },
      });
      return response.data;
    },
    enabled: enabled && !!title,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreatePostPayload) => {
      const response = await api.post<Post>('/posts', payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: UpdatePostPayload }) => {
      const response = await api.put<Post>(`/posts/${id}`, data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.setQueryData(['posts', data.id], data);
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/posts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};
