'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useCreateMaintenanceRequestMutation } from '@/lib/redux/api/maintenanceApi';
import { useGetRoomsQuery } from '@/lib/redux/api/roomApi';
import { MaintenanceForm } from '@/components/dashboard/maintenance-form';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { toast } from '@/components/ui/use-toast';
import { Room } from '@/lib/types/room';
import { CreateMaintenanceRequestRequest } from '@/lib/types/maintenance';
import { extractApiErrorMessage } from '@/lib/util/errors';

export default function NewMaintenanceRequestPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const propertyId = params.id as string;
  const roomIdParam = searchParams.get('roomId');

  const { data: rooms } = useGetRoomsQuery(propertyId);
  const [createMaintenanceRequest, { isLoading }] =
    useCreateMaintenanceRequestMutation();

  const handleSubmit = async (data: CreateMaintenanceRequestRequest) => {
    try {
      const requestData = {
        title: data.title,
        description: data.description,
        roomId: data.roomId === 'none' ? undefined : data.roomId,
      };

      await createMaintenanceRequest({
        propertyId,
        request: requestData,
      }).unwrap();
      toast({
        title: 'Maintenance request created',
        description: 'Your maintenance request has been created successfully.',
      });
      router.push(`/dashboard/properties/${propertyId}/maintenance`);
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
          <Link href={`/dashboard/properties/${propertyId}/maintenance`}>
            <ArrowLeft className='h-4 w-4' />
          </Link>
        </Button>
        <h1 className='text-3xl font-bold'>New Maintenance Request</h1>
      </div>

      <MaintenanceForm
        initialData={{ roomId: roomIdParam || undefined }}
        rooms={
          rooms?.map((room: Room) => ({ id: room.id, number: room.number })) ||
          []
        }
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}
