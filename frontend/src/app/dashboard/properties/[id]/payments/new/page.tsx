'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PaymentForm } from '@/components/dashboard/payment-form';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { toast } from '@/components/ui/use-toast';
import type { PaymentFormValues } from '@/components/dashboard/payment-form';
import { extractApiErrorMessage } from '@/lib/util/errors';

export default function NewPaymentPage() {
  const params = useParams();
  const router = useRouter();
  const propertyId = params.id as string;

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: PaymentFormValues) => {
    setIsLoading(true);
    try {
      // In a real app, we would call an API to create the payment
      // await createPayment({ propertyId, payment: data }).unwrap()

      console.log(data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: 'Payment created',
        description: 'The payment has been created successfully.',
      });

      router.push(`/dashboard/properties/${propertyId}/payments`);
    } catch (err: unknown) {
      const errorMessage = extractApiErrorMessage(err);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='mx-auto max-w-2xl space-y-8'>
      <div className='flex items-center gap-4'>
        <Button variant='ghost' size='icon' asChild>
          <Link href={`/dashboard/properties/${propertyId}/payments`}>
            <ArrowLeft className='h-4 w-4' />
          </Link>
        </Button>
        <h1 className='text-3xl font-bold'>Add New Payment</h1>
      </div>

      <PaymentForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
}
