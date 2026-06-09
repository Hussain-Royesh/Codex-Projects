import { randomUUID } from "crypto";
import fs from "fs/promises";
import path from "path";
import type { Match, Player } from "../types/content";

const dataDir = path.resolve(process.cwd(), "src", "data");
const playersFilePath = path.join(dataDir, "players.json");
const matchesFilePath = path.join(dataDir, "matches.json");

async function readJsonFile<T>(filePath: string): Promise<T[]> {
  const fileContents = await fs.readFile(filePath, "utf8");
  return JSON.parse(fileContents) as T[];
}

async function writeJsonFile<T>(filePath: string, records: T[]): Promise<void> {
  await fs.writeFile(filePath, `${JSON.stringify(records, null, 2)}\n`);
}

function toNumber(value: unknown, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function toString(value: unknown, fallback = ""): string {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

export async function getPlayers(): Promise<Player[]> {
  const players = await readJsonFile<Player>(playersFilePath);
  return players.sort((a, b) => a.jerseyNumber - b.jerseyNumber);
}

export async function getPlayerById(id: string): Promise<Player | undefined> {
  const players = await getPlayers();
  return players.find((player) => player.id === id);
}

export async function createPlayer(input: Partial<Player>): Promise<Player> {
  const players = await readJsonFile<Player>(playersFilePath);
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

  players.push(player);
  await writeJsonFile(playersFilePath, players);
  return player;
}

export async function updatePlayer(
  id: string,
  input: Partial<Player>
): Promise<Player | undefined> {
  const players = await readJsonFile<Player>(playersFilePath);
  const index = players.findIndex((player) => player.id === id);

  if (index === -1) {
    return undefined;
  }

  const current = players[index];
  const updated: Player = {
    ...current,
    name: toString(input.name, current.name),
    position: toString(input.position, current.position),
    jerseyNumber: toNumber(input.jerseyNumber, current.jerseyNumber),
    age: toNumber(input.age, current.age),
    height: toString(input.height, current.height),
    photo: toString(input.photo, current.photo),
    profile: toString(input.profile, current.profile)
  };

  players[index] = updated;
  await writeJsonFile(playersFilePath, players);
  return updated;
}

export async function deletePlayer(id: string): Promise<boolean> {
  const players = await readJsonFile<Player>(playersFilePath);
  const nextPlayers = players.filter((player) => player.id !== id);

  if (nextPlayers.length === players.length) {
    return false;
  }

  await writeJsonFile(playersFilePath, nextPlayers);
  return true;
}

export async function getMatches(): Promise<Match[]> {
  const matches = await readJsonFile<Match>(matchesFilePath);
  return matches.sort((a, b) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`));
}

export async function getMatchById(id: string): Promise<Match | undefined> {
  const matches = await getMatches();
  return matches.find((match) => match.id === id);
}

export async function createMatch(input: Partial<Match>): Promise<Match> {
  const matches = await readJsonFile<Match>(matchesFilePath);
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

  matches.push(match);
  await writeJsonFile(matchesFilePath, matches);
  return match;
}

export async function updateMatch(
  id: string,
  input: Partial<Match>
): Promise<Match | undefined> {
  const matches = await readJsonFile<Match>(matchesFilePath);
  const index = matches.findIndex((match) => match.id === id);

  if (index === -1) {
    return undefined;
  }

  const current = matches[index];
  const updated: Match = {
    ...current,
    date: toString(input.date, current.date),
    time: toString(input.time, current.time),
    homeTeam: toString(input.homeTeam, current.homeTeam),
    awayTeam: toString(input.awayTeam, current.awayTeam),
    competition: toString(input.competition, current.competition),
    venue: toString(input.venue, current.venue),
    status: toString(input.status, current.status),
    note: toString(input.note, current.note)
  };

  matches[index] = updated;
  await writeJsonFile(matchesFilePath, matches);
  return updated;
}

export async function deleteMatch(id: string): Promise<boolean> {
  const matches = await readJsonFile<Match>(matchesFilePath);
  const nextMatches = matches.filter((match) => match.id !== id);

  if (nextMatches.length === matches.length) {
    return false;
  }

  await writeJsonFile(matchesFilePath, nextMatches);
  return true;
}
