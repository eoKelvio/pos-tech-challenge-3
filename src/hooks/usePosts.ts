import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/api';
import type { Post, CreatePostPayload, UpdatePostPayload } from '../types/Posts';

interface UsePostsReturn {
  fetchActivePosts: () => ReturnType<typeof useQuery<Post[]>>;
  fetchAllPosts: () => ReturnType<typeof useQuery<Post[]>>;
  fetchPostById: (id: number) => ReturnType<typeof useQuery<Post>>;
  searchPosts: (title: string, enabled?: boolean) => ReturnType<typeof useQuery<Post[]>>;
  createPost: () => ReturnType<typeof useMutation<Post, Error, CreatePostPayload>>;
  updatePost: () => ReturnType<typeof useMutation<Post, Error, { id: number; data: UpdatePostPayload }>>;
  deletePost: (id: number) => Promise<void>;
}

export const usePosts = (): UsePostsReturn => {
  const queryClient = useQueryClient();

  const fetchActivePosts = () => {
    return useQuery({
      queryKey: ['posts', 'active'],
      queryFn: async () => {
        const response = await api.get<Post[]>('/posts');
        return response.data;
      },
    });
  };

  const fetchAllPosts = () => {
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

  const fetchPostById = (id: number) => {
    return useQuery({
      queryKey: ['posts', id],
      queryFn: async () => {
        const response = await api.get<Post>(`/posts/${id}`);
        return response.data;
      },
      enabled: !!id,
    });
  };

  const searchPosts = (title: string, enabled = true) => {
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

  const createPost = () => {
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

  const updatePost = () => {
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

  const deletePost = async (id: number) => {
    await api.delete(`/posts/${id}`);
    queryClient.invalidateQueries({ queryKey: ['posts'] });
  };

  return {
    fetchActivePosts,
    fetchAllPosts,
    fetchPostById,
    searchPosts,
    createPost,
    updatePost,
    deletePost,
  };
};
