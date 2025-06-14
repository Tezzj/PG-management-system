'use client';

import { useParams, useRouter } from 'next/navigation';
import {
  useGetRoomQuery,
  useDeleteRoomMutation,
} from '@/lib/redux/api/roomApi';
import { useGetResidenciesForRoomQuery } from '@/lib/redux/api/residencyApi';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRoleBasedAccess } from '@/lib/hooks/useRoleBasedAccess';
import { ArrowLeft, Edit, Home, Trash, Users, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
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
import { Residency } from '@/lib/types/residency';
import { extractApiErrorMessage } from '@/lib/util/errors';

export default function RoomDetailPage() {
  const params = useParams();
  const router = useRouter();
  const propertyId = params.id as string;
  const roomId = params.roomId as string;

  const { data: room, isLoading: isRoomLoading } = useGetRoomQuery({
    propertyId,
    roomId,
  });
  const { data: residencies, isLoading: isResidenciesLoading } =
    useGetResidenciesForRoomQuery({ propertyId, roomId });
  const [deleteRoom, { isLoading: isDeleting }] = useDeleteRoomMutation();

  const { canManageRooms, canManageResidents } = useRoleBasedAccess();

  const handleDeleteRoom = async () => {
    try {
      await deleteRoom({ propertyId, roomId }).unwrap();
      toast({
        title: 'Room deleted',
        description: 'The room has been deleted successfully.',
      });
      router.push(`/dashboard/properties/${propertyId}/rooms`);
    } catch (error: unknown) {
      toast({
        title: 'Error',
        description: extractApiErrorMessage(error) || 'Failed to delete room',
        variant: 'destructive',
      });
    }
  };

  const getStatusColor = () => {
    if (!room) return '';

    switch (room.status) {
      case 'VACANT':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'OCCUPIED':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'MAINTENANCE':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  if (isRoomLoading) {
    return <div>Loading room details...</div>;
  }

  if (!room) {
    return <div>Room not found</div>;
  }

  const activeResidency = residencies?.find((r: Residency) => r.active);

  return (
    <div className='space-y-8'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <Button variant='ghost' size='icon' asChild aria-label='Go back'>
            <Link href={`/dashboard/properties/${propertyId}/rooms`}>
              <ArrowLeft className='h-4 w-4' />
            </Link>
          </Button>
          <h1 className='text-3xl font-bold'>Room {room.number}</h1>
          <Badge className={`${getStatusColor()}`}>{room.status}</Badge>
        </div>

        {canManageRooms && (
          <div className='flex gap-2'>
            <Button variant='outline' asChild>
              <Link
                href={`/dashboard/properties/${propertyId}/rooms/${roomId}/edit`}
              >
                <Edit className='mr-2 h-4 w-4' />
                Edit
              </Link>
            </Button>

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
                    the room and all associated data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteRoom}
                    className='bg-red-500 hover:bg-red-600'
                  >
                    {isDeleting ? 'Deleting...' : 'Delete'}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </div>

      <div className='grid gap-6 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>Room Details</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-start gap-2'>
              <Home className='mt-0.5 h-5 w-5 text-slate-500' />
              <div>
                <p className='font-medium'>Floor</p>
                <p className='text-sm text-slate-500'>{room.floor}</p>
              </div>
            </div>

            <div className='flex items-start gap-2'>
              <Users className='mt-0.5 h-5 w-5 text-slate-500' />
              <div>
                <p className='font-medium'>Capacity</p>
                <p className='text-sm text-slate-500'>
                  {room.capacity} {room.capacity > 1 ? 'persons' : 'person'}
                </p>
              </div>
            </div>

            <div className='flex items-start gap-2'>
              <DollarSign className='mt-0.5 h-5 w-5 text-slate-500' />
              <div>
                <p className='font-medium'>Rent Amount</p>
                <p className='text-sm text-slate-500'>
                  ₹{room.rentAmount}/month
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Occupancy</CardTitle>
            <CardDescription>
              {room.status === 'OCCUPIED'
                ? 'This room is currently occupied'
                : 'This room is currently vacant'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {activeResidency ? (
              <div className='space-y-4'>
                <p className='text-sm text-slate-500'>
                  <span className='font-medium'>Start Date:</span>{' '}
                  {format(new Date(activeResidency.startDate), 'PPP')}
                </p>
                {activeResidency.endDate && (
                  <p className='text-sm text-slate-500'>
                    <span className='font-medium'>End Date:</span>{' '}
                    {format(new Date(activeResidency.endDate), 'PPP')}
                  </p>
                )}
                <Button asChild className='mt-2'>
                  <Link
                    href={`/dashboard/properties/${propertyId}/rooms/${roomId}/residents`}
                  >
                    View Resident Details
                  </Link>
                </Button>
              </div>
            ) : (
              <div className='text-center'>
                <p className='mb-4 text-sm text-slate-500'>
                  No active residents for this room.
                </p>
                {canManageResidents && (
                  <Button asChild>
                    <Link
                      href={`/dashboard/properties/${propertyId}/rooms/${roomId}/residents/add`}
                    >
                      Add Resident
                    </Link>
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue='residents'>
        <TabsList>
          <TabsTrigger value='residents'>Residents</TabsTrigger>
          <TabsTrigger value='maintenance'>Maintenance</TabsTrigger>
          <TabsTrigger value='payments'>Payments</TabsTrigger>
        </TabsList>

        <TabsContent value='residents' className='space-y-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-xl font-semibold'>Residents History</h2>
            {canManageResidents && (
              <Button asChild>
                <Link
                  href={`/dashboard/properties/${propertyId}/rooms/${roomId}/residents/add`}
                >
                  Add Resident
                </Link>
              </Button>
            )}
          </div>

          {isResidenciesLoading ? (
            <div>Loading residents...</div>
          ) : residencies && residencies.length > 0 ? (
            <div className='rounded-md border'>
              <table className='w-full'>
                <thead>
                  <tr className='border-b bg-slate-50 dark:bg-slate-800'>
                    <th className='px-4 py-2 text-left font-medium'>
                      Resident ID
                    </th>
                    <th className='px-4 py-2 text-left font-medium'>
                      Start Date
                    </th>
                    <th className='px-4 py-2 text-left font-medium'>
                      End Date
                    </th>
                    <th className='px-4 py-2 text-left font-medium'>Status</th>
                    <th className='px-4 py-2 text-left font-medium'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {residencies.map((residency: Residency) => (
                    <tr key={residency.id} className='border-b'>
                      <td className='px-4 py-2'>{residency.residentId}</td>
                      <td className='px-4 py-2'>
                        {format(new Date(residency.startDate), 'PP')}
                      </td>
                      <td className='px-4 py-2'>
                        {residency.endDate
                          ? format(new Date(residency.endDate), 'PP')
                          : 'N/A'}
                      </td>
                      <td className='px-4 py-2'>
                        <Badge
                          variant={residency.active ? 'default' : 'secondary'}
                        >
                          {residency.active ? 'Active' : 'Inactive'}
                        </Badge>
                      </td>
                      <td className='px-4 py-2'>
                        {canManageResidents && (
                          <Button variant='outline' size='sm' asChild>
                            <Link
                              href={`/dashboard/properties/${propertyId}/residencies/${residency.id}/edit`}
                            >
                              Edit
                            </Link>
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className='rounded-lg border border-dashed p-8 text-center'>
              <h3 className='text-lg font-medium'>No residents history</h3>
              <p className='mt-2 text-sm text-slate-500'>
                This room has no resident history.
              </p>
              {canManageResidents && (
                <Button asChild className='mt-4'>
                  <Link
                    href={`/dashboard/properties/${propertyId}/rooms/${roomId}/residents/add`}
                  >
                    Add Resident
                  </Link>
                </Button>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value='maintenance'>
          <div className='rounded-lg border border-dashed p-8 text-center'>
            <h3 className='text-lg font-medium'>Maintenance Requests</h3>
            <p className='mt-2 text-sm text-slate-500'>
              View and manage maintenance requests for this room.
            </p>
            <Button asChild className='mt-4'>
              <Link
                href={`/dashboard/properties/${propertyId}/maintenance?roomId=${roomId}`}
              >
                View Maintenance Requests
              </Link>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value='payments'>
          <div className='rounded-lg border border-dashed p-8 text-center'>
            <h3 className='text-lg font-medium'>Payments</h3>
            <p className='mt-2 text-sm text-slate-500'>
              View and manage payments for this room.
            </p>
            <Button asChild className='mt-4'>
              <Link
                href={`/dashboard/properties/${propertyId}/payments?roomId=${roomId}`}
              >
                View Payments
              </Link>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
