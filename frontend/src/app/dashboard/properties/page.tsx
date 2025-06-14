'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  useGetPropertiesQuery,
  useDeletePropertyMutation,
} from '@/lib/redux/api/propertyApi';
import { PropertyCard } from '@/components/dashboard/property-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRoleBasedAccess } from '@/lib/hooks/useRoleBasedAccess';
import { Building2, Search } from 'lucide-react';
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
import { Property } from '@/lib/types/property';
import { toast } from '@/components/ui/use-toast';

export default function PropertiesPage() {
  const router = useRouter();
  const { data: properties, isLoading, error } = useGetPropertiesQuery();
  const [deleteProperty] = useDeletePropertyMutation();
  const { isOwner, isModerator } = useRoleBasedAccess();
  const [searchTerm, setSearchTerm] = useState('');
  const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null);

  const handleDeleteProperty = async () => {
    if (propertyToDelete) {
      try {
        await deleteProperty(propertyToDelete).unwrap();
        setPropertyToDelete(null);
        toast({
          title: 'Property deleted',
          description: 'The property has been successfully deleted.',
        });
      } catch (error) {
        console.error('Failed to delete property:', error);
        toast({
          title: 'Delete Failed',
          description: 'Could not delete the property. Please try again.',
          variant: 'destructive',
        });
      }
    }
  };

  const normalizedSearchTerm = searchTerm.trim().toLowerCase();

  const filteredProperties = useMemo(() => {
    return properties?.filter(
      (property: Property) =>
        property.name.toLowerCase().includes(normalizedSearchTerm) ||
        property.address.toLowerCase().includes(normalizedSearchTerm) ||
        property.city.toLowerCase().includes(normalizedSearchTerm)
    );
  }, [properties, normalizedSearchTerm]);

  const getEmptyStateMessage = () => {
    if (searchTerm) return 'Try adjusting your search terms.';
    if (isOwner) return 'Add your first property to get started.';
    return 'No properties have been assigned to you yet.';
  };

  if (isLoading) {
    return (
      <div className='text-center text-slate-500'>Loading properties...</div>
    );
  }

  if (error) {
    return (
      <div className='text-center text-red-500'>
        Failed to load properties. Please try again later.
      </div>
    );
  }

  return (
    <div className='space-y-8'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>Properties</h1>
        {isOwner && (
          <Button asChild>
            <Link href='/dashboard/properties/new'>Add Property</Link>
          </Button>
        )}
      </div>

      <div className='relative'>
        <Search
          className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500'
          aria-hidden='true'
        />
        <Input
          placeholder='Search properties...'
          className='pl-10'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {filteredProperties?.map((property: Property) => (
          <PropertyCard
            key={property.id}
            id={property.id}
            name={property.name}
            propertyType={property.propertyType}
            address={property.address}
            city={property.city}
            state={property.state}
            pincode={property.pincode}
            totalRooms={property.totalRooms}
            onEdit={() =>
              router.push(`/dashboard/properties/${property.id}/edit`)
            }
            onDelete={() => setPropertyToDelete(property.id)}
            canEdit={isOwner || isModerator}
            canDelete={isOwner}
          />
        ))}

        {filteredProperties?.length === 0 && (
          <div className='col-span-3 rounded-lg border border-dashed p-8 text-center'>
            <Building2
              className='mx-auto h-12 w-12 text-slate-300'
              aria-hidden='true'
            />
            <h3 className='mt-4 text-lg font-medium'>No properties found</h3>
            <p className='mt-2 text-sm text-slate-500'>
              {getEmptyStateMessage()}
            </p>
            {isOwner && !searchTerm && (
              <Button asChild className='mt-4'>
                <Link href='/dashboard/properties/new'>Add Property</Link>
              </Button>
            )}
          </div>
        )}
      </div>

      <AlertDialog
        open={!!propertyToDelete}
        onOpenChange={() => setPropertyToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              property and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteProperty}
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
