'use client';

import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { UserCircle2, Users2, User } from 'lucide-react';
import { Control } from 'react-hook-form';
import { RegisterFormData } from '@/lib/types/auth';

interface RoleSelectorProps {
  control: Control<RegisterFormData>;
  field: {
    value: string;
    onChange: (value: string) => void;
  };
}

export function RoleSelector({ field }: RoleSelectorProps) {
  return (
    <FormItem>
      <FormLabel>I&apos;m a</FormLabel>
      <FormControl>
        <ToggleGroup
          type='single'
          value={field.value}
          onValueChange={field.onChange}
          className='justify-between'
        >
          <ToggleGroupItem value='OWNER' aria-label='Owner'>
            <UserCircle2 className='mr-2 h-4 w-4' />
            Owner
          </ToggleGroupItem>
          <ToggleGroupItem value='MODERATOR' aria-label='Moderator'>
            <Users2 className='mr-2 h-4 w-4' />
            Moderator
          </ToggleGroupItem>
          <ToggleGroupItem value='GUEST' aria-label='Guest'>
            <User className='mr-2 h-4 w-4' />
            Guest
          </ToggleGroupItem>
        </ToggleGroup>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
