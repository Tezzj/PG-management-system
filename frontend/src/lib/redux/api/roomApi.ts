import { apiSlice } from './apiSlice';
import type {
  Room,
  CreateRoomRequest,
  UpdateRoomRequest,
} from '@/lib/types/room';

export const roomApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRooms: builder.query<Room[], string>({
      query: (propertyId) => `properties/${propertyId}/rooms`,
      providesTags: (result, error, propertyId) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Room' as const, id })),
              { type: 'Room', id: `LIST-${propertyId}` },
            ]
          : [{ type: 'Room', id: `LIST-${propertyId}` }],
    }),
    getRoom: builder.query<Room, { propertyId: string; roomId: string }>({
      query: ({ propertyId, roomId }) =>
        `properties/${propertyId}/rooms/${roomId}`,
      providesTags: (result, error, { roomId }) => [
        { type: 'Room', id: roomId },
      ],
    }),
    createRoom: builder.mutation<
      Room,
      { propertyId: string; room: CreateRoomRequest }
    >({
      query: ({ propertyId, room }) => ({
        url: `properties/${propertyId}/rooms`,
        method: 'POST',
        body: room,
      }),
      invalidatesTags: (result, error, { propertyId }) => [
        { type: 'Room', id: `LIST-${propertyId}` },
      ],
    }),
    updateRoom: builder.mutation<
      Room,
      { propertyId: string; roomId: string; room: UpdateRoomRequest }
    >({
      query: ({ propertyId, roomId, room }) => ({
        url: `properties/${propertyId}/rooms/${roomId}`,
        method: 'PUT',
        body: room,
      }),
      invalidatesTags: (result, error, { roomId }) => [
        { type: 'Room', id: roomId },
      ],
    }),
    deleteRoom: builder.mutation<void, { propertyId: string; roomId: string }>({
      query: ({ propertyId, roomId }) => ({
        url: `properties/${propertyId}/rooms/${roomId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { propertyId, roomId }) => [
        { type: 'Room', id: roomId },
        { type: 'Room', id: `LIST-${propertyId}` },
      ],
    }),
  }),
});

export const {
  useGetRoomsQuery,
  useGetRoomQuery,
  useCreateRoomMutation,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
} = roomApi;
