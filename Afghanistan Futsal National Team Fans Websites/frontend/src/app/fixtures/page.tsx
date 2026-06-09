import { DynamicFixtureTable, DynamicMatchCards } from "@/components/DynamicContent";
import { PageIntro } from "@/components/PageIntro";
import { SectionHeader } from "@/components/SectionHeader";
import { matches } from "@/data/site";

export const metadata = {
  title: "Fixtures | Afghanistan Futsal"
};

export default function FixturesPage() {
  return (
    <>
      <PageIntro
        eyebrow={{ en: "Fixtures", fa: "بازی‌ها" }}
        title={{ en: "Match calendar", fa: "تقویم مسابقات" }}
        summary={{
          en: "A clear match center for upcoming fixtures, venues, kickoff times, and supporter notes.",
          fa: "مرکز روشن برای بازی‌های پیش‌رو، محل برگزاری، زمان آغاز و یادداشت‌های هواداری."
        }}
      />

      <section className="page-shell grid gap-5 pb-20 pt-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeader
            eyebrow={{ en: "Upcoming", fa: "پیش‌رو" }}
            title={{ en: "Next moments", fa: "رویدادهای بعدی" }}
            summary={{
              en: "This list now refreshes from the backend after admin edits.",
              fa: "این فهرست اکنون پس از ویرایش مدیر از بک‌اند تازه می‌شود."
            }}
          />
        </div>
        <DynamicMatchCards initialMatches={matches} />
      </section>

      <section className="section-band section-pad">
        <div className="page-shell">
          <DynamicFixtureTable initialMatches={matches} />
        </div>
      </section>
    </>
  );
}
