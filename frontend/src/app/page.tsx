'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { featuresData } from '@/lib/data/home';

export default function Home() {
  return (
    <div className='flex min-h-screen flex-col'>
      {/* Hero Section */}
      <section className='relative px-6 py-24 md:py-32 lg:px-8 lg:py-40'>
        <div className='mx-auto max-w-7xl'>
          <div className='text-center'>
            <h1 className='bg-gradient-to-r from-slate-500 to-slate-900 bg-clip-text py-2 text-4xl font-bold tracking-tight text-transparent dark:from-slate-100 sm:text-6xl'>
              Simplify Your PG Management
            </h1>
            <p className='mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600'>
              Streamline your paying guest accommodation management with our
              comprehensive solution. Handle rent collection, maintenance
              requests, and utility bills effortlessly.
            </p>
            <div className='mt-10 flex items-center justify-center gap-x-6'>
              <Button asChild size='lg'>
                <Link href='/register'>
                  Get Started <ArrowRight className='ml-2 h-4 w-4' />
                </Link>
              </Button>
              <Button variant='outline' size='lg' asChild>
                <Link href='/contact'>Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-24'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl text-center'>
            <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
              Everything you need to manage your PG
            </h2>
            <p className='mt-6 text-lg leading-8 text-slate-600'>
              Our platform provides all the tools you need to efficiently manage
              your paying guest accommodations.
            </p>
          </div>
          <div className='mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none'>
            <dl className='grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3'>
              {featuresData.map((feature) => (
                <div key={feature.title} className='flex flex-col'>
                  <dt className='text-lg font-semibold leading-7'>
                    <div className='mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900'>
                      <feature.icon
                        className='h-6 w-6 text-white'
                        aria-hidden='true'
                      />
                    </div>
                    {feature.title}
                  </dt>
                  <dd className='mt-1 flex flex-auto flex-col text-base leading-7 text-slate-600'>
                    <p className='flex-auto'>{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-24'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl text-center'>
            <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
              Ready to streamline your PG management?
            </h2>
            <p className='mt-6 text-lg leading-8 text-slate-600'>
              Join thousands of PG owners who have simplified their management
              process with our platform.
            </p>
            <div className='mt-10 flex items-center justify-center gap-x-6'>
              <Button asChild size='lg'>
                <Link href='/register'>Start Free Trial</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
