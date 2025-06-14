'use client';

import { useGetMeQuery } from '@/lib/redux/api/authApi';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserRole } from '@/lib/types/user';
import { CalendarDays, Mail, Phone, User } from 'lucide-react';
import { format } from 'date-fns';

export default function ProfilePage() {
  const { data: user, isLoading } = useGetMeQuery();

  const getRoleLabel = (role?: UserRole) => {
    switch (role) {
      case UserRole.OWNER:
        return 'Owner';
      case UserRole.MODERATOR:
        return 'Manager';
      case UserRole.GUEST:
        return 'Tenant';
      default:
        return 'User';
    }
  };

  if (isLoading) {
    return <div>Loading profile...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className='mx-auto max-w-4xl space-y-8'>
      <h1 className='text-3xl font-bold'>My Profile</h1>

      <div className='grid gap-8 md:grid-cols-3'>
        <Card className='md:col-span-1'>
          <CardHeader className='flex flex-col items-center justify-center'>
            <Avatar className='h-24 w-24'>
              <AvatarImage
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.firstName} ${user.lastName}`}
                alt={`${user.firstName} ${user.lastName}`}
              />
              <AvatarFallback>
                {user.firstName?.charAt(0)}
                {user.lastName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <CardTitle className='mt-4 text-center'>
              {user.firstName} {user.lastName}
            </CardTitle>
            <CardDescription className='text-center'>
              {getRoleLabel(user.role as UserRole)}
            </CardDescription>
          </CardHeader>
          <CardContent className='flex flex-col items-center'>
            <Button className='mt-4 w-full'>Edit Profile</Button>
          </CardContent>
        </Card>

        <Card className='md:col-span-2'>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Your personal details and contact information
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='grid gap-4 md:grid-cols-2'>
              <div className='space-y-1'>
                <p className='text-sm font-medium text-slate-500'>First Name</p>
                <p>{user.firstName}</p>
              </div>
              <div className='space-y-1'>
                <p className='text-sm font-medium text-slate-500'>Last Name</p>
                <p>{user.lastName}</p>
              </div>
            </div>

            <div className='space-y-1'>
              <div className='flex items-center gap-2'>
                <Mail className='h-4 w-4 text-slate-500' />
                <p className='text-sm font-medium text-slate-500'>Email</p>
              </div>
              <p>{user.email}</p>
            </div>

            <div className='space-y-1'>
              <div className='flex items-center gap-2'>
                <Phone className='h-4 w-4 text-slate-500' />
                <p className='text-sm font-medium text-slate-500'>Phone</p>
              </div>
              <p>{user.phone}</p>
            </div>

            <div className='space-y-1'>
              <div className='flex items-center gap-2'>
                <User className='h-4 w-4 text-slate-500' />
                <p className='text-sm font-medium text-slate-500'>Role</p>
              </div>
              <p>{getRoleLabel(user.role as UserRole)}</p>
            </div>

            <div className='space-y-1'>
              <div className='flex items-center gap-2'>
                <CalendarDays className='h-4 w-4 text-slate-500' />
                <p className='text-sm font-medium text-slate-500'>
                  Member Since
                </p>
              </div>
              <p>{format(new Date(user.createdAt), 'PPP')}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
