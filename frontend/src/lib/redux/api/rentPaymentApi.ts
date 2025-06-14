import { apiSlice } from './apiSlice';
import type {
  RentPayment,
  CreateRentPaymentRequest,
  UpdateRentPaymentRequest,
} from '@/lib/types/payment';

export const rentPaymentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRentPayments: builder.query<RentPayment[], string>({
      query: (userId) => `users/${userId}/rent-payments`,
      providesTags: (result, error, userId) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'RentPayment' as const, id })),
              { type: 'RentPayment', id: `LIST-${userId}` },
            ]
          : [{ type: 'RentPayment', id: `LIST-${userId}` }],
    }),
    getRentPayment: builder.query<
      RentPayment,
      { userId: string; paymentId: string }
    >({
      query: ({ userId, paymentId }) =>
        `users/${userId}/rent-payments/${paymentId}`,
      providesTags: (result, error, { paymentId }) => [
        { type: 'RentPayment', id: paymentId },
      ],
    }),
    createRentPayment: builder.mutation<
      RentPayment,
      { userId: string; payment: CreateRentPaymentRequest }
    >({
      query: ({ userId, payment }) => ({
        url: `users/${userId}/rent-payments`,
        method: 'POST',
        body: payment,
      }),
      invalidatesTags: (result, error, { userId }) => [
        { type: 'RentPayment', id: `LIST-${userId}` },
      ],
    }),
    updateRentPayment: builder.mutation<
      RentPayment,
      { userId: string; paymentId: string; payment: UpdateRentPaymentRequest }
    >({
      query: ({ userId, paymentId, payment }) => ({
        url: `users/${userId}/rent-payments/${paymentId}`,
        method: 'PUT',
        body: payment,
      }),
      invalidatesTags: (result, error, { paymentId }) => [
        { type: 'RentPayment', id: paymentId },
      ],
    }),
    deleteRentPayment: builder.mutation<
      void,
      { userId: string; paymentId: string }
    >({
      query: ({ userId, paymentId }) => ({
        url: `users/${userId}/rent-payments/${paymentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { userId, paymentId }) => [
        { type: 'RentPayment', id: paymentId },
        { type: 'RentPayment', id: `LIST-${userId}` },
      ],
    }),
  }),
});

export const {
  useGetRentPaymentsQuery,
  useGetRentPaymentQuery,
  useCreateRentPaymentMutation,
  useUpdateRentPaymentMutation,
  useDeleteRentPaymentMutation,
} = rentPaymentApi;
