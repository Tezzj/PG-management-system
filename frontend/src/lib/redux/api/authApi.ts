import { apiSlice } from './apiSlice';
import type { LoginFormData } from '@/lib/types/auth';
import type { User } from '@/lib/types/user';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      { tokenPayload: { userId: string; role: string } },
      LoginFormData
    >({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getMe: builder.query<User, void>({
      query: () => 'users/me',
      providesTags: ['User'],
    }),
  }),
});

export const { useLoginMutation, useGetMeQuery } = authApi;
