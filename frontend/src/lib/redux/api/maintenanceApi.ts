import { apiSlice } from './apiSlice';
import type {
  MaintenanceRequest,
  CreateMaintenanceRequestRequest,
  UpdateMaintenanceRequestRequest,
} from '@/lib/types/maintenance';

export const maintenanceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMaintenanceRequests: builder.query<MaintenanceRequest[], string>({
      query: (propertyId) => `properties/${propertyId}/maintenance-requests`,
      providesTags: (result, error, propertyId) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'MaintenanceRequest' as const,
                id,
              })),
              { type: 'MaintenanceRequest', id: `LIST-${propertyId}` },
            ]
          : [{ type: 'MaintenanceRequest', id: `LIST-${propertyId}` }],
    }),
    getMaintenanceRequest: builder.query<
      MaintenanceRequest,
      { propertyId: string; requestId: string }
    >({
      query: ({ propertyId, requestId }) =>
        `properties/${propertyId}/maintenance-requests/${requestId}`,
      providesTags: (result, error, { requestId }) => [
        { type: 'MaintenanceRequest', id: requestId },
      ],
    }),
    createMaintenanceRequest: builder.mutation<
      MaintenanceRequest,
      { propertyId: string; request: CreateMaintenanceRequestRequest }
    >({
      query: ({ propertyId, request }) => ({
        url: `properties/${propertyId}/maintenance-requests`,
        method: 'POST',
        body: request,
      }),
      invalidatesTags: (result, error, { propertyId }) => [
        { type: 'MaintenanceRequest', id: `LIST-${propertyId}` },
      ],
    }),
    updateMaintenanceRequest: builder.mutation<
      MaintenanceRequest,
      {
        propertyId: string;
        requestId: string;
        request: UpdateMaintenanceRequestRequest;
      }
    >({
      query: ({ propertyId, requestId, request }) => ({
        url: `properties/${propertyId}/maintenance-requests/${requestId}`,
        method: 'PUT',
        body: request,
      }),
      invalidatesTags: (result, error, { requestId }) => [
        { type: 'MaintenanceRequest', id: requestId },
      ],
    }),
    deleteMaintenanceRequest: builder.mutation<
      void,
      { propertyId: string; requestId: string }
    >({
      query: ({ propertyId, requestId }) => ({
        url: `properties/${propertyId}/maintenance-requests/${requestId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { propertyId, requestId }) => [
        { type: 'MaintenanceRequest', id: requestId },
        { type: 'MaintenanceRequest', id: `LIST-${propertyId}` },
      ],
    }),
  }),
});

export const {
  useGetMaintenanceRequestsQuery,
  useGetMaintenanceRequestQuery,
  useCreateMaintenanceRequestMutation,
  useUpdateMaintenanceRequestMutation,
  useDeleteMaintenanceRequestMutation,
} = maintenanceApi;
