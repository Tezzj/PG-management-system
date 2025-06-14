'use client';

import { useParams, useRouter } from 'next/navigation';
// import { useDispatch } from 'react-redux';
import {
  useGetPropertyQuery,
  useDeletePropertyMutation,
} from '@/lib/redux/api/propertyApi';
import { useGetRoomsQuery } from '@/lib/redux/api/roomApi';
// import { setSelectedProperty } from '@/lib/redux/features/propertySlice';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRoleBasedAccess } from '@/lib/hooks/useRoleBasedAccess';
import { RoomCard } from '@/components/dashboard/room-card';
import { ArrowLeft, Building2, Edit, MapPin, Trash } from 'lucide-react';
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
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from '@/components/ui/use-toast';
import { Room } from '@/lib/types/room';
import { extractApiErrorMessage } from '@/lib/util/errors';

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  // const dispatch = useDispatch();
  const propertyId = params.id as string;

  const { data: property, isLoading: isPropertyLoading } =
    useGetPropertyQuery(propertyId);
  const { data: rooms, isLoading: isRoomsLoading } =
    useGetRoomsQuery(propertyId);
  const [deleteProperty, { isLoading: isDeleting }] =
    useDeletePropertyMutation();

  const { isOwner, isModerator, canManageRooms } = useRoleBasedAccess();

  // useEffect(() => {
  //   if (property) {
  //     dispatch(setSelectedProperty(property));
  //   }
  // }, [property, dispatch]);

  const handleDeleteProperty = async () => {
    try {
      await deleteProperty(propertyId).unwrap();
      toast({
        title: 'Property deleted',
        description: 'The property has been deleted successfully.',
      });
      router.push('/dashboard/properties');
    } catch (error: unknown) {
      toast({
        title: 'Error',
        description:
          extractApiErrorMessage(error) || 'Failed to delete property',
        variant: 'destructive',
      });
    }
  };

  const getOccupancy = (rooms?: Room[]) => {
    if (!rooms) return '0/0';
    const occupied = rooms.filter((r) => r.status === 'OCCUPIED').length;
    return `${occupied}/${rooms.length}`;
  };

  if (isPropertyLoading) {
    return <div>Loading property details...</div>;
  }

  if (!property) {
    return <div>Property not found</div>;
  }

  return (
    <div className='space-y-8'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <Button variant='ghost' size='icon' asChild aria-label='Go back'>
            <Link href='/dashboard/properties'>
              <ArrowLeft className='h-4 w-4' />
            </Link>
          </Button>
          <h1 className='text-3xl font-bold'>{property.name}</h1>
          <Badge variant='outline' className='ml-2'>
            {property.propertyType}
          </Badge>
        </div>

        {(isOwner || isModerator) && (
          <div className='flex gap-2'>
            <Button variant='outline' asChild>
              <Link href={`/dashboard/properties/${propertyId}/edit`}>
                <Edit className='mr-2 h-4 w-4' />
                Edit
              </Link>
            </Button>

            {isOwner && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant='destructive'>
                    <Trash className='mr-2 h-4 w-4' />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the property and all associated data.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteProperty}
                      className='bg-red-500 hover:bg-red-600'
                    >
                      {isDeleting ? 'Deleting...' : 'Delete'}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        )}
      </div>

      <div className='grid gap-6 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>Property Details</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-start gap-2'>
              <Building2 className='mt-0.5 h-5 w-5 text-slate-500' />
              <div>
                <p className='font-medium'>Type</p>
                <p className='text-sm text-slate-500'>
                  {property.propertyType}
                </p>
              </div>
            </div>

            <div className='flex items-start gap-2'>
              <MapPin className='mt-0.5 h-5 w-5 text-slate-500' />
              <div>
                <p className='font-medium'>Address</p>
                <p className='text-sm text-slate-500'>
                  {property.address}, {property.city}, {property.state} -{' '}
                  {property.pincode}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Statistics</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div className='rounded-lg bg-slate-100 p-4 dark:bg-slate-800'>
                <p className='text-sm text-slate-500'>Total Rooms</p>
                <p className='text-2xl font-bold'>{property.totalRooms}</p>
              </div>

              <div className='rounded-lg bg-slate-100 p-4 dark:bg-slate-800'>
                <p className='text-sm text-slate-500'>Occupancy</p>
                <p className='text-2xl font-bold'>
                  {isRoomsLoading ? '...' : getOccupancy(rooms)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue='rooms'>
        <TabsList>
          <TabsTrigger value='rooms'>Rooms</TabsTrigger>
          <TabsTrigger value='residents'>Residents</TabsTrigger>
          <TabsTrigger value='announcements'>Announcements</TabsTrigger>
          <TabsTrigger value='maintenance'>Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value='rooms' className='space-y-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-xl font-semibold'>Rooms</h2>
            {canManageRooms && (
              <Button asChild>
                <Link href={`/dashboard/properties/${propertyId}/rooms/new`}>
                  Add Room
                </Link>
              </Button>
            )}
          </div>

          {isRoomsLoading ? (
            <div>Loading rooms...</div>
          ) : (
            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {rooms?.map((room: Room) => (
                <RoomCard
                  key={room.id}
                  id={room.id}
                  propertyId={propertyId}
                  number={room.number}
                  floor={room.floor}
                  capacity={room.capacity}
                  status={room.status}
                  rentAmount={room.rentAmount}
                  canEdit={canManageRooms}
                  canDelete={canManageRooms}
                />
              ))}

              {rooms?.length === 0 && (
                <div className='col-span-3 rounded-lg border border-dashed p-8 text-center'>
                  <h3 className='text-lg font-medium'>No rooms found</h3>
                  <p className='mt-2 text-sm text-slate-500'>
                    {canManageRooms
                      ? 'Add your first room to get started.'
                      : 'No rooms have been added to this property yet.'}
                  </p>
                  {canManageRooms && (
                    <Button asChild className='mt-4'>
                      <Link
                        href={`/dashboard/properties/${propertyId}/rooms/new`}
                      >
                        Add Room
                      </Link>
                    </Button>
                  )}
                </div>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value='residents'>
          <div className='rounded-lg border border-dashed p-8 text-center'>
            <h3 className='text-lg font-medium'>Residents</h3>
            <p className='mt-2 text-sm text-slate-500'>
              View and manage residents for this property.
            </p>
            <Button asChild className='mt-4'>
              <Link href={`/dashboard/properties/${propertyId}/residents`}>
                View Residents
              </Link>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value='announcements'>
          <div className='rounded-lg border border-dashed p-8 text-center'>
            <h3 className='text-lg font-medium'>Announcements</h3>
            <p className='mt-2 text-sm text-slate-500'>
              View and manage announcements for this property.
            </p>
            <Button asChild className='mt-4'>
              <Link href={`/dashboard/properties/${propertyId}/announcements`}>
                View Announcements
              </Link>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value='maintenance'>
          <div className='rounded-lg border border-dashed p-8 text-center'>
            <h3 className='text-lg font-medium'>Maintenance Requests</h3>
            <p className='mt-2 text-sm text-slate-500'>
              View and manage maintenance requests for this property.
            </p>
            <Button asChild className='mt-4'>
              <Link href={`/dashboard/properties/${propertyId}/maintenance`}>
                View Maintenance Requests
              </Link>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
