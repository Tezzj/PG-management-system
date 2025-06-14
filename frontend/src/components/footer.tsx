'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Building2,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from 'lucide-react';
import Link from 'next/link';
import { footerData } from '@/lib/data/footer';

export default function Footer() {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription - integrate with your NestJS backend
  };

  const socialIcons = {
    Facebook,
    Twitter,
    Instagram,
    LinkedIn: Linkedin,
  };

  return (
    <footer className='bottom-0 w-full border-t px-6 py-12'>
      <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
        {/* Company Info */}
        <div className='space-y-4'>
          <div className='flex items-center space-x-2'>
            <Building2 className='h-6 w-6' />
            <h3 className='text-xl font-bold'>{footerData.company.name}</h3>
          </div>
          <p className='text-slate-600'>{footerData.company.description}</p>
          <div className='flex space-x-4'>
            {footerData.company.socialLinks.map((link) => {
              const Icon = socialIcons[link.name as keyof typeof socialIcons];
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className='transition hover:text-slate-600'
                >
                  <Icon className='h-5 w-5' />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Quick Links */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>Quick Links</h3>
          <ul className='space-y-2'>
            {footerData.quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className='transition hover:text-slate-600'
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>Contact Us</h3>
          <div className='space-y-3'>
            {footerData.contactInfo.map((contact) => {
              const Icon = contact.icon;
              return (
                <div key={contact.text} className='flex items-center space-x-3'>
                  <Icon className='h-5 w-5 text-slate-600' />
                  <span>{contact.text}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Newsletter */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>
            {footerData.newsletter.title}
          </h3>
          <p className='text-slate-600'>{footerData.newsletter.description}</p>
          <form onSubmit={handleNewsletterSubmit} className='space-y-2'>
            <Input
              type='email'
              placeholder={footerData.newsletter.placeholder}
              className='border-slate-800'
            />
            <Button type='submit' className='w-full'>
              {footerData.newsletter.buttonText}
            </Button>
          </form>
        </div>
      </div>

      <Separator className='my-8 bg-slate-200 dark:bg-slate-800' />

      <div className='flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0'>
        <p className='text-sm text-slate-600'>
          © {new Date().getFullYear()} {footerData.company.name}. All rights
          reserved.
        </p>
        <div className='flex space-x-6 text-sm'>
          {footerData.legalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className='transition hover:text-slate-600'
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
