"use client";

import { Trophy } from "lucide-react";
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

export function DynamicPlayersGrid({
  initialPlayers,
  limit
}: {
  initialPlayers: Player[];
  limit?: number;
}) {
  const [players, setPlayers] = useState(initialPlayers);

  useEffect(() => {
    fetchPlayers()
      .then((result) => setPlayers(result.players.map(toSitePlayer)))
      .catch(() => setPlayers(initialPlayers));
  }, [initialPlayers]);

  const visiblePlayers = typeof limit === "number" ? players.slice(0, limit) : players;

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
  const [matches, setMatches] = useState(initialMatches);

  useEffect(() => {
    fetchMatches()
      .then((result) => setMatches(result.matches.map(toSiteMatch)))
      .catch(() => setMatches(initialMatches));
  }, [initialMatches]);

  const visibleMatches = typeof limit === "number" ? matches.slice(0, limit) : matches;

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
    fetchMatches()
      .then((result) => {
        const nextMatch = result.matches[0];

        if (nextMatch) {
          setMatch(toSiteMatch(nextMatch));
        }
      })
      .catch(() => setMatch(initialMatch));
  }, [initialMatch]);

  return (
    <div className="glass-panel mb-4 min-w-0 overflow-hidden rounded-3xl p-5 light-text">
      <div className="mb-5 flex items-center justify-between gap-3">
        <p className="font-mono text-sm font-black text-afghan-gold">
          <LocalizedText value={{ en: "Next match", fa: "بازی بعدی" }} />
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
      <div className="mt-5 rounded-2xl border border-white/10 bg-white/10 p-4 text-sm muted-text">
        <p>
          {match.date} · {match.time}
        </p>
        <p className="mt-1">{match.venue[locale]}</p>
      </div>
    </div>
  );
}

export function DynamicFixtureTable({ initialMatches }: { initialMatches: Match[] }) {
  const { locale } = usePreferences();
  const [matches, setMatches] = useState(initialMatches);

  useEffect(() => {
    fetchMatches()
      .then((result) => setMatches(result.matches.map(toSiteMatch)))
      .catch(() => setMatches(initialMatches));
  }, [initialMatches]);

  const tableCopy = useMemo(
    () => ({
      date: locale === "fa" ? "تاریخ" : "Date",
      fixture: locale === "fa" ? "مسابقه" : "Fixture",
      competition: locale === "fa" ? "رقابت" : "Competition",
      status: locale === "fa" ? "وضعیت" : "Status"
    }),
    [locale]
  );

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10">
      <div className="grid grid-cols-4 bg-white/10 px-4 py-3 font-mono text-xs font-black uppercase muted-text">
        <span>{tableCopy.date}</span>
        <span>{tableCopy.fixture}</span>
        <span>{tableCopy.competition}</span>
        <span>{tableCopy.status}</span>
      </div>
      {matches.map((match) => (
        <div
          key={match.id}
          className="grid grid-cols-1 gap-2 border-t border-white/10 px-4 py-5 text-sm md:grid-cols-4"
        >
          <span className="font-mono font-black text-afghan-gold">
            {match.date} · {match.time}
          </span>
          <span className="font-bold light-text">
            {match.homeTeam[locale]} vs {match.awayTeam[locale]}
          </span>
          <span className="muted-text">{match.competition[locale]}</span>
          <span className="muted-text">{match.status[locale]}</span>
        </div>
      ))}
    </div>
  );
}
