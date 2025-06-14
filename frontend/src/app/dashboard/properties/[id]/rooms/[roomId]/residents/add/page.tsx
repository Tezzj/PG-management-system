'use client';

import { useParams, useRouter } from 'next/navigation';
import { useCreateResidencyMutation } from '@/lib/redux/api/residencyApi';
import { ResidencyForm } from '@/components/dashboard/residency-form';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { toast } from '@/components/ui/use-toast';
import { extractApiErrorMessage } from '@/lib/util/errors';
import { ResidencyFormValues } from '@/components/dashboard/residency-form';

// Mock data for residents - in a real app, this would come from an API
const mockResidents = [
  { id: 'user1', firstName: 'John', lastName: 'Doe' },
  { id: 'user2', firstName: 'Jane', lastName: 'Smith' },
  { id: 'user3', firstName: 'Michael', lastName: 'Johnson' },
];

export default function AddResidentPage() {
  const params = useParams();
  const router = useRouter();
  const propertyId = params.id as string;
  const roomId = params.roomId as string;

  const [createResidency, { isLoading }] = useCreateResidencyMutation();

  const handleSubmit = async (data: ResidencyFormValues) => {
    try {
      await createResidency({
        propertyId,
        roomId,
        residency: {
          residentId: data.residentId,
          startDate: new Date(data.startDate).toISOString(),
          endDate: data.endDate
            ? new Date(data.endDate).toISOString()
            : undefined,
        },
      }).unwrap();

      toast({
        title: 'Resident added',
        description: 'The resident has been added successfully.',
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

  return (
    <div className='mx-auto max-w-2xl space-y-8'>
      <div className='flex items-center gap-4'>
        <Button variant='ghost' size='icon' asChild>
          <Link href={`/dashboard/properties/${propertyId}/rooms/${roomId}`}>
            <ArrowLeft className='h-4 w-4' />
          </Link>
        </Button>
        <h1 className='text-3xl font-bold'>Add Resident</h1>
      </div>

      <ResidencyForm
        residents={mockResidents}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}
