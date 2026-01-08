import { useMutation, useQuery } from '@tanstack/react-query';
import api from '../api/api';
import type { SignUpPayload, SignInPayload, SignInResponse, MeResponse, User } from '../types/Users';

export const useSignUp = () => {
  return useMutation({
    mutationFn: async (payload: SignUpPayload) => {
      const response = await api.post<User>('/auth/signup', payload);
      return response.data;
    },
  });
};

export const useSignIn = () => {
  return useMutation({
    mutationFn: async (payload: SignInPayload) => {
      const response = await api.post<SignInResponse>('/auth/signin', payload);
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem('access_token', data.accessToken);
    },
  });
};

export const useFetchMe = () => {
  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      const response = await api.get<MeResponse>('/auth/me');
      return response.data;
    },
    enabled: !!localStorage.getItem('access_token'),
  });
};
