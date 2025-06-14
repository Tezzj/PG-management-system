import { apiSlice } from './apiSlice';
import type {
  Announcement,
  CreateAnnouncementRequest,
  UpdateAnnouncementRequest,
} from '@/lib/types/announcement';

export const announcementApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAnnouncements: builder.query<Announcement[], string>({
      query: (propertyId) => `properties/${propertyId}/announcements`,
      providesTags: (result, error, propertyId) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'Announcement' as const,
                id,
              })),
              { type: 'Announcement', id: `LIST-${propertyId}` },
            ]
          : [{ type: 'Announcement', id: `LIST-${propertyId}` }],
    }),
    getAnnouncement: builder.query<
      Announcement,
      { propertyId: string; announcementId: string }
    >({
      query: ({ propertyId, announcementId }) =>
        `properties/${propertyId}/announcements/${announcementId}`,
      providesTags: (result, error, { announcementId }) => [
        { type: 'Announcement', id: announcementId },
      ],
    }),
    createAnnouncement: builder.mutation<
      Announcement,
      { propertyId: string; announcement: CreateAnnouncementRequest }
    >({
      query: ({ propertyId, announcement }) => ({
        url: `properties/${propertyId}/announcements`,
        method: 'POST',
        body: announcement,
      }),
      invalidatesTags: (result, error, { propertyId }) => [
        { type: 'Announcement', id: `LIST-${propertyId}` },
      ],
    }),
    updateAnnouncement: builder.mutation<
      Announcement,
      {
        propertyId: string;
        announcementId: string;
        announcement: UpdateAnnouncementRequest;
      }
    >({
      query: ({ propertyId, announcementId, announcement }) => ({
        url: `properties/${propertyId}/announcements/${announcementId}`,
        method: 'PUT',
        body: announcement,
      }),
      invalidatesTags: (result, error, { announcementId }) => [
        { type: 'Announcement', id: announcementId },
      ],
    }),
    deleteAnnouncement: builder.mutation<
      void,
      { propertyId: string; announcementId: string }
    >({
      query: ({ propertyId, announcementId }) => ({
        url: `properties/${propertyId}/announcements/${announcementId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { propertyId, announcementId }) => [
        { type: 'Announcement', id: announcementId },
        { type: 'Announcement', id: `LIST-${propertyId}` },
      ],
    }),
  }),
});

export const {
  useGetAnnouncementsQuery,
  useGetAnnouncementQuery,
  useCreateAnnouncementMutation,
  useUpdateAnnouncementMutation,
  useDeleteAnnouncementMutation,
} = announcementApi;
