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
import { PropertyType } from '@/lib/types/property';
import { Building2, Home, MapPin, Edit, Trash } from 'lucide-react';
import Link from 'next/link';

interface PropertyCardProps {
  id: string;
  name: string;
  propertyType: PropertyType;
  address: string;
  city: string;
  state: string;
  pincode: string;
  totalRooms: number;
  onEdit?: () => void;
  onDelete?: () => void;
  onSelect?: () => void;
  canEdit?: boolean;
  canDelete?: boolean;
}

export function PropertyCard({
  id,
  name,
  propertyType,
  address,
  city,
  state,
  pincode,
  totalRooms,
  onEdit,
  onDelete,
  onSelect,
  canEdit = false,
  canDelete = false,
}: PropertyCardProps) {
  const getPropertyTypeIcon = () => {
    switch (propertyType) {
      case PropertyType.PG:
        return <Building2 className='h-4 w-4' />;
      case PropertyType.HOSTEL:
        return <Building2 className='h-4 w-4' />;
      case PropertyType.APARTMENT:
        return <Home className='h-4 w-4' />;
      case PropertyType.HOTEL:
        return <Building2 className='h-4 w-4' />;
      default:
        return <Building2 className='h-4 w-4' />;
    }
  };

  return (
    <Card className='overflow-hidden transition-all hover:shadow-md'>
      <CardHeader className='pb-2'>
        <div className='flex items-start justify-between'>
          <CardTitle className='text-xl'>{name}</CardTitle>
          <Badge variant='outline' className='flex items-center gap-1'>
            {getPropertyTypeIcon()}
            {propertyType}
          </Badge>
        </div>
        <CardDescription className='flex items-center gap-1'>
          <MapPin className='h-3 w-3' />
          {address}, {city}, {state} - {pincode}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex items-center gap-2'>
          <Badge variant='secondary' className='text-xs'>
            {totalRooms} Rooms
          </Badge>
        </div>
      </CardContent>
      <CardFooter className='flex justify-between gap-2 pt-2'>
        <Button variant='default' className='w-full' onClick={onSelect}>
          <Link
            href={`/dashboard/properties/${id}`}
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
