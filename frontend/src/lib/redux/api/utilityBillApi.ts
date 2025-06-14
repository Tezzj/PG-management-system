import { apiSlice } from './apiSlice';
import type {
  UtilityBill,
  BillShare,
  CreateUtilityBillRequest,
  UpdateUtilityBillRequest,
  CreateBillShareRequest,
  UpdateBillShareRequest,
} from '@/lib/types/utility';

export const utilityBillApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUtilityBills: builder.query<UtilityBill[], string>({
      query: (propertyId) => `properties/${propertyId}/utility-bills`,
      providesTags: (result, error, propertyId) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'UtilityBill' as const, id })),
              { type: 'UtilityBill', id: `LIST-${propertyId}` },
            ]
          : [{ type: 'UtilityBill', id: `LIST-${propertyId}` }],
    }),
    getUtilityBill: builder.query<
      UtilityBill,
      { propertyId: string; billId: string }
    >({
      query: ({ propertyId, billId }) =>
        `properties/${propertyId}/utility-bills/${billId}`,
      providesTags: (result, error, { billId }) => [
        { type: 'UtilityBill', id: billId },
      ],
    }),
    createUtilityBill: builder.mutation<
      UtilityBill,
      { propertyId: string; bill: CreateUtilityBillRequest }
    >({
      query: ({ propertyId, bill }) => ({
        url: `properties/${propertyId}/utility-bills`,
        method: 'POST',
        body: bill,
      }),
      invalidatesTags: (result, error, { propertyId }) => [
        { type: 'UtilityBill', id: `LIST-${propertyId}` },
      ],
    }),
    updateUtilityBill: builder.mutation<
      UtilityBill,
      { propertyId: string; billId: string; bill: UpdateUtilityBillRequest }
    >({
      query: ({ propertyId, billId, bill }) => ({
        url: `properties/${propertyId}/utility-bills/${billId}`,
        method: 'PUT',
        body: bill,
      }),
      invalidatesTags: (result, error, { billId }) => [
        { type: 'UtilityBill', id: billId },
      ],
    }),
    deleteUtilityBill: builder.mutation<
      void,
      { propertyId: string; billId: string }
    >({
      query: ({ propertyId, billId }) => ({
        url: `properties/${propertyId}/utility-bills/${billId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { propertyId, billId }) => [
        { type: 'UtilityBill', id: billId },
        { type: 'UtilityBill', id: `LIST-${propertyId}` },
      ],
    }),
    getBillShares: builder.query<BillShare[], string>({
      query: (billId) => `properties/utility-bills/${billId}/shares`,
      providesTags: (result, error, billId) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'BillShare' as const, id })),
              { type: 'BillShare', id: `LIST-${billId}` },
            ]
          : [{ type: 'BillShare', id: `LIST-${billId}` }],
    }),
    createBillShare: builder.mutation<
      BillShare,
      { billId: string; share: CreateBillShareRequest }
    >({
      query: ({ billId, share }) => ({
        url: `properties/utility-bills/${billId}/shares`,
        method: 'POST',
        body: share,
      }),
      invalidatesTags: (result, error, { billId }) => [
        { type: 'BillShare', id: `LIST-${billId}` },
      ],
    }),
    updateBillShare: builder.mutation<
      BillShare,
      { billId: string; shareId: string; share: UpdateBillShareRequest }
    >({
      query: ({ billId, shareId, share }) => ({
        url: `properties/utility-bills/${billId}/shares/${shareId}`,
        method: 'PUT',
        body: share,
      }),
      invalidatesTags: (result, error, { shareId }) => [
        { type: 'BillShare', id: shareId },
      ],
    }),
    deleteBillShare: builder.mutation<
      void,
      { billId: string; shareId: string }
    >({
      query: ({ billId, shareId }) => ({
        url: `properties/utility-bills/${billId}/shares/${shareId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { billId, shareId }) => [
        { type: 'BillShare', id: shareId },
        { type: 'BillShare', id: `LIST-${billId}` },
      ],
    }),
  }),
});

export const {
  useGetUtilityBillsQuery,
  useGetUtilityBillQuery,
  useCreateUtilityBillMutation,
  useUpdateUtilityBillMutation,
  useDeleteUtilityBillMutation,
  useGetBillSharesQuery,
  useCreateBillShareMutation,
  useUpdateBillShareMutation,
  useDeleteBillShareMutation,
} = utilityBillApi;
