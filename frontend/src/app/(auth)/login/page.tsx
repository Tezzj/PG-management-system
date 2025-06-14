'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useActionState, startTransition } from 'react';
import Link from 'next/link';
import { AuthLayout } from '@/components/auth/auth-layout';
import { loginSchema } from '@/lib/validations/auth';
import type { LoginFormData } from '@/lib/types/auth';
import login from './login';

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, {
    error: '',
  });

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: LoginFormData) {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    startTransition(() => {
      formAction(formData);
    });
  }

  return (
    <AuthLayout
      title='Welcome back'
      subtitle='Enter your credentials to sign in to your account'
    >
      {state.error && (
        <div className='mb-4 rounded-md bg-red-500 p-3 text-sm text-white'>
          {state.error}
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='name@example.com' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type='password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='w-full' disabled={pending}>
            {pending ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
      </Form>
      <p className='px-8 text-center text-sm text-muted-foreground'>
        Don&apos;t have an account?{' '}
        <Link
          href='/register'
          className='underline underline-offset-4 hover:text-primary'
        >
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
}
