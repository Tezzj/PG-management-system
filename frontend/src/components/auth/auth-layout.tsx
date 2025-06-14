'use client';

import { UserCircle2 } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className='container relative grid min-h-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
        <div className='absolute inset-0 bg-slate-900' />
        <div className='relative z-20 flex items-center text-lg font-medium'>
          <UserCircle2 className='mr-2 h-6 w-6' />
          PGManager
        </div>
        <div className='relative z-20 mt-auto'>
          <blockquote className='space-y-2'>
            <p className='text-lg'>
              &ldquo;This platform has revolutionized how we manage our workflow
              and collaborate with our team.&rdquo;
            </p>
            <footer className='text-sm'>Ankush Singh</footer>
          </blockquote>
        </div>
      </div>
      <div className='lg:p-8'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col space-y-2 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight'>{title}</h1>
            <p className='text-sm text-muted-foreground'>{subtitle}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
