interface Item {
  text: string;
  description: string;
}

interface Section {
  title: string;
  content: string;
  items: Item[];
}

interface LegalSectionProps {
  section: Section;
}

export function LegalSection({ section }: LegalSectionProps) {
  return (
    <section className='mb-12'>
      <h2 className='mb-4 text-2xl font-semibold text-slate-800 dark:text-white'>
        {section.title}
      </h2>
      <p className='mb-6 text-slate-600 dark:text-slate-400'>
        {section.content}
      </p>
      <div className='grid gap-6 md:grid-cols-2'>
        {section.items.map((item, index) => (
          <div
            key={index}
            className='rounded-lg border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-800'
          >
            <h3 className='mb-2 font-medium text-slate-900 dark:text-white'>
              {item.text}
            </h3>
            <p className='text-sm text-slate-600 dark:text-slate-400'>
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
