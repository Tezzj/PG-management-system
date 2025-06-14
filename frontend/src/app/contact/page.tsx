'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Building2, Mail, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with your NestJS backend
    // Example: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) });
    console.log('Form submitted:', formData);
  };

  return (
    <div className='py-24'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl text-center'>
          <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
            Contact Us
          </h2>
          <p className='mt-6 text-lg leading-8 text-slate-600'>
            Have questions? We&apos;re here to help. Reach out to our team and
            we&apos;ll get back to you shortly.
          </p>
        </div>

        <div className='mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2'>
          <div>
            <Card className='p-6'>
              <h3 className='mb-6 text-lg font-semibold'>Get in Touch</h3>
              <div className='space-y-4'>
                <div className='flex items-center gap-x-3'>
                  <Mail className='h-5 w-5 text-slate-600' />
                  <span>support@pgmanager.com</span>
                </div>
                <div className='flex items-center gap-x-3'>
                  <Phone className='h-5 w-5 text-slate-600' />
                  <span>+91 (800) 123-4567</span>
                </div>
                <div className='flex items-center gap-x-3'>
                  <MapPin className='h-5 w-5 text-slate-600' />
                  <span>123 Business Avenue, Bangalore, India</span>
                </div>
                <div className='flex items-center gap-x-3'>
                  <Building2 className='h-5 w-5 text-slate-600' />
                  <span>Mon-Fri: 9:00 AM - 6:00 PM IST</span>
                </div>
              </div>
            </Card>
          </div>

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='space-y-2'>
              <Label htmlFor='name'>Name</Label>
              <Input
                id='name'
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='phone'>Phone</Label>
              <Input
                id='phone'
                type='tel'
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='message'>Message</Label>
              <Textarea
                id='message'
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
                className='min-h-[150px]'
              />
            </div>

            <Button type='submit' className='w-full'>
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
