'use client';

import { useRouter } from 'next/navigation';
import { useCreatePropertyMutation } from '@/lib/redux/api/propertyApi';
import { PropertyForm } from '@/components/dashboard/property-form';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { toast } from '@/components/ui/use-toast';
import { CreatePropertyRequest } from '@/lib/types/property';
import { extractApiErrorMessage } from '@/lib/util/errors';

export default function NewPropertyPage() {
  const router = useRouter();
  const [createProperty, { isLoading }] = useCreatePropertyMutation();

  const handleSubmit = async (data: CreatePropertyRequest) => {
    try {
      const newProperty = await createProperty(data).unwrap();
      toast({
        title: 'Property Created',
        description: 'Your property has been created successfully.',
      });
      router.push(`/dashboard/properties/${newProperty.id}`);
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
          <Link href='/dashboard/properties'>
            <ArrowLeft className='h-4 w-4' aria-hidden='true' />
            <span className='sr-only'>Back to properties</span>
          </Link>
        </Button>
        <h1 className='text-3xl font-bold'>Add New Property</h1>
      </div>

      <PropertyForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
}
