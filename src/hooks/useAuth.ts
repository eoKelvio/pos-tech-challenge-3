import { useMutation, useQuery } from '@tanstack/react-query';
import api from '../api/api';
import type { SignUpPayload, SignInPayload, SignInResponse, MeResponse, User } from '../types/Users';

interface UseAuthReturn {
  signUp: () => ReturnType<typeof useMutation<User, Error, SignUpPayload>>;
  signIn: () => ReturnType<typeof useMutation<SignInResponse, Error, SignInPayload>>;
  fetchMe: () => ReturnType<typeof useQuery<MeResponse>>;
}

export const useAuth = (): UseAuthReturn => {

  const signUp = () => {
    return useMutation({
      mutationFn: async (payload: SignUpPayload) => {
        const response = await api.post<User>('/auth/signup', payload);
        return response.data;
      },
    });
  };

  const signIn = () => {
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

  const fetchMe = () => {
    return useQuery({
      queryKey: ['auth', 'me'],
      queryFn: async () => {
        const response = await api.get<MeResponse>('/auth/me');
        return response.data;
      },
      enabled: !!localStorage.getItem('access_token'),
    });
  };

  return {
    signUp,
    signIn,
    fetchMe,
  };
};
