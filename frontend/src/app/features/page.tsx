'use client';

import { featuresData } from '@/lib/data/features';

export default function Features() {
  return (
    <div className='py-24'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl lg:text-center'>
          <h2 className='text-4xl font-bold tracking-tight sm:text-6xl'>
            Our Features
          </h2>
          <p className='mt-6 text-lg leading-8 text-slate-600'>
            Discover all the powerful features that make PGManager the perfect
            solution for your PG accommodation management needs.
          </p>
        </div>

        <div className='mt-16 space-y-32'>
          {featuresData.map((section) => (
            <section
              key={section.title}
              className='flex min-h-screen flex-col items-center justify-center'
            >
              <div className='mx-auto max-w-2xl lg:text-center'>
                <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
                  {section.title}
                </h2>
                <p className='mt-6 text-lg leading-8 text-slate-600'>
                  {section.description}
                </p>
              </div>

              <div className='mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none'>
                <dl className='grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2'>
                  {section.features.map((feature) => (
                    <div key={feature.name} className='flex flex-col'>
                      <dt className='flex items-center gap-x-3 text-lg font-semibold leading-7'>
                        <feature.icon className='h-6 w-6 text-slate-600' />
                        {feature.name}
                      </dt>
                      <dd className='mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600'>
                        <p className='flex-auto'>{feature.description}</p>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
