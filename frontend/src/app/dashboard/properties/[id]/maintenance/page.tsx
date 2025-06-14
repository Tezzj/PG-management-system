'use client';

import { useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import {
  useGetMaintenanceRequestsQuery,
  useDeleteMaintenanceRequestMutation,
  useUpdateMaintenanceRequestMutation,
} from '@/lib/redux/api/maintenanceApi';
import { MaintenanceCard } from '@/components/dashboard/maintenance-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRoleBasedAccess } from '@/lib/hooks/useRoleBasedAccess';
import { ArrowLeft, Search, Wrench } from 'lucide-react';
import Link from 'next/link';
import type {
  MaintenanceRequest,
  MaintenanceStatus,
} from '@/lib/types/maintenance';
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

export default function MaintenanceRequestsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const propertyId = params.id as string;
  const roomIdFilter = searchParams.get('roomId');

  const { data: maintenanceRequests, isLoading } =
    useGetMaintenanceRequestsQuery(propertyId);
  const [deleteMaintenanceRequest] = useDeleteMaintenanceRequestMutation();
  const [updateMaintenanceRequest] = useUpdateMaintenanceRequestMutation();

  const { canCreateMaintenanceRequests, canManageMaintenanceRequests } =
    useRoleBasedAccess();

  const [searchTerm, setSearchTerm] = useState('');
  const [requestToDelete, setRequestToDelete] = useState<string | null>(null);

  const handleDeleteRequest = async () => {
    if (requestToDelete) {
      try {
        await deleteMaintenanceRequest({
          propertyId,
          requestId: requestToDelete,
        }).unwrap();
        toast({
          title: 'Maintenance request deleted',
          description: 'The maintenance request has been deleted successfully.',
        });
        setRequestToDelete(null);
      } catch (error: unknown) {
        toast({
          title: 'Error',
          description:
            extractApiErrorMessage(error) ||
            'Failed to delete maintenance request',
          variant: 'destructive',
        });
      }
    }
  };

  const handleStatusChange = async (
    requestId: string,
    status: MaintenanceStatus
  ) => {
    try {
      await updateMaintenanceRequest({
        propertyId,
        requestId,
        request: { status },
      }).unwrap();

      toast({
        title: 'Status updated',
        description: `Maintenance request status updated to ${status}.`,
      });
    } catch (error: unknown) {
      toast({
        title: 'Error',
        description: extractApiErrorMessage(error) || 'Failed to update status',
        variant: 'destructive',
      });
    }
  };

  const filteredRequests = maintenanceRequests
    ?.filter(
      (request: MaintenanceRequest) =>
        (roomIdFilter ? request.roomId === roomIdFilter : true) &&
        (request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          request.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort(
      (a: MaintenanceRequest, b: MaintenanceRequest) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  if (isLoading) {
    return <div>Loading maintenance requests...</div>;
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
          <h1 className='text-3xl font-bold'>Maintenance Requests</h1>
        </div>

        {canCreateMaintenanceRequests && (
          <Button asChild>
            <Link href={`/dashboard/properties/${propertyId}/maintenance/new`}>
              Add Request
            </Link>
          </Button>
        )}
      </div>

      <div className='relative'>
        <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500' />
        <Input
          placeholder='Search maintenance requests...'
          className='pl-10'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className='grid gap-6 md:grid-cols-2'>
        {filteredRequests?.map((request: MaintenanceRequest) => (
          <MaintenanceCard
            key={request.id}
            id={request.id}
            title={request.title}
            description={request.description}
            status={request.status}
            createdAt={request.createdAt}
            roomNumber={
              request.roomId ? 'Room ID: ' + request.roomId : undefined
            }
            onEdit={() => {
              /* Navigate to edit page */
            }}
            onDelete={() => setRequestToDelete(request.id)}
            onStatusChange={(status) => handleStatusChange(request.id, status)}
            canEdit={canManageMaintenanceRequests}
            canDelete={canManageMaintenanceRequests}
            canChangeStatus={canManageMaintenanceRequests}
          />
        ))}

        {filteredRequests?.length === 0 && (
          <div className='col-span-2 rounded-lg border border-dashed p-8 text-center'>
            <Wrench className='mx-auto h-12 w-12 text-slate-300' />
            <h3 className='mt-4 text-lg font-medium'>
              No maintenance requests found
            </h3>
            <p className='mt-2 text-sm text-slate-500'>
              {searchTerm || roomIdFilter
                ? 'Try adjusting your search terms or filters.'
                : canCreateMaintenanceRequests
                  ? 'Create your first maintenance request to get started.'
                  : 'No maintenance requests have been submitted yet.'}
            </p>
            {canCreateMaintenanceRequests && !searchTerm && (
              <Button asChild className='mt-4'>
                <Link
                  href={`/dashboard/properties/${propertyId}/maintenance/new`}
                >
                  Add Request
                </Link>
              </Button>
            )}
          </div>
        )}
      </div>

      <AlertDialog
        open={!!requestToDelete}
        onOpenChange={() => setRequestToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              maintenance request.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteRequest}
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
