import { randomUUID } from "crypto";
import path from "path";
import { JsonRepository } from "./jsonRepository";
import type { Match, Player } from "../types/content";

const dataDir = path.resolve(process.cwd(), "src", "data");
const playersFilePath = path.join(dataDir, "players.json");
const matchesFilePath = path.join(dataDir, "matches.json");

const playerRepository = new JsonRepository<Player>(playersFilePath, (players) =>
  players.sort((a, b) => a.jerseyNumber - b.jerseyNumber)
);
const matchRepository = new JsonRepository<Match>(matchesFilePath, (matches) =>
  matches.sort((a, b) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`))
);

function toNumber(value: unknown, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function toString(value: unknown, fallback = ""): string {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

export async function getPlayers(): Promise<Player[]> {
  return playerRepository.list();
}

export async function getPlayerById(id: string): Promise<Player | undefined> {
  return playerRepository.findById(id);
}

export async function createPlayer(input: Partial<Player>): Promise<Player> {
  const player: Player = {
    id: `p-${randomUUID()}`,
    name: toString(input.name),
    position: toString(input.position, "Player"),
    jerseyNumber: toNumber(input.jerseyNumber, 0),
    age: toNumber(input.age, 0),
    height: toString(input.height, "TBA"),
    photo: toString(input.photo, "/images/player-placeholder.svg"),
    profile: toString(input.profile, "Player profile will be updated soon.")
  };

  return playerRepository.create(player);
}

export async function updatePlayer(
  id: string,
  input: Partial<Player>
): Promise<Player | undefined> {
  return playerRepository.update(id, (current) => ({
    ...current,
    name: toString(input.name, current.name),
    position: toString(input.position, current.position),
    jerseyNumber: toNumber(input.jerseyNumber, current.jerseyNumber),
    age: toNumber(input.age, current.age),
    height: toString(input.height, current.height),
    photo: toString(input.photo, current.photo),
    profile: toString(input.profile, current.profile)
  }));
}

export async function deletePlayer(id: string): Promise<boolean> {
  return playerRepository.delete(id);
}

export async function getMatches(): Promise<Match[]> {
  return matchRepository.list();
}

export async function getMatchById(id: string): Promise<Match | undefined> {
  return matchRepository.findById(id);
}

export async function createMatch(input: Partial<Match>): Promise<Match> {
  const match: Match = {
    id: `m-${randomUUID()}`,
    date: toString(input.date),
    time: toString(input.time),
    homeTeam: toString(input.homeTeam, "Afghanistan"),
    awayTeam: toString(input.awayTeam, "Opponent TBA"),
    competition: toString(input.competition, "Fixture"),
    venue: toString(input.venue, "Venue TBA"),
    status: toString(input.status, "Upcoming"),
    note: toString(input.note, "Match details will be updated soon.")
  };

  return matchRepository.create(match);
}

export async function updateMatch(
  id: string,
  input: Partial<Match>
): Promise<Match | undefined> {
  return matchRepository.update(id, (current) => ({
    ...current,
    date: toString(input.date, current.date),
    time: toString(input.time, current.time),
    homeTeam: toString(input.homeTeam, current.homeTeam),
    awayTeam: toString(input.awayTeam, current.awayTeam),
    competition: toString(input.competition, current.competition),
    venue: toString(input.venue, current.venue),
    status: toString(input.status, current.status),
    note: toString(input.note, current.note)
  }));
}

export async function deleteMatch(id: string): Promise<boolean> {
  return matchRepository.delete(id);
}
