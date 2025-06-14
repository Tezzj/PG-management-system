'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PaymentStatus } from '@/lib/types/payment';
import { format } from 'date-fns';
import { DollarSign, Calendar, Edit, Trash } from 'lucide-react';

interface PaymentCardProps {
  id: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: PaymentStatus;
  onEdit?: () => void;
  onDelete?: () => void;
  onPay?: () => void;
  canEdit?: boolean;
  canDelete?: boolean;
  canPay?: boolean;
}

export function PaymentCard({
  /* eslint-disable @typescript-eslint/no-unused-vars */
  id,
  amount,
  dueDate,
  paidDate,
  status,
  onEdit,
  onDelete,
  onPay,
  canEdit = false,
  canDelete = false,
  canPay = false,
}: PaymentCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case PaymentStatus.PENDING:
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
      case PaymentStatus.PAID:
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case PaymentStatus.OVERDUE:
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case PaymentStatus.CANCELLED:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  return (
    <Card className='overflow-hidden transition-all hover:shadow-md'>
      <CardHeader className='pb-2'>
        <div className='flex items-start justify-between'>
          <CardTitle className='text-xl'>₹{amount}</CardTitle>
          <Badge className={`${getStatusColor()}`}>{status}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-1 gap-2'>
          <div className='flex items-center gap-1 text-sm'>
            <Calendar className='h-4 w-4 text-slate-500' />
            <span>Due: {format(new Date(dueDate), 'PPP')}</span>
          </div>
          {paidDate && (
            <div className='flex items-center gap-1 text-sm'>
              <DollarSign className='h-4 w-4 text-slate-500' />
              <span>Paid: {format(new Date(paidDate), 'PPP')}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className='flex justify-between gap-2 pt-2'>
        {canPay && status === PaymentStatus.PENDING && (
          <Button variant='default' className='w-full' onClick={onPay}>
            Pay Now
          </Button>
        )}
        <div className='flex gap-2'>
          {canEdit && (
            <Button variant='outline' size='icon' onClick={onEdit}>
              <Edit className='h-4 w-4' />
              <span className='sr-only'>Edit</span>
            </Button>
          )}
          {canDelete && (
            <Button
              variant='outline'
              size='icon'
              className='text-red-500'
              onClick={onDelete}
            >
              <Trash className='h-4 w-4' />
              <span className='sr-only'>Delete</span>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
