import type { LocalizedString } from "@/types/site";
import { LocalizedText } from "@/components/LocalizedText";

type PageIntroProps = {
  eyebrow: LocalizedString;
  title: LocalizedString;
  summary: LocalizedString;
};

export function PageIntro({ eyebrow, title, summary }: PageIntroProps) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--line)] bg-[var(--page-soft)] pt-28">
      <div className="absolute inset-x-0 top-0 h-1 afghan-rail" />
      <div className="page-shell py-14 md:py-20">
        <div className="max-w-4xl animate-rise">
          <p className="eyebrow mb-4">
            <LocalizedText value={eyebrow} />
          </p>
          <h1 className="font-display text-4xl font-black leading-tight light-text md:text-6xl">
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
