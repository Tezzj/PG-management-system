'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import {
  useGetRoomsQuery,
  useDeleteRoomMutation,
} from '@/lib/redux/api/roomApi';
import { RoomCard } from '@/components/dashboard/room-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRoleBasedAccess } from '@/lib/hooks/useRoleBasedAccess';
import { ArrowLeft, Home, Search } from 'lucide-react';
import Link from 'next/link';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from '@/components/ui/use-toast';
import { extractApiErrorMessage } from '@/lib/util/errors';

export default function RoomsPage() {
  const params = useParams();
  const propertyId = params.id as string;

  const { data: rooms, isLoading } = useGetRoomsQuery(propertyId);
  const [deleteRoom] = useDeleteRoomMutation();
  const { canManageRooms } = useRoleBasedAccess();

  const [searchTerm, setSearchTerm] = useState('');
  const [roomToDelete, setRoomToDelete] = useState<string | null>(null);

  const handleDeleteRoom = async () => {
    if (roomToDelete) {
      try {
        await deleteRoom({ propertyId, roomId: roomToDelete }).unwrap();
        toast({
          title: 'Room deleted',
          description: 'The room has been deleted successfully.',
        });
        setRoomToDelete(null);
      } catch (error: unknown) {
        toast({
          title: 'Error',
          description: extractApiErrorMessage(error) || 'Failed to delete room',
          variant: 'destructive',
        });
      }
    }
  };

  const filteredRooms = rooms?.filter((room) =>
    room.number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div>Loading rooms...</div>;
  }

  return (
    <div className='space-y-8'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <Button variant='ghost' size='icon' asChild aria-label='Go back'>
            <Link href={`/dashboard/properties/${propertyId}`}>
              <ArrowLeft className='h-4 w-4' />
            </Link>
          </Button>
          <h1 className='text-3xl font-bold'>Rooms</h1>
        </div>

        {canManageRooms && (
          <Button asChild>
            <Link href={`/dashboard/properties/${propertyId}/rooms/new`}>
              Add Room
            </Link>
          </Button>
        )}
      </div>

      <div className='relative'>
        <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500' />
        <Input
          placeholder='Search rooms...'
          className='pl-10'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {filteredRooms?.map((room) => (
          <RoomCard
            key={room.id}
            id={room.id}
            propertyId={propertyId}
            number={room.number}
            floor={room.floor}
            capacity={room.capacity}
            status={room.status}
            rentAmount={room.rentAmount}
            onEdit={() => {
              /* Navigate to edit page */
            }}
            onDelete={() => setRoomToDelete(room.id)}
            canEdit={canManageRooms}
            canDelete={canManageRooms}
          />
        ))}

        {filteredRooms?.length === 0 && (
          <div className='col-span-3 rounded-lg border border-dashed p-8 text-center'>
            <Home className='mx-auto h-12 w-12 text-slate-300' />
            <h3 className='mt-4 text-lg font-medium'>No rooms found</h3>
            <p className='mt-2 text-sm text-slate-500'>
              {searchTerm
                ? 'Try adjusting your search terms.'
                : canManageRooms
                  ? 'Add your first room to get started.'
                  : 'No rooms have been added to this property yet.'}
            </p>
            {canManageRooms && !searchTerm && (
              <Button asChild className='mt-4'>
                <Link href={`/dashboard/properties/${propertyId}/rooms/new`}>
                  Add Room
                </Link>
              </Button>
            )}
          </div>
        )}
      </div>

      <AlertDialog
        open={!!roomToDelete}
        onOpenChange={() => setRoomToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              room and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteRoom}
              className='bg-red-500 hover:bg-red-600'
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
