'use client';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Building2, Menu, User } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { useContext } from 'react';
import { AuthContext } from '@/app/(auth)/auth-context';
import { ModeToggle } from './theme-toggle-button';

const navigationLinks = [
  { title: 'Features', href: '/features' },
  { title: 'Pricing', href: '/pricing' },
  { title: 'About', href: '/about' },
  { title: 'Contact', href: '/contact' },
];

interface HeaderProps {
  logout: () => Promise<void>;
}

export default function Header({ logout }: HeaderProps) {
  const isAuthenticated = useContext(AuthContext);

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='flex h-16 items-center px-4 sm:px-6 lg:px-8'>
        {/* Mobile Menu Button */}
        <Sheet>
          <SheetTrigger asChild className='md:hidden'>
            <Button variant='ghost' size='icon' className='mr-2'>
              <Menu className='h-5 w-5' />
              <span className='sr-only'>Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side='left' className='w-[300px] sm:w-[400px]'>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className='mt-4 flex flex-col space-y-3'>
              {navigationLinks.map((item) => (
                <Link key={item.href} href={item.href} legacyBehavior passHref>
                  {item.title}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        <div className='mr-6 flex items-center gap-2'>
          <Building2 className='h-6 w-6' />
          <Link href='/' className='text-lg font-semibold'>
            PGManager
          </Link>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu className='hidden md:flex'>
          <NavigationMenuList>
            {navigationLinks.map((item) => (
              <NavigationMenuItem key={item.href}>
                <Link href={item.href} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {item.title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className='ml-auto flex items-center space-x-4 pr-4'>
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='icon' className='relative'>
                  <User className='h-5 w-5' />
                  <span className='sr-only'>Open user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem asChild>
                  <Link className='cursor-pointer' href='/dashboard'>
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link className='cursor-pointer' href='/dashboard/profile'>
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Button
                    variant={'destructive'}
                    onClick={async () => await logout()}
                    className='w-full cursor-pointer'
                  >
                    Log out
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant='ghost' size='sm' asChild>
                <Link href='/login'>Sign In</Link>
              </Button>
              <Button size='sm' asChild>
                <Link href='/register'>Get Started</Link>
              </Button>
            </>
          )}
        </div>
        <ModeToggle />
      </div>
    </header>
  );
}
