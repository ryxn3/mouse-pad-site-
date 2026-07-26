import { PageHeader } from '@/components/ui/PageHeader';
import { Reveal } from '@/components/ui/Reveal';

export interface InfoSection {
  heading: string;
  body: string[];
}

interface InfoPageProps {
  eyebrow: string;
  title: string;
  description?: string;
  sections: InfoSection[];
  updated?: string;
}

/** Shared layout for policy / information pages. */
export function InfoPage({
  eyebrow,
  title,
  description,
  sections,
  updated,
}: InfoPageProps) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} description={description} />
      <article className="container-px py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          {updated && (
            <p className="mb-12 text-xs uppercase tracking-widest2 text-ink-faint">
              Last updated {updated}
            </p>
          )}
          <div className="flex flex-col gap-12">
            {sections.map((section, i) => (
              <Reveal key={section.heading} delay={i * 0.05}>
                <section>
                  <h2 className="heading-md mb-4">{section.heading}</h2>
                  <div className="flex flex-col gap-4">
                    {section.body.map((p, j) => (
                      <p key={j} className="leading-relaxed text-ink-muted">
                        {p}
                      </p>
                    ))}
                  </div>
                </section>
              </Reveal>
            ))}
          </div>
        </div>
      </article>
    </>
  );
}
