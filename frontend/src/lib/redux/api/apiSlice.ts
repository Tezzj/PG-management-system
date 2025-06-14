import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '@/lib/constants/api';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: [
    'User',
    'Property',
    'Room',
    'Residency',
    'RentPayment',
    'UtilityBill',
    'Announcement',
    'MaintenanceRequest',
  ],
  endpoints: () => ({}),
});
