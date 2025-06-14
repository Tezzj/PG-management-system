import { apiSlice } from './apiSlice';
import type {
  Property,
  CreatePropertyRequest,
  UpdatePropertyRequest,
} from '@/lib/types/property';

export const propertyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProperties: builder.query<Property[], void>({
      query: () => 'properties',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Property' as const, id })),
              { type: 'Property', id: 'LIST' },
            ]
          : [{ type: 'Property', id: 'LIST' }],
    }),
    getProperty: builder.query<Property, string>({
      query: (id) => `properties/${id}`,
      providesTags: (result, error, id) => [{ type: 'Property', id }],
    }),
    createProperty: builder.mutation<Property, CreatePropertyRequest>({
      query: (property) => ({
        url: 'properties',
        method: 'POST',
        body: property,
      }),
      invalidatesTags: [{ type: 'Property', id: 'LIST' }],
    }),
    updateProperty: builder.mutation<
      Property,
      { id: string; property: UpdatePropertyRequest }
    >({
      query: ({ id, property }) => ({
        url: `properties/${id}`,
        method: 'PUT',
        body: property,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Property', id }],
    }),
    deleteProperty: builder.mutation<void, string>({
      query: (id) => ({
        url: `properties/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Property', id },
        { type: 'Property', id: 'LIST' },
      ],
    }),
    setModerators: builder.mutation<
      Property,
      { propertyId: string; moderatorIds: string[] }
    >({
      query: ({ propertyId, moderatorIds }) => ({
        url: `properties/${propertyId}/moderators`,
        method: 'PUT',
        body: { moderatorIds },
      }),
      invalidatesTags: (result, error, { propertyId }) => [
        { type: 'Property', id: propertyId },
      ],
    }),
  }),
});

export const {
  useGetPropertiesQuery,
  useGetPropertyQuery,
  useCreatePropertyMutation,
  useUpdatePropertyMutation,
  useDeletePropertyMutation,
  useSetModeratorsMutation,
} = propertyApi;
