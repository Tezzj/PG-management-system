'use client';

import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { plans } from '@/lib/data/pricing';

export default function Pricing() {
  return (
    <div className='py-24'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-4xl text-center'>
          <h2 className='text-4xl font-bold tracking-tight'>
            Simple, transparent pricing
          </h2>
          <p className='mt-6 text-lg leading-8 text-slate-600'>
            Choose the perfect plan for your PG management needs. All plans
            include a 14-day free trial.
          </p>
        </div>
        <div className='isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 xl:gap-x-12'>
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl p-8 ring-1 ring-slate-200 ${
                plan.popular
                  ? 'bg-slate-900 text-white ring-slate-900'
                  : 'bg-white text-slate-900 ring-slate-200'
              }`}
            >
              <h3 className='text-lg font-semibold leading-8'>{plan.name}</h3>
              <p
                className={`mt-4 text-sm leading-6 ${
                  plan.popular ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                {plan.description}
              </p>
              <p className='mt-6 flex items-baseline gap-x-1'>
                <span className='text-4xl font-bold tracking-tight'>
                  {plan.price}
                </span>
                <span
                  className={`text-sm font-semibold leading-6 ${
                    plan.popular ? 'text-slate-300' : 'text-slate-600'
                  }`}
                >
                  /month
                </span>
              </p>
              <ul
                role='list'
                className={`mt-8 space-y-3 text-sm leading-6 ${
                  plan.popular ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                {plan.features.map((feature) => (
                  <li key={feature} className='flex gap-x-3'>
                    <Check
                      className={`h-6 w-5 flex-none ${
                        plan.popular ? 'text-white' : 'text-slate-600'
                      }`}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className='mt-8 w-full'
                variant={plan.popular ? 'secondary' : 'default'}
              >
                <Link
                  href={plan.cta === 'Contact Sales' ? '/contact' : '/register'}
                >
                  {plan.cta}
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
