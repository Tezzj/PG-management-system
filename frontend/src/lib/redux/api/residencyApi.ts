import { apiSlice } from './apiSlice';
import type {
  Residency,
  CreateResidencyRequest,
  UpdateResidencyRequest,
} from '@/lib/types/residency';

export const residencyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getResidenciesForRoom: builder.query<
      Residency[],
      { propertyId: string; roomId: string }
    >({
      query: ({ propertyId, roomId }) =>
        `properties/${propertyId}/rooms/${roomId}/residencies`,
      providesTags: (result, error, { roomId }) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Residency' as const, id })),
              { type: 'Residency', id: `LIST-${roomId}` },
            ]
          : [{ type: 'Residency', id: `LIST-${roomId}` }],
    }),
    createResidency: builder.mutation<
      Residency,
      { propertyId: string; roomId: string; residency: CreateResidencyRequest }
    >({
      query: ({ propertyId, roomId, residency }) => ({
        url: `properties/${propertyId}/rooms/${roomId}/residencies`,
        method: 'POST',
        body: residency,
      }),
      invalidatesTags: (result, error, { roomId }) => [
        { type: 'Residency', id: `LIST-${roomId}` },
        { type: 'Room', id: roomId },
      ],
    }),
    updateResidency: builder.mutation<
      Residency,
      {
        propertyId: string;
        residencyId: string;
        residency: UpdateResidencyRequest;
      }
    >({
      query: ({ propertyId, residencyId, residency }) => ({
        url: `properties/${propertyId}/residencies/${residencyId}`,
        method: 'PUT',
        body: residency,
      }),
      invalidatesTags: (result, error, { residencyId }) => [
        { type: 'Residency', id: residencyId },
      ],
    }),
    deleteResidency: builder.mutation<
      void,
      { propertyId: string; residencyId: string }
    >({
      query: ({ propertyId, residencyId }) => ({
        url: `properties/${propertyId}/residencies/${residencyId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { residencyId }) => [
        { type: 'Residency', id: residencyId },
      ],
    }),
  }),
});

export const {
  useGetResidenciesForRoomQuery,
  useCreateResidencyMutation,
  useUpdateResidencyMutation,
  useDeleteResidencyMutation,
} = residencyApi;
