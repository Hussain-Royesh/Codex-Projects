"use client";

import Link from "next/link";
import { ArrowUpRight, CalendarDays, Clock, MapPin, Ruler, Shirt } from "lucide-react";
import type { GalleryItem, Match, NewsItem, Player, Sponsor } from "@/types/site";
import { usePreferences } from "@/components/PreferencesProvider";

function formatDate(date: string, locale: "en" | "fa") {
  return new Intl.DateTimeFormat(locale === "fa" ? "fa-AF" : "en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(`${date}T00:00:00`));
}

export function PlayerCard({ player }: { player: Player }) {
  const { locale } = usePreferences();

  return (
    <article className="sport-card group overflow-hidden rounded-3xl">
      <div className="relative aspect-[4/3] overflow-hidden bg-ink-900">
        <img
          src={player.photo}
          alt={player.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 grid size-14 place-items-center rounded-2xl bg-white text-xl font-black text-ink-950">
          {player.jerseyNumber}
        </div>
      </div>
      <div className="space-y-4 p-5">
        <div>
          <p className="font-display text-xl font-black light-text">{player.name}</p>
          <p className="font-mono text-sm font-extrabold text-afghan-gold">{player.position[locale]}</p>
        </div>
        <p className="text-sm muted-text">{player.profile[locale]}</p>
        <div className="grid grid-cols-3 gap-2 text-xs muted-text">
          <span className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <Shirt className="mb-1" size={15} />
            {player.jerseyNumber}
          </span>
          <span className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <CalendarDays className="mb-1" size={15} />
            {player.age}
          </span>
          <span className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <Ruler className="mb-1" size={15} />
            {player.height}
          </span>
        </div>
      </div>
    </article>
  );
}

export function MatchCard({ match, compact = false }: { match: Match; compact?: boolean }) {
  const { locale } = usePreferences();

  return (
    <article className="sport-card rounded-3xl p-5 md:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <span className="rounded-full bg-afghan-red px-3 py-1 text-xs font-black text-white">
          {match.status[locale]}
        </span>
        <span className="font-mono text-sm font-extrabold text-afghan-gold">
          {match.competition[locale]}
        </span>
      </div>
      <div className="grid grid-cols-1 items-center gap-3 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
        <p className="min-w-0 font-display text-lg font-black light-text md:text-2xl">
          {match.homeTeam[locale]}
        </p>
        <span className="w-fit justify-self-start rounded-full border border-white/15 px-3 py-1 font-mono text-sm font-black muted-text sm:justify-self-center">
          VS
        </span>
        <p className="min-w-0 font-display text-lg font-black light-text sm:text-right md:text-2xl">
          {match.awayTeam[locale]}
        </p>
      </div>
      <div className="mt-5 grid gap-3 text-sm muted-text md:grid-cols-3">
        <span className="flex items-center gap-2">
          <CalendarDays size={16} />
          {formatDate(match.date, locale)}
        </span>
        <span className="flex items-center gap-2">
          <Clock size={16} />
          {match.time}
        </span>
        <span className="flex items-center gap-2">
          <MapPin size={16} />
          {match.venue[locale]}
        </span>
      </div>
      {!compact ? <p className="mt-5 text-sm muted-text">{match.note[locale]}</p> : null}
    </article>
  );
}

export function NewsCard({ item }: { item: NewsItem }) {
  const { locale, ui } = usePreferences();

  return (
    <article className="sport-card group overflow-hidden rounded-3xl">
      <div className="relative aspect-[16/10] overflow-hidden bg-ink-900">
        <img
          src={item.image}
          alt={item.title[locale]}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="space-y-4 p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-extrabold">
          <span className="text-afghan-gold">{item.category[locale]}</span>
          <span className="muted-text">{formatDate(item.date, locale)}</span>
        </div>
        <h3 className="font-display text-xl font-black leading-tight light-text">
          {item.title[locale]}
        </h3>
        <p className="text-sm muted-text">{item.summary[locale]}</p>
        <Link
          href={item.href}
          className="inline-flex items-center gap-2 text-sm font-black text-afghan-gold"
        >
          {ui("readMore")}
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </article>
  );
}

export function GalleryCard({ item }: { item: GalleryItem }) {
  const { locale } = usePreferences();

  return (
    <article className="sport-card group overflow-hidden rounded-3xl">
      <div className="relative aspect-[4/3] overflow-hidden bg-ink-900">
        <img
          src={item.image}
          alt={item.title[locale]}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <div className="glass-panel rounded-2xl p-4">
            <p className="font-mono text-xs font-black text-afghan-gold">{item.category[locale]}</p>
            <h3 className="font-display text-xl font-black text-white">{item.title[locale]}</h3>
          </div>
        </div>
      </div>
    </article>
  );
}

export function SponsorStrip({ sponsors }: { sponsors: Sponsor[] }) {
  const { locale } = usePreferences();

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {sponsors.map((sponsor) => (
        <div key={sponsor.id} className="sport-card rounded-3xl p-6">
          <p className="font-display text-xl font-black light-text">{sponsor.name}</p>
          <p className="mt-1 text-sm muted-text">{sponsor.tier[locale]}</p>
        </div>
      ))}
    </div>
  );
}
