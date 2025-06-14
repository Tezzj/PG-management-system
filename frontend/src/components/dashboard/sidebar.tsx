'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useRoleBasedAccess } from '@/lib/hooks/useRoleBasedAccess';
import { useSelector } from 'react-redux';
import { selectSelectedProperty } from '@/lib/redux/features/propertySlice';
import {
  Building2,
  Home,
  Users,
  Bell,
  Wrench,
  Receipt,
  Settings,
  ChevronRight,
  LayoutDashboard,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';

export function DashboardSidebar() {
  const pathname = usePathname();
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const {
    isOwner,
    isModerator,
    canManageProperties,
    canManageRooms,
    canManageResidents,
  } = useRoleBasedAccess();
  const selectedProperty = useSelector(selectSelectedProperty);

  const routes = [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      href: '/dashboard',
      active: pathname === '/dashboard',
      roles: ['OWNER', 'MODERATOR', 'GUEST'],
    },
    {
      label: 'Properties',
      icon: Building2,
      href: '/dashboard/properties',
      active: pathname === '/dashboard/properties',
      roles: ['OWNER', 'MODERATOR', 'GUEST'],
    },
  ];

  // Property-specific routes that are only shown when a property is selected
  const propertyRoutes = selectedProperty
    ? [
        {
          label: 'Rooms',
          icon: Home,
          href: `/dashboard/properties/${selectedProperty.id}/rooms`,
          active: pathname.includes(
            `/dashboard/properties/${selectedProperty.id}/rooms`
          ),
          roles: ['OWNER', 'MODERATOR', 'GUEST'],
        },
        {
          label: 'Residents',
          icon: Users,
          href: `/dashboard/properties/${selectedProperty.id}/residents`,
          active: pathname.includes(
            `/dashboard/properties/${selectedProperty.id}/residents`
          ),
          roles: ['OWNER', 'MODERATOR'],
          show: canManageResidents,
        },
        {
          label: 'Announcements',
          icon: Bell,
          href: `/dashboard/properties/${selectedProperty.id}/announcements`,
          active: pathname.includes(
            `/dashboard/properties/${selectedProperty.id}/announcements`
          ),
          roles: ['OWNER', 'MODERATOR', 'GUEST'],
        },
        {
          label: 'Maintenance',
          icon: Wrench,
          href: `/dashboard/properties/${selectedProperty.id}/maintenance`,
          active: pathname.includes(
            `/dashboard/properties/${selectedProperty.id}/maintenance`
          ),
          roles: ['OWNER', 'MODERATOR', 'GUEST'],
        },
        {
          label: 'Payments',
          icon: Receipt,
          href: `/dashboard/properties/${selectedProperty.id}/payments`,
          active: pathname.includes(
            `/dashboard/properties/${selectedProperty.id}/payments`
          ),
          roles: ['OWNER', 'MODERATOR', 'GUEST'],
        },
        {
          label: 'Settings',
          icon: Settings,
          href: `/dashboard/properties/${selectedProperty.id}/settings`,
          active: pathname.includes(
            `/dashboard/properties/${selectedProperty.id}/settings`
          ),
          roles: ['OWNER', 'MODERATOR'],
          show: isOwner || isModerator,
        },
      ]
    : [];

  return (
    <Sidebar variant='sidebar'>
      <SidebarHeader>
        <div className='flex items-center gap-2 px-4 py-2'>
          <Link
            href='/dashboard'
            className='flex items-center gap-2 font-semibold text-sidebar-foreground transition-colors hover:text-sidebar-accent-foreground'
          >
            <LayoutDashboard className='h-6 w-6' />
            <span>Dashboard</span>
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className='flex items-center justify-between'>
            <span>Main Menu</span>
            <ChevronRight className='h-4 w-4' />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {routes.map((route) => (
                <SidebarMenuItem key={route.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={route.active}
                    tooltip={route.label}
                  >
                    <Link href={route.href}>
                      <route.icon className='h-4 w-4' />
                      <span>{route.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {selectedProperty && (
          <>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel className='flex items-center justify-between'>
                <span className='truncate'>{selectedProperty.name}</span>
                <ChevronRight className='h-4 w-4 flex-shrink-0' />
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {propertyRoutes
                    .filter((route) => route.show !== false)
                    .map((route) => (
                      <SidebarMenuItem key={route.href}>
                        <SidebarMenuButton
                          asChild
                          isActive={route.active}
                          tooltip={route.label}
                        >
                          <Link href={route.href}>
                            <route.icon className='h-4 w-4' />
                            <span>{route.label}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
