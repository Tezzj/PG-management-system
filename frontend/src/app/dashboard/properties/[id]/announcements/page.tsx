'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import {
  useGetAnnouncementsQuery,
  useDeleteAnnouncementMutation,
} from '@/lib/redux/api/announcementApi';
import { AnnouncementCard } from '@/components/dashboard/announcement-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRoleBasedAccess } from '@/lib/hooks/useRoleBasedAccess';
import { ArrowLeft, Bell, Search } from 'lucide-react';
import Link from 'next/link';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from '@/components/ui/use-toast';
import { Announcement } from '@/lib/types/announcement';
import { extractApiErrorMessage } from '@/lib/util/errors';

export default function AnnouncementsPage() {
  const params = useParams();
  const propertyId = params.id as string;

  const { data: announcements, isLoading } =
    useGetAnnouncementsQuery(propertyId);
  const [deleteAnnouncement] = useDeleteAnnouncementMutation();
  const { canCreateAnnouncements } = useRoleBasedAccess();

  const [searchTerm, setSearchTerm] = useState('');
  const [announcementToDelete, setAnnouncementToDelete] = useState<
    string | null
  >(null);

  const handleDeleteAnnouncement = async () => {
    if (announcementToDelete) {
      try {
        await deleteAnnouncement({
          propertyId,
          announcementId: announcementToDelete,
        }).unwrap();
        toast({
          title: 'Announcement deleted',
          description: 'The announcement has been deleted successfully.',
        });
        setAnnouncementToDelete(null);
      } catch (error: unknown) {
        toast({
          title: 'Error',
          description:
            extractApiErrorMessage(error) || 'Failed to delete announcement',
          variant: 'destructive',
        });
      }
    }
  };

  const filteredAnnouncements = announcements?.filter(
    (announcement: Announcement) =>
      announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div>Loading announcements...</div>;
  }

  return (
    <div className='space-y-8'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <Button variant='ghost' size='icon' asChild aria-label='Go back'>
            <Link href={`/dashboard/properties/${propertyId}`}>
              <ArrowLeft className='h-4 w-4' />
            </Link>
          </Button>
          <h1 className='text-3xl font-bold'>Announcements</h1>
        </div>

        {canCreateAnnouncements && (
          <Button asChild>
            <Link
              href={`/dashboard/properties/${propertyId}/announcements/new`}
            >
              Add Announcement
            </Link>
          </Button>
        )}
      </div>

      <div className='relative'>
        <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500' />
        <Input
          placeholder='Search announcements...'
          className='pl-10'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className='grid gap-6 md:grid-cols-2'>
        {filteredAnnouncements?.map((announcement: Announcement) => (
          <AnnouncementCard
            key={announcement.id}
            id={announcement.id}
            title={announcement.title}
            message={announcement.message}
            createdAt={announcement.createdAt}
            onEdit={() => {
              /* Navigate to edit page */
            }}
            onDelete={() => setAnnouncementToDelete(announcement.id)}
            canEdit={canCreateAnnouncements}
            canDelete={canCreateAnnouncements}
          />
        ))}

        {filteredAnnouncements?.length === 0 && (
          <div className='col-span-2 rounded-lg border border-dashed p-8 text-center'>
            <Bell className='mx-auto h-12 w-12 text-slate-300' />
            <h3 className='mt-4 text-lg font-medium'>No announcements found</h3>
            <p className='mt-2 text-sm text-slate-500'>
              {searchTerm
                ? 'Try adjusting your search terms.'
                : canCreateAnnouncements
                  ? 'Create your first announcement to get started.'
                  : 'No announcements have been posted yet.'}
            </p>
            {canCreateAnnouncements && !searchTerm && (
              <Button asChild className='mt-4'>
                <Link
                  href={`/dashboard/properties/${propertyId}/announcements/new`}
                >
                  Add Announcement
                </Link>
              </Button>
            )}
          </div>
        )}
      </div>

      <AlertDialog
        open={!!announcementToDelete}
        onOpenChange={() => setAnnouncementToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              announcement.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAnnouncement}
              className='bg-red-500 hover:bg-red-600'
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
