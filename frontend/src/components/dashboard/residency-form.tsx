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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';

const residencyFormSchema = z.object({
  residentId: z.string().min(1, 'Resident is required'),
  startDate: z.date(),
  endDate: z.date().optional(),
  active: z.boolean().default(true),
});

export type ResidencyFormValues = z.infer<typeof residencyFormSchema>;

interface Resident {
  id: string;
  firstName: string;
  lastName: string;
}

interface ResidencyFormProps {
  initialData?: Partial<
    ResidencyFormValues & { startDate: string; endDate?: string }
  >;
  residents: Resident[];
  onSubmit: (data: ResidencyFormValues) => void;
  isLoading?: boolean;
  isEditing?: boolean;
}

export function ResidencyForm({
  initialData,
  residents,
  onSubmit,
  isLoading = false,
  isEditing = false,
}: ResidencyFormProps) {
  const form = useForm<ResidencyFormValues>({
    resolver: zodResolver(residencyFormSchema),
    defaultValues: {
      residentId: initialData?.residentId || '',
      startDate: initialData?.startDate
        ? new Date(initialData.startDate)
        : new Date(),
      endDate: initialData?.endDate ? new Date(initialData.endDate) : undefined,
      active: initialData?.active ?? true,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='residentId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resident</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isEditing}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select a resident' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {residents.map((resident) => (
                    <SelectItem key={resident.id} value={resident.id}>
                      {resident.firstName} {resident.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                The resident who will occupy this room.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='startDate'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Start Date</FormLabel>
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
                The date when the residency starts.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='endDate'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>End Date (Optional)</FormLabel>
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
                        <span>No end date</span>
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
                    disabled={(date) => date < form.watch('startDate')}
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                The date when the residency ends (if known).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {isEditing && (
          <FormField
            control={form.control}
            name='active'
            render={({ field }) => (
              <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                <div className='space-y-0.5'>
                  <FormLabel className='text-base'>Active Status</FormLabel>
                  <FormDescription>
                    Whether this residency is currently active.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        )}

        <Button type='submit' disabled={isLoading}>
          {isLoading
            ? 'Saving...'
            : isEditing
              ? 'Update Residency'
              : 'Add Resident'}
        </Button>
      </form>
    </Form>
  );
}
