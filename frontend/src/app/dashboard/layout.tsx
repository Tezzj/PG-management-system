import type React from 'react';
import type { Metadata } from 'next';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: 'Dashboard | PG Management System',
  description: 'Manage your PG accommodations efficiently',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
          <SidebarTrigger className='-ml-1' />
          <Separator orientation='vertical' className='mr-2 h-4' />
          <div className='font-semibold'>PG Management System</div>
        </header>
        <main className='flex-1 overflow-auto p-6'>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
