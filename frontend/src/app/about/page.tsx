'use client';

import { statsData, valuesData } from '@/lib/data/about';

export default function About() {
  return (
    <div className='flex min-h-screen flex-col'>
      {/* Hero Section */}
      <section className='py-24'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl lg:text-center'>
            <h2 className='text-4xl font-bold tracking-tight sm:text-6xl'>
              About PGManager
            </h2>
            <p className='mt-6 text-lg leading-8 text-slate-600'>
              We&apos;re revolutionizing how PG accommodations are managed
              across the country, making it easier for owners and better for
              tenants.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className='py-24'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-16'>
            <div>
              <h3 className='text-3xl font-bold tracking-tight'>Our Mission</h3>
              <p className='mt-6 text-lg leading-8 text-slate-600'>
                To provide PG owners with the tools they need to efficiently
                manage their properties while ensuring a great living experience
                for tenants.
              </p>
            </div>
            <div>
              <h3 className='text-3xl font-bold tracking-tight'>Our Vision</h3>
              <p className='mt-6 text-lg leading-8 text-slate-600'>
                To become the leading PG management platform, setting industry
                standards for efficiency, transparency, and user experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className='bg-slate-900 py-24'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4'>
            {statsData.map((stat) => (
              <div key={stat.label} className='text-center'>
                <div className='text-4xl font-bold text-white'>
                  {stat.number}
                </div>
                <div className='mt-2 text-sm text-slate-400'>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className='py-24'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl lg:text-center'>
            <h2 className='text-3xl font-bold tracking-tight'>Our Values</h2>
            <p className='mt-6 text-lg leading-8 text-slate-600'>
              Built on strong principles that guide everything we do.
            </p>
          </div>
          <div className='mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none'>
            <dl className='grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4'>
              {valuesData.map((value) => (
                <div
                  key={value.name}
                  className='flex flex-col items-center text-center'
                >
                  <dt className='flex flex-col items-center'>
                    <div className='rounded-lg bg-slate-900 p-4'>
                      <value.icon
                        className='h-6 w-6 text-white'
                        aria-hidden='true'
                      />
                    </div>
                    <div className='mt-4 text-lg font-semibold leading-8'>
                      {value.name}
                    </div>
                  </dt>
                  <dd className='mt-2 text-base leading-7 text-slate-600'>
                    {value.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </div>
  );
}
