import Link from "next/link";
import { ArrowRight, CalendarDays, CirclePlay } from "lucide-react";
import { NewsCard, SponsorStrip } from "@/components/Cards";
import {
  DynamicHeroNextMatch,
  DynamicMatchCards,
  DynamicPlayersGrid
} from "@/components/DynamicContent";
import { LocalizedText } from "@/components/LocalizedText";
import { SectionHeader } from "@/components/SectionHeader";
import { matches, news, players, siteStats, sponsors } from "@/data/site";

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[92svh] overflow-hidden pt-20">
        <img
          src="/images/hero-arena.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 hero-scrim" />
        <div className="relative mx-auto grid min-h-[calc(92svh-80px)] w-[min(1180px,calc(100%-32px))] items-end gap-10 pb-10 pt-24 lg:grid-cols-[1.05fr_0.72fr]">
          <div className="max-w-4xl animate-rise pb-8">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur-xl">
              <span className="size-2 rounded-full bg-afghan-green animate-softPulse" />
              <LocalizedText value={{ en: "National futsal identity", fa: "هویت فوتسال ملی" }} />
            </div>
            <h1 className="font-display text-5xl font-black leading-[0.95] text-white md:text-6xl lg:text-7xl">
              <LocalizedText
                value={{
                  en: "Built for the five-a-side future.",
                  fa: "ساخته شده برای آینده فوتسال."
                }}
              />
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-200 md:text-xl">
              <LocalizedText
                value={{
                  en: "A clean, fast, premium home for Afghanistan futsal: squad, fixtures, media, supporters, and the road ahead.",
                  fa: "خانه‌ای سریع، منظم و ممتاز برای فوتسال افغانستان: تیم، بازی‌ها، رسانه، هواداران و مسیر پیش‌رو."
                }}
              />
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/fixtures"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-ink-950 transition hover:-translate-y-1 hover:bg-afghan-gold"
              >
                <CalendarDays size={18} />
                <LocalizedText value={{ en: "Match center", fa: "مرکز بازی" }} />
              </Link>
              <Link
                href="/team"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-black text-white backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/15"
              >
                <CirclePlay size={18} />
                <LocalizedText value={{ en: "Meet the squad", fa: "معرفی تیم" }} />
              </Link>
            </div>
          </div>

          <DynamicHeroNextMatch initialMatch={matches[0]} />
        </div>
      </section>

      <section className="mx-auto grid w-[min(1180px,calc(100%-32px))] gap-3 py-6 md:grid-cols-3">
        {siteStats.map((stat) => (
          <div key={stat.label.en} className="sport-card rounded-3xl p-6">
            <p className="font-display text-4xl font-black light-text">{stat.value}</p>
            <p className="mt-1 text-sm muted-text">
              <LocalizedText value={stat.label} />
            </p>
          </div>
        ))}
      </section>

      <section className="mx-auto w-[min(1180px,calc(100%-32px))] py-20">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <SectionHeader
            eyebrow={{ en: "Squad", fa: "تیم" }}
            title={{ en: "Featured players", fa: "بازیکنان برجسته" }}
            summary={{
              en: "Compact profiles shaped for a national-team matchday experience.",
              fa: "پروفایل‌های فشرده برای تجربه روز مسابقه تیم ملی."
            }}
          />
          <Link href="/team" className="inline-flex items-center gap-2 font-black text-afghan-gold">
            <LocalizedText value={{ en: "Full team", fa: "تمام تیم" }} />
            <ArrowRight size={18} />
          </Link>
        </div>
        <DynamicPlayersGrid initialPlayers={players} limit={4} />
      </section>

      <section className="bg-[var(--page-soft)] py-20">
        <div className="mx-auto grid w-[min(1180px,calc(100%-32px))] gap-10 lg:grid-cols-[0.72fr_1fr]">
          <SectionHeader
            eyebrow={{ en: "Fixtures", fa: "بازی‌ها" }}
            title={{ en: "Match center", fa: "مرکز مسابقات" }}
            summary={{
              en: "Upcoming fixtures designed for fast scanning on mobile and desktop.",
              fa: "بازی‌های پیش‌رو برای مرور سریع در موبایل و دسکتاپ."
            }}
          />
          <DynamicMatchCards initialMatches={matches} limit={3} compact />
        </div>
      </section>

      <section className="mx-auto w-[min(1180px,calc(100%-32px))] py-20">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <SectionHeader
            eyebrow={{ en: "Latest", fa: "تازه‌ترین" }}
            title={{ en: "Newsroom", fa: "خبرها" }}
            summary={{
              en: "Short, clear stories from the team, supporters, and media archive.",
              fa: "خبرهای کوتاه و روشن از تیم، هواداران و آرشیف رسانه‌ای."
            }}
          />
          <Link href="/gallery" className="inline-flex items-center gap-2 font-black text-afghan-gold">
            <LocalizedText value={{ en: "View media", fa: "دیدن رسانه" }} />
            <ArrowRight size={18} />
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {news.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="mx-auto w-[min(1180px,calc(100%-32px))] pb-24">
        <SectionHeader
          align="center"
          eyebrow={{ en: "Partners", fa: "همکاران" }}
          title={{ en: "Built with national-team ambition", fa: "با آرمان تیم ملی" }}
        />
        <div className="mt-10">
          <SponsorStrip sponsors={sponsors} />
        </div>
      </section>
    </>
  );
}
