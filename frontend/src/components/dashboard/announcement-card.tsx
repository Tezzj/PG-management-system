'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { Edit, Trash } from 'lucide-react';

interface AnnouncementCardProps {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  createdBy?: {
    firstName: string;
    lastName: string;
  };
  onEdit?: () => void;
  onDelete?: () => void;
  canEdit?: boolean;
  canDelete?: boolean;
}

export function AnnouncementCard({
  /* eslint-disable @typescript-eslint/no-unused-vars */
  id,
  title,
  message,
  createdAt,
  createdBy,
  onEdit,
  onDelete,
  canEdit = false,
  canDelete = false,
}: AnnouncementCardProps) {
  return (
    <Card className='overflow-hidden transition-all hover:shadow-md'>
      <CardHeader className='pb-2'>
        <div className='flex items-start justify-between'>
          <CardTitle className='text-xl'>{title}</CardTitle>
          <CardDescription>
            {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
          </CardDescription>
        </div>
        {createdBy && (
          <CardDescription>
            Posted by {createdBy.firstName} {createdBy.lastName}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <p className='text-sm text-slate-600 dark:text-slate-300'>{message}</p>
      </CardContent>
      {(canEdit || canDelete) && (
        <CardFooter className='flex justify-end gap-2 pt-2'>
          {canEdit && (
            <Button variant='outline' size='sm' onClick={onEdit}>
              <Edit className='mr-2 h-4 w-4' />
              Edit
            </Button>
          )}
          {canDelete && (
            <Button
              variant='outline'
              size='sm'
              className='text-red-500'
              onClick={onDelete}
            >
              <Trash className='mr-2 h-4 w-4' />
              Delete
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
