'use client';

import { useParams, useRouter } from 'next/navigation';
import { useCreateRoomMutation } from '@/lib/redux/api/roomApi';
import { RoomForm } from '@/components/dashboard/room-form';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { toast } from '@/components/ui/use-toast';
import { CreateRoomRequest } from '@/lib/types/room';
import { extractApiErrorMessage } from '@/lib/util/errors';

export default function NewRoomPage() {
  const params = useParams();
  const router = useRouter();
  const propertyId = params.id as string;

  const [createRoom, { isLoading }] = useCreateRoomMutation();

  const handleSubmit = async (data: CreateRoomRequest) => {
    try {
      const newRoom = await createRoom({ propertyId, room: data }).unwrap();
      toast({
        title: 'Room created',
        description: 'Your room has been created successfully.',
      });
      router.push(`/dashboard/properties/${propertyId}/rooms/${newRoom.id}`);
    } catch (err: unknown) {
      const errorMessage = extractApiErrorMessage(err);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='mx-auto max-w-2xl space-y-8'>
      <div className='flex items-center gap-4'>
        <Button variant='ghost' size='icon' asChild>
          <Link href={`/dashboard/properties/${propertyId}/rooms`}>
            <ArrowLeft className='h-4 w-4' />
          </Link>
        </Button>
        <h1 className='text-3xl font-bold'>Add New Room</h1>
      </div>

      <RoomForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
}
