import { legalData } from '@/lib/data/legal';
import { LegalSection } from '../legal-section-layout';

export default function PrivacyPolicy() {
  const { title, lastUpdated, sections } = legalData.privacy;

  return (
    <div className='min-h-screen'>
      <div className='container mx-auto max-w-4xl px-6 py-12'>
        <div className='mb-8 rounded-xl bg-white p-8 shadow-sm dark:border dark:border-slate-700 dark:bg-slate-800'>
          <h1 className='mb-2 text-4xl font-bold text-slate-900 dark:text-white'>
            {title}
          </h1>
          <p className='text-slate-600 dark:text-slate-400'>
            Last updated: {lastUpdated}
          </p>
        </div>

        <div className='space-y-12'>
          {sections.map((section, index) => (
            <LegalSection key={index} section={section} />
          ))}
        </div>
      </div>
    </div>
  );
}
