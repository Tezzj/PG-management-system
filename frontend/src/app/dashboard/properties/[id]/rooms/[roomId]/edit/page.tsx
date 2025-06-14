'use client';

import { useParams, useRouter } from 'next/navigation';
import {
  useGetRoomQuery,
  useUpdateRoomMutation,
} from '@/lib/redux/api/roomApi';
import { RoomForm } from '@/components/dashboard/room-form';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { toast } from '@/components/ui/use-toast';
import { UpdateRoomRequest } from '@/lib/types/room';
import { extractApiErrorMessage } from '@/lib/util/errors';

export default function EditRoomPage() {
  const params = useParams();
  const router = useRouter();
  const propertyId = params.id as string;
  const roomId = params.roomId as string;

  const { data: room, isLoading: isRoomLoading } = useGetRoomQuery({
    propertyId,
    roomId,
  });
  const [updateRoom, { isLoading: isUpdating }] = useUpdateRoomMutation();

  const handleSubmit = async (data: UpdateRoomRequest) => {
    try {
      await updateRoom({ propertyId, roomId, room: data }).unwrap();
      toast({
        title: 'Room updated',
        description: 'Your room has been updated successfully.',
      });
      router.push(`/dashboard/properties/${propertyId}/rooms/${roomId}`);
    } catch (err: unknown) {
      const errorMessage = extractApiErrorMessage(err);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  if (isRoomLoading) {
    return <div>Loading room details...</div>;
  }

  if (!room) {
    return <div>Room not found</div>;
  }

  return (
    <div className='mx-auto max-w-2xl space-y-8'>
      <div className='flex items-center gap-4'>
        <Button variant='ghost' size='icon' asChild>
          <Link href={`/dashboard/properties/${propertyId}/rooms/${roomId}`}>
            <ArrowLeft className='h-4 w-4' />
          </Link>
        </Button>
        <h1 className='text-3xl font-bold'>Edit Room</h1>
      </div>

      <RoomForm
        initialData={room}
        onSubmit={handleSubmit}
        isLoading={isUpdating}
      />
    </div>
  );
}
