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
import { RoomStatus } from '@/lib/types/room';
import { Home, Users, DollarSign, Edit, Trash } from 'lucide-react';
import Link from 'next/link';

interface RoomCardProps {
  id: string;
  propertyId: string;
  number: string;
  floor: number;
  capacity: number;
  status: RoomStatus;
  rentAmount: number;
  onEdit?: () => void;
  onDelete?: () => void;
  canEdit?: boolean;
  canDelete?: boolean;
}

export function RoomCard({
  id,
  propertyId,
  number,
  floor,
  capacity,
  status,
  rentAmount,
  onEdit,
  onDelete,
  canEdit = false,
  canDelete = false,
}: RoomCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case RoomStatus.VACANT:
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case RoomStatus.OCCUPIED:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case RoomStatus.MAINTENANCE:
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  return (
    <Card className='overflow-hidden transition-all hover:shadow-md'>
      <CardHeader className='pb-2'>
        <div className='flex items-start justify-between'>
          <CardTitle className='text-xl'>Room {number}</CardTitle>
          <Badge className={`${getStatusColor()}`}>{status}</Badge>
        </div>
        <CardDescription className='flex items-center gap-1'>
          <Home className='h-3 w-3' />
          Floor {floor}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-2 gap-2'>
          <div className='flex items-center gap-1 text-sm'>
            <Users className='h-4 w-4 text-slate-500' />
            <span>Capacity: {capacity}</span>
          </div>
          <div className='flex items-center gap-1 text-sm'>
            <DollarSign className='h-4 w-4 text-slate-500' />
            <span>₹{rentAmount}/month</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex justify-between gap-2 pt-2'>
        <Button variant='default' className='w-full'>
          <Link
            href={`/dashboard/properties/${propertyId}/rooms/${id}`}
            className='flex w-full items-center justify-center'
          >
            View Details
          </Link>
        </Button>
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
