'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PaymentStatus } from '@/lib/types/payment';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const paymentFormSchema = z.object({
  amount: z.coerce.number().positive('Amount must be a positive number'),
  dueDate: z.date(),
  paidDate: z.date().optional(),
  status: z.nativeEnum(PaymentStatus),
});

export type PaymentFormValues = z.infer<typeof paymentFormSchema>;

interface PaymentFormProps {
  initialData?: Partial<
    PaymentFormValues & { dueDate: string; paidDate?: string }
  >;
  onSubmit: (data: PaymentFormValues) => void;
  isLoading?: boolean;
}

export function PaymentForm({
  initialData,
  onSubmit,
  isLoading = false,
}: PaymentFormProps) {
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      amount: initialData?.amount || 0,
      dueDate: initialData?.dueDate
        ? new Date(initialData.dueDate)
        : new Date(),
      paidDate: initialData?.paidDate
        ? new Date(initialData.paidDate)
        : undefined,
      status: initialData?.status || PaymentStatus.PENDING,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='amount'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount (₹)</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  min={0}
                  step={100}
                  placeholder='Enter amount'
                  {...field}
                />
              </FormControl>
              <FormDescription>The payment amount in rupees.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='dueDate'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Due Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={'w-full pl-3 text-left font-normal'}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                The date by which the payment is due.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='status'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select payment status' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(PaymentStatus).map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                The current status of this payment.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch('status') === PaymentStatus.PAID && (
          <FormField
            control={form.control}
            name='paidDate'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Paid Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={'w-full pl-3 text-left font-normal'}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      mode='single'
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  The date when the payment was made.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button type='submit' disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Payment'}
        </Button>
      </form>
    </Form>
  );
}
