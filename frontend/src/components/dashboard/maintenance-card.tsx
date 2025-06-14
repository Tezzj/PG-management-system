'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MaintenanceStatus } from '@/lib/types/maintenance';
import { formatDistanceToNow } from 'date-fns';
import { Wrench, Edit, Trash } from 'lucide-react';

interface MaintenanceCardProps {
  id: string;
  title: string;
  description: string;
  status: MaintenanceStatus;
  createdAt: string;
  roomNumber?: string;
  requestedBy?: {
    firstName: string;
    lastName: string;
  };
  onEdit?: () => void;
  onDelete?: () => void;
  onStatusChange?: (status: MaintenanceStatus) => void;
  canEdit?: boolean;
  canDelete?: boolean;
  canChangeStatus?: boolean;
}

export function MaintenanceCard({
  /* eslint-disable @typescript-eslint/no-unused-vars */
  id,
  title,
  description,
  status,
  createdAt,
  roomNumber,
  requestedBy,
  onEdit,
  onDelete,
  onStatusChange,
  canEdit = false,
  canDelete = false,
  canChangeStatus = false,
}: MaintenanceCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case MaintenanceStatus.PENDING:
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
      case MaintenanceStatus.IN_PROGRESS:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case MaintenanceStatus.RESOLVED:
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case MaintenanceStatus.REJECTED:
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  return (
    <Card className='overflow-hidden transition-all hover:shadow-md'>
      <CardHeader className='pb-2'>
        <div className='flex items-start justify-between'>
          <CardTitle className='text-xl'>{title}</CardTitle>
          <Badge className={`${getStatusColor()}`}>{status}</Badge>
        </div>
        <CardDescription className='flex flex-col gap-1'>
          <span>
            {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
          </span>
          {roomNumber && (
            <span className='flex items-center gap-1'>
              <Wrench className='h-3 w-3' />
              Room {roomNumber}
            </span>
          )}
          {requestedBy && (
            <span>
              Requested by {requestedBy.firstName} {requestedBy.lastName}
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className='text-sm text-slate-600 dark:text-slate-300'>
          {description}
        </p>
      </CardContent>
      <CardFooter className='flex justify-between gap-2 pt-2'>
        {canChangeStatus && (
          <div className='flex gap-2'>
            {status !== MaintenanceStatus.IN_PROGRESS && (
              <Button
                variant='outline'
                size='sm'
                onClick={() => onStatusChange?.(MaintenanceStatus.IN_PROGRESS)}
              >
                Start
              </Button>
            )}
            {status !== MaintenanceStatus.RESOLVED && (
              <Button
                variant='outline'
                size='sm'
                onClick={() => onStatusChange?.(MaintenanceStatus.RESOLVED)}
              >
                Resolve
              </Button>
            )}
            {status !== MaintenanceStatus.REJECTED && (
              <Button
                variant='outline'
                size='sm'
                className='text-red-500'
                onClick={() => onStatusChange?.(MaintenanceStatus.REJECTED)}
              >
                Reject
              </Button>
            )}
          </div>
        )}
        <div className='flex gap-2'>
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
        </div>
      </CardFooter>
    </Card>
  );
}
