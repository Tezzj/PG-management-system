'use client';

import { useParams, useRouter } from 'next/navigation';
import {
  useGetPropertyQuery,
  useUpdatePropertyMutation,
} from '@/lib/redux/api/propertyApi';
import { PropertyForm } from '@/components/dashboard/property-form';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { toast } from '@/components/ui/use-toast';
import { CreatePropertyRequest } from '@/lib/types/property';
import { extractApiErrorMessage } from '@/lib/util/errors';

export default function EditPropertyPage() {
  const params = useParams();
  const router = useRouter();
  const propertyId = params.id as string;

  const { data: property, isLoading: isPropertyLoading } =
    useGetPropertyQuery(propertyId);
  const [updateProperty, { isLoading: isUpdating }] =
    useUpdatePropertyMutation();

  const handleSubmit = async (data: CreatePropertyRequest) => {
    try {
      await updateProperty({ id: propertyId, property: data }).unwrap();
      toast({
        title: 'Property updated',
        description: 'Your property has been updated successfully.',
      });
      router.push(`/dashboard/properties/${propertyId}`);
    } catch (err: unknown) {
      const errorMessage = extractApiErrorMessage(err);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  if (isPropertyLoading) {
    return <div>Loading property details...</div>;
  }

  if (!property) {
    return <div>Property not found</div>;
  }

  return (
    <div className='mx-auto max-w-2xl space-y-8'>
      <div className='flex items-center gap-4'>
        <Button variant='ghost' size='icon' asChild>
          <Link href={`/dashboard/properties/${propertyId}`}>
            <ArrowLeft className='h-4 w-4' />
          </Link>
        </Button>
        <h1 className='text-3xl font-bold'>Edit Property</h1>
      </div>

      <PropertyForm
        initialData={property}
        onSubmit={handleSubmit}
        isLoading={isUpdating}
      />
    </div>
  );
}
