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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MaintenanceStatus } from '@/lib/types/maintenance';

const maintenanceFormSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  status: z.nativeEnum(MaintenanceStatus).optional(),
  roomId: z.string().optional(),
});

type MaintenanceFormValues = z.infer<typeof maintenanceFormSchema>;

interface Room {
  id: string;
  number: string;
}

interface MaintenanceFormProps {
  initialData?: Partial<MaintenanceFormValues>;
  rooms?: Room[];
  onSubmit: (data: MaintenanceFormValues) => void;
  isLoading?: boolean;
  showStatusField?: boolean;
}

export function MaintenanceForm({
  initialData,
  rooms = [],
  onSubmit,
  isLoading = false,
  showStatusField = false,
}: MaintenanceFormProps) {
  const form = useForm<MaintenanceFormValues>({
    resolver: zodResolver(maintenanceFormSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      status: initialData?.status || MaintenanceStatus.PENDING,
      roomId: initialData?.roomId || 'none',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder='Enter request title' {...field} />
              </FormControl>
              <FormDescription>
                A clear and concise title for your maintenance request.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Describe the issue in detail'
                  className='min-h-[120px]'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Provide detailed information about the maintenance issue.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {rooms.length > 0 && (
          <FormField
            control={form.control}
            name='roomId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room (Optional)</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select a room (optional)' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='none'>None (Common Area)</SelectItem>
                    {rooms.map((room) => (
                      <SelectItem key={room.id} value={room.id}>
                        Room {room.number}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select the room related to this maintenance request, if
                  applicable.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {showStatusField && (
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
                      <SelectValue placeholder='Select status' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(MaintenanceStatus).map((status) => (
                      <SelectItem key={status} value={status}>
                        {status.replace('_', ' ')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  The current status of this maintenance request.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button type='submit' disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Submit Request'}
        </Button>
      </form>
    </Form>
  );
}
