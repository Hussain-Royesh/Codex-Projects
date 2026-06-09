import type { LocalizedString } from "@/types/site";
import { LocalizedText } from "@/components/LocalizedText";

type PageIntroProps = {
  eyebrow: LocalizedString;
  title: LocalizedString;
  summary: LocalizedString;
};

export function PageIntro({ eyebrow, title, summary }: PageIntroProps) {
  return (
    <section className="relative overflow-hidden pt-32">
      <div className="absolute inset-x-0 top-20 h-px afghan-rail" />
      <div className="mx-auto w-[min(1180px,calc(100%-32px))] py-16 md:py-24">
        <div className="max-w-4xl animate-rise">
          <p className="eyebrow mb-4">
            <LocalizedText value={eyebrow} />
          </p>
          <h1 className="font-display text-4xl font-black leading-[0.98] light-text md:text-6xl">
            <LocalizedText value={title} />
          </h1>
          <p className="mt-6 max-w-2xl text-lg muted-text md:text-xl">
            <LocalizedText value={summary} />
          </p>
        </div>
      </div>
    </section>
  );
}
