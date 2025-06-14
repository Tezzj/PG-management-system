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
import { RoomStatus } from '@/lib/types/room';

const roomFormSchema = z.object({
  number: z.string().min(1, 'Room number is required'),
  floor: z.coerce.number().int().min(0, 'Floor must be a non-negative number'),
  capacity: z.coerce
    .number()
    .int()
    .positive('Capacity must be a positive number'),
  status: z.nativeEnum(RoomStatus),
  rentAmount: z.coerce
    .number()
    .positive('Rent amount must be a positive number'),
});

type RoomFormValues = z.infer<typeof roomFormSchema>;

interface RoomFormProps {
  initialData?: Partial<RoomFormValues>;
  onSubmit: (data: RoomFormValues) => void;
  isLoading?: boolean;
}

export function RoomForm({
  initialData,
  onSubmit,
  isLoading = false,
}: RoomFormProps) {
  const form = useForm<RoomFormValues>({
    resolver: zodResolver(roomFormSchema),
    defaultValues: {
      number: initialData?.number || '',
      floor: initialData?.floor || 0,
      capacity: initialData?.capacity || 1,
      status: initialData?.status || RoomStatus.VACANT,
      rentAmount: initialData?.rentAmount || 0,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <FormField
            control={form.control}
            name='number'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room Number</FormLabel>
                <FormControl>
                  <Input placeholder='Enter room number' {...field} />
                </FormControl>
                <FormDescription>
                  The unique identifier for this room.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='floor'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Floor</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    min={0}
                    placeholder='Enter floor number'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='capacity'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Capacity</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    min={1}
                    placeholder='Enter capacity'
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  The maximum number of residents this room can accommodate.
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select room status' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(RoomStatus).map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  The current status of this room.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='rentAmount'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rent Amount (₹)</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  min={0}
                  step={100}
                  placeholder='Enter rent amount'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                The monthly rent for this room in rupees.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Room'}
        </Button>
      </form>
    </Form>
  );
}
