import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CirclePlay,
  Images,
  Newspaper,
  UsersRound
} from "lucide-react";
import { NewsCard, SponsorStrip } from "@/components/Cards";
import {
  DynamicHeroNextMatch,
  DynamicMatchCards,
  DynamicPlayersGrid
} from "@/components/DynamicContent";
import { LocalizedText } from "@/components/LocalizedText";
import { SectionHeader } from "@/components/SectionHeader";
import { brandName, matches, news, players, siteStats, sponsors } from "@/data/site";

const shortcuts = [
  {
    href: "/team",
    icon: UsersRound,
    label: { en: "Squad", fa: "Squad" },
    detail: { en: "Player profiles", fa: "Player profiles" }
  },
  {
    href: "/fixtures",
    icon: CalendarDays,
    label: { en: "Fixtures", fa: "Fixtures" },
    detail: { en: "Dates and venues", fa: "Dates and venues" }
  },
  {
    href: "/gallery",
    icon: Images,
    label: { en: "Gallery", fa: "Gallery" },
    detail: { en: "Matchday media", fa: "Matchday media" }
  },
  {
    href: "/about",
    icon: Newspaper,
    label: { en: "About", fa: "About" },
    detail: { en: "Team identity", fa: "Team identity" }
  }
];

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[84svh] overflow-hidden pt-24">
        <img
          src="/images/hero-arena.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 hero-scrim" />
        <div className="page-shell relative grid min-h-[calc(84svh-96px)] items-end gap-8 pb-8 pt-20 lg:grid-cols-[1.05fr_0.72fr]">
          <div className="max-w-4xl animate-rise pb-8">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur-xl">
              <span className="size-2 rounded-full bg-afghan-green animate-softPulse" />
              <LocalizedText value={{ en: "National futsal identity", fa: "National futsal identity" }} />
            </div>
            <h1 className="font-display text-5xl font-black leading-none text-white md:text-6xl lg:text-7xl">
              <LocalizedText value={brandName} />
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-200 md:text-xl">
              <LocalizedText
                value={{
                  en: "Squad profiles, fixtures, media, and supporter updates in one fast national-team hub.",
                  fa: "Squad profiles, fixtures, media, and supporter updates in one fast national-team hub."
                }}
              />
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/fixtures"
                className="inline-flex min-h-12 items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-black text-ink-950 transition hover:-translate-y-1 hover:bg-afghan-gold"
              >
                <CalendarDays size={18} />
                <LocalizedText value={{ en: "Match center", fa: "Match center" }} />
              </Link>
              <Link
                href="/team"
                className="inline-flex min-h-12 items-center gap-2 rounded-md border border-white/20 bg-white/10 px-5 py-3 text-sm font-black text-white backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/15"
              >
                <CirclePlay size={18} />
                <LocalizedText value={{ en: "Meet the squad", fa: "Meet the squad" }} />
              </Link>
            </div>
          </div>

          <DynamicHeroNextMatch initialMatch={matches[0]} />
        </div>
      </section>

      <section className="page-shell -mt-4 grid gap-3 pb-8 md:grid-cols-4">
        {shortcuts.map((shortcut) => {
          const Icon = shortcut.icon;
          return (
            <Link key={shortcut.href} href={shortcut.href} className="sport-card flex items-center gap-3 p-4">
              <span className="icon-tile">
                <Icon size={20} />
              </span>
              <span className="grid">
                <span className="text-sm font-black light-text">
                  <LocalizedText value={shortcut.label} />
                </span>
                <span className="text-xs muted-text">
                  <LocalizedText value={shortcut.detail} />
                </span>
              </span>
            </Link>
          );
        })}
      </section>

      <section className="page-shell grid gap-3 py-6 md:grid-cols-3">
        {siteStats.map((stat) => (
          <div key={stat.label.en} className="sport-card p-5">
            <p className="font-display text-4xl font-black light-text">{stat.value}</p>
            <p className="mt-1 text-sm muted-text">
              <LocalizedText value={stat.label} />
            </p>
          </div>
        ))}
      </section>

      <section className="page-shell section-pad">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <SectionHeader
            eyebrow={{ en: "Squad", fa: "Squad" }}
            title={{ en: "Featured players", fa: "Featured players" }}
            summary={{
              en: "Compact profiles shaped for quick matchday scanning.",
              fa: "Compact profiles shaped for quick matchday scanning."
            }}
          />
          <Link href="/team" className="inline-flex items-center gap-2 font-black text-afghan-red">
            <LocalizedText value={{ en: "Full team", fa: "Full team" }} />
            <ArrowRight size={18} />
          </Link>
        </div>
        <DynamicPlayersGrid initialPlayers={players} limit={4} />
      </section>

      <section className="section-band section-pad">
        <div className="page-shell grid gap-10 lg:grid-cols-[0.72fr_1fr]">
          <SectionHeader
            eyebrow={{ en: "Fixtures", fa: "Fixtures" }}
            title={{ en: "Match center", fa: "Match center" }}
            summary={{
              en: "Upcoming fixtures with dates, venues, status, and supporter notes.",
              fa: "Upcoming fixtures with dates, venues, status, and supporter notes."
            }}
          />
          <DynamicMatchCards initialMatches={matches} limit={3} compact />
        </div>
      </section>

      <section className="page-shell section-pad">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <SectionHeader
            eyebrow={{ en: "Latest", fa: "Latest" }}
            title={{ en: "Newsroom", fa: "Newsroom" }}
            summary={{
              en: "Short updates from the team, supporters, and media archive.",
              fa: "Short updates from the team, supporters, and media archive."
            }}
          />
          <Link href="/gallery" className="inline-flex items-center gap-2 font-black text-afghan-red">
            <LocalizedText value={{ en: "View media", fa: "View media" }} />
            <ArrowRight size={18} />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {news.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="page-shell pb-24">
        <SectionHeader
          align="center"
          eyebrow={{ en: "Partners", fa: "Partners" }}
          title={{ en: "Built with national-team ambition", fa: "Built with national-team ambition" }}
        />
        <div className="mt-10">
          <SponsorStrip sponsors={sponsors} />
        </div>
      </section>
    </>
  );
}
