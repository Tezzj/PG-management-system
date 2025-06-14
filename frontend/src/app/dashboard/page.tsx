'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetMeQuery } from '@/lib/redux/api/authApi';
import { useGetPropertiesQuery } from '@/lib/redux/api/propertyApi';
import { setCredentials } from '@/lib/redux/features/authSlice';
// import { setProperties } from '@/lib/redux/features/propertySlice';
import { StatsCard } from '@/components/dashboard/stats-card';
import { PropertyCard } from '@/components/dashboard/property-card';
import { Button } from '@/components/ui/button';
import type { UserRole } from '@/lib/types/user';
import { useRoleBasedAccess } from '@/lib/hooks/useRoleBasedAccess';
import { Building2, Home, Users, Wrench } from 'lucide-react';
import Link from 'next/link';
import { Property } from '@/lib/types/property';

export default function DashboardPage() {
  const dispatch = useDispatch();
  const {
    data: user,
    isLoading: isUserLoading,
    error: userError,
  } = useGetMeQuery();
  const {
    data: properties,
    isLoading: isPropertiesLoading,
    error: propertiesError,
  } = useGetPropertiesQuery();
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const { isOwner, isModerator, isGuest } = useRoleBasedAccess();

  useEffect(() => {
    if (user && ['OWNER', 'MODERATOR', 'GUEST'].includes(user.role)) {
      dispatch(
        setCredentials({ userId: user.userId, role: user.role as UserRole })
      );
    }
  }, [user, dispatch]);

  // useEffect(() => {
  //   if (properties) {
  //     dispatch(setProperties(properties));
  //   }
  // }, [properties, dispatch]);

  if (userError || propertiesError) {
    console.error(
      'Error loading dashboard data:',
      userError || propertiesError
    );
    return <div className='text-red-500'>Failed to load dashboard data.</div>;
  }

  const getTotalRooms = (props: Property[] = []) =>
    props.reduce((acc, property) => acc + property.totalRooms, 0);

  const isLoading = isUserLoading || isPropertiesLoading;

  if (isLoading) {
    return (
      <div className='space-y-4'>
        <div className='h-8 w-48 animate-pulse rounded bg-slate-200' />
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className='h-24 animate-pulse rounded bg-slate-200'
              />
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-8'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>Dashboard</h1>
        {isOwner && (
          <Button asChild>
            <Link href='/dashboard/properties/new'>Add Property</Link>
          </Button>
        )}
      </div>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <StatsCard
          title='Total Properties'
          value={properties?.length || 0}
          icon={Building2}
        />
        <StatsCard
          title='Total Rooms'
          value={getTotalRooms(properties)}
          icon={Home}
        />
        <StatsCard
          title='Occupancy Rate'
          value='78%'
          icon={Users}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard title='Pending Maintenance' value='5' icon={Wrench} />
      </div>

      <div>
        <h2 className='mb-4 text-2xl font-semibold'>Recent Properties</h2>
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {properties
            ?.slice(0, 3)
            .map((property: Property) => (
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
                canEdit={isOwner || isModerator}
                canDelete={isOwner}
              />
            ))}
          {properties?.length === 0 && (
            <div className='col-span-3 rounded-lg border border-dashed p-8 text-center'>
              <h3 className='text-lg font-medium'>No properties found</h3>
              <p className='mt-2 text-sm text-slate-500'>
                {isOwner
                  ? 'Add your first property to get started.'
                  : 'No properties have been assigned to you yet.'}
              </p>
              {isOwner && (
                <Button asChild className='mt-4'>
                  <Link href='/dashboard/properties/new'>Add Property</Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
