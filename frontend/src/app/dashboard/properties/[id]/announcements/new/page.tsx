'use client';

import { useParams, useRouter } from 'next/navigation';
import { useCreateAnnouncementMutation } from '@/lib/redux/api/announcementApi';
import { AnnouncementForm } from '@/components/dashboard/announcement-form';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { toast } from '@/components/ui/use-toast';
import { CreateAnnouncementRequest } from '@/lib/types/announcement';
import { extractApiErrorMessage } from '@/lib/util/errors';

export default function NewAnnouncementPage() {
  const params = useParams();
  const router = useRouter();
  const propertyId = params.id as string;

  const [createAnnouncement, { isLoading }] = useCreateAnnouncementMutation();

  const handleSubmit = async (data: CreateAnnouncementRequest) => {
    try {
      await createAnnouncement({ propertyId, announcement: data }).unwrap();
      toast({
        title: 'Announcement created',
        description: 'Your announcement has been created successfully.',
      });
      router.push(`/dashboard/properties/${propertyId}/announcements`);
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
          <Link href={`/dashboard/properties/${propertyId}/announcements`}>
            <ArrowLeft className='h-4 w-4' />
          </Link>
        </Button>
        <h1 className='text-3xl font-bold'>Add New Announcement</h1>
      </div>

      <AnnouncementForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
}
