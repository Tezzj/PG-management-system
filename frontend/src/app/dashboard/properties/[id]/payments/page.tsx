'use client';

import { useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { PaymentCard } from '@/components/dashboard/payment-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRoleBasedAccess } from '@/lib/hooks/useRoleBasedAccess';
import { ArrowLeft, Receipt, Search } from 'lucide-react';
import Link from 'next/link';
import { toast } from '@/components/ui/use-toast';

// Mock data for payments - in a real app, this would come from an API
const mockPayments = [
  {
    id: 'payment1',
    amount: 5000,
    dueDate: '2025-06-01T00:00:00Z',
    status: 'PENDING',
    userId: 'user1',
  },
  {
    id: 'payment2',
    amount: 5000,
    dueDate: '2025-05-01T00:00:00Z',
    paidDate: '2025-05-02T00:00:00Z',
    status: 'PAID',
    userId: 'user1',
  },
  {
    id: 'payment3',
    amount: 5000,
    dueDate: '2025-04-01T00:00:00Z',
    paidDate: '2025-04-05T00:00:00Z',
    status: 'PAID',
    userId: 'user1',
  },
];

export default function PaymentsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const propertyId = params.id as string;
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const roomIdFilter = searchParams.get('roomId');

  // In a real app, we would fetch payments for the property or specific room
  // const { data: payments, isLoading } = useGetPaymentsQuery(propertyId)
  const payments = mockPayments;
  const isLoading = false;

  const { canManagePayments } = useRoleBasedAccess();

  const [searchTerm, setSearchTerm] = useState('');

  const handlePayNow = (paymentId: string) => {
    // eslint-disable @typescript-eslint/no-unused-vars
    toast({
      title: 'Payment initiated',
      description: 'Payment process has been initiated.',
    });
  };

  const filteredPayments = payments
    ?.filter(
      (payment) =>
        payment.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.amount.toString().includes(searchTerm)
    )
    .sort(
      (a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
    );

  if (isLoading) {
    return <div>Loading payments...</div>;
  }

  return (
    <div className='space-y-8'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <Button variant='ghost' size='icon' asChild>
            <Link href={`/dashboard/properties/${propertyId}`}>
              <ArrowLeft className='h-4 w-4' />
            </Link>
          </Button>
          <h1 className='text-3xl font-bold'>Payments</h1>
        </div>

        {canManagePayments && (
          <Button asChild>
            <Link href={`/dashboard/properties/${propertyId}/payments/new`}>
              Add Payment
            </Link>
          </Button>
        )}
      </div>

      <div className='relative'>
        <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500' />
        <Input
          placeholder='Search payments...'
          className='pl-10'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {filteredPayments?.map((payment) => (
          <PaymentCard
            key={payment.id}
            id={payment.id}
            amount={payment.amount}
            dueDate={payment.dueDate}
            paidDate={payment.paidDate}
            status={payment.status as any} // eslint-disable-line @typescript-eslint/no-explicit-any
            onPay={() => handlePayNow(payment.id)}
            canEdit={canManagePayments}
            canDelete={canManagePayments}
            canPay={true}
          />
        ))}

        {filteredPayments?.length === 0 && (
          <div className='col-span-3 rounded-lg border border-dashed p-8 text-center'>
            <Receipt className='mx-auto h-12 w-12 text-slate-300' />
            <h3 className='mt-4 text-lg font-medium'>No payments found</h3>
            <p className='mt-2 text-sm text-slate-500'>
              {searchTerm
                ? 'Try adjusting your search terms.'
                : canManagePayments
                  ? 'Add your first payment to get started.'
                  : 'No payments have been added yet.'}
            </p>
            {canManagePayments && !searchTerm && (
              <Button asChild className='mt-4'>
                <Link href={`/dashboard/properties/${propertyId}/payments/new`}>
                  Add Payment
                </Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
