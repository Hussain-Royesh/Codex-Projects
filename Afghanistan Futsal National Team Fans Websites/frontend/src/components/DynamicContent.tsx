"use client";

import { CalendarDays, Clock, MapPin, Trophy } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { MatchCard, PlayerCard } from "@/components/Cards";
import { LocalizedText } from "@/components/LocalizedText";
import { usePreferences } from "@/components/PreferencesProvider";
import {
  fetchMatches,
  fetchPlayers,
  type ContentMatch,
  type ContentPlayer
} from "@/lib/api";
import type { LocalizedString, Match, Player } from "@/types/site";

type ContentLoader<T> = () => Promise<T[]>;

function localized(value: string): LocalizedString {
  return {
    en: value,
    fa: value
  };
}

function toSitePlayer(player: ContentPlayer): Player {
  return {
    id: player.id,
    name: player.name,
    position: localized(player.position),
    jerseyNumber: player.jerseyNumber,
    age: player.age,
    height: player.height,
    photo: player.photo,
    profile: localized(player.profile)
  };
}

function toSiteMatch(match: ContentMatch): Match {
  return {
    id: match.id,
    date: match.date,
    time: match.time,
    homeTeam: localized(match.homeTeam),
    awayTeam: localized(match.awayTeam),
    competition: localized(match.competition),
    venue: localized(match.venue),
    status: localized(match.status),
    note: localized(match.note)
  };
}

async function loadSitePlayers() {
  const result = await fetchPlayers();
  return result.players.map(toSitePlayer);
}

async function loadSiteMatches() {
  const result = await fetchMatches();
  return result.matches.map(toSiteMatch);
}

function useDynamicContent<T>(initialItems: T[], loadItems: ContentLoader<T>) {
  const [items, setItems] = useState(initialItems);

  useEffect(() => {
    let isMounted = true;

    loadItems()
      .then((loadedItems) => {
        if (isMounted) {
          setItems(loadedItems);
        }
      })
      .catch(() => {
        if (isMounted) {
          setItems(initialItems);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [initialItems, loadItems]);

  return items;
}

function useVisibleItems<T>(items: T[], limit?: number) {
  return useMemo(
    () => (typeof limit === "number" ? items.slice(0, limit) : items),
    [items, limit]
  );
}

export function DynamicPlayersGrid({
  initialPlayers,
  limit
}: {
  initialPlayers: Player[];
  limit?: number;
}) {
  const players = useDynamicContent(initialPlayers, loadSitePlayers);
  const visiblePlayers = useVisibleItems(players, limit);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {visiblePlayers.map((player) => (
        <PlayerCard key={player.id} player={player} />
      ))}
    </div>
  );
}

export function DynamicMatchCards({
  initialMatches,
  limit,
  compact = false
}: {
  initialMatches: Match[];
  limit?: number;
  compact?: boolean;
}) {
  const matches = useDynamicContent(initialMatches, loadSiteMatches);
  const visibleMatches = useVisibleItems(matches, limit);

  return (
    <div className="grid gap-4">
      {visibleMatches.map((match) => (
        <MatchCard key={match.id} match={match} compact={compact} />
      ))}
    </div>
  );
}

export function DynamicHeroNextMatch({ initialMatch }: { initialMatch: Match }) {
  const { locale } = usePreferences();
  const [match, setMatch] = useState(initialMatch);

  useEffect(() => {
    let isMounted = true;

    loadSiteMatches()
      .then((matches) => {
        const nextMatch = matches[0];

        if (isMounted && nextMatch) {
          setMatch(nextMatch);
        }
      })
      .catch(() => {
        if (isMounted) {
          setMatch(initialMatch);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [initialMatch]);

  return (
    <div className="glass-panel mb-4 min-w-0 overflow-hidden rounded-lg p-5 text-white">
      <div className="mb-5 flex items-center justify-between gap-3">
        <p className="font-mono text-sm font-black text-afghan-gold">
          <LocalizedText value={{ en: "Next match", fa: "Next match" }} />
        </p>
        <Trophy size={20} />
      </div>
      <div className="grid grid-cols-1 items-center gap-3 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
        <p className="min-w-0 font-display text-xl font-black md:text-2xl">
          {match.homeTeam[locale]}
        </p>
        <span className="w-fit justify-self-start rounded-full border border-white/15 px-3 py-1 font-mono text-sm font-black sm:justify-self-center">
          VS
        </span>
        <p className="min-w-0 font-display text-xl font-black sm:text-right md:text-2xl">
          {match.awayTeam[locale]}
        </p>
      </div>
      <div className="mt-5 grid gap-2 text-sm text-white/85">
        <span className="flex min-w-0 items-center gap-2 rounded-md border border-white/15 bg-white/10 p-3">
          <CalendarDays size={16} />
          {match.date}
        </span>
        <span className="flex min-w-0 items-center gap-2 rounded-md border border-white/15 bg-white/10 p-3">
          <Clock size={16} />
          {match.time}
        </span>
        <span className="flex min-w-0 items-center gap-2 rounded-md border border-white/15 bg-white/10 p-3">
          <MapPin size={16} />
          {match.venue[locale]}
        </span>
      </div>
    </div>
  );
}

export function DynamicFixtureTable({ initialMatches }: { initialMatches: Match[] }) {
  const { locale } = usePreferences();
  const matches = useDynamicContent(initialMatches, loadSiteMatches);

  const tableCopy = useMemo(
    () => ({
      date: locale === "fa" ? "Date" : "Date",
      fixture: locale === "fa" ? "Fixture" : "Fixture",
      competition: locale === "fa" ? "Competition" : "Competition",
      status: locale === "fa" ? "Status" : "Status"
    }),
    [locale]
  );

  return (
    <div className="overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--surface)]">
      <div className="hidden grid-cols-4 bg-[var(--surface-strong)] px-4 py-3 text-xs font-black uppercase muted-text md:grid">
        <span>{tableCopy.date}</span>
        <span>{tableCopy.fixture}</span>
        <span>{tableCopy.competition}</span>
        <span>{tableCopy.status}</span>
      </div>
      {matches.map((match) => (
        <div
          key={match.id}
          className="grid grid-cols-1 gap-3 border-t border-[var(--line)] px-4 py-5 text-sm first:border-t-0 md:grid-cols-4"
        >
          <span className="grid gap-1 font-black text-afghan-green">
            <span className="text-[0.68rem] uppercase tracking-normal muted-text md:hidden">
              {tableCopy.date}
            </span>
            {match.date} / {match.time}
          </span>
          <span className="grid gap-1 font-bold light-text">
            <span className="text-[0.68rem] uppercase tracking-normal muted-text md:hidden">
              {tableCopy.fixture}
            </span>
            {match.homeTeam[locale]} vs {match.awayTeam[locale]}
          </span>
          <span className="grid gap-1 muted-text">
            <span className="text-[0.68rem] uppercase tracking-normal muted-text md:hidden">
              {tableCopy.competition}
            </span>
            {match.competition[locale]}
          </span>
          <span className="grid gap-1">
            <span className="text-[0.68rem] uppercase tracking-normal muted-text md:hidden">
              {tableCopy.status}
            </span>
            <span className="badge status-badge w-fit">{match.status[locale]}</span>
          </span>
        </div>
      ))}
    </div>
  );
}
