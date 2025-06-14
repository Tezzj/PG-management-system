'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetMeQuery } from '../redux/api/authApi';
import {
  setCredentials,
  clearCredentials,
  setLoading,
} from '../redux/features/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { data: user, isLoading, isError } = useGetMeQuery();

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoading(true));
    } else if (isError) {
      dispatch(clearCredentials());
    } else if (user) {
      dispatch(
        setCredentials({
          userId: user.userId,
          role: user.role,
        })
      );
    }
  }, [user, isLoading, isError, dispatch]);

  return { isLoading };
};
