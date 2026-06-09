export type Locale = "en" | "fa";

export type LocalizedString = Record<Locale, string>;

export type Player = {
  id: string;
  name: string;
  position: LocalizedString;
  jerseyNumber: number;
  age: number;
  height: string;
  photo: string;
  profile: LocalizedString;
};

export type Coach = {
  id: string;
  name: string;
  role: LocalizedString;
  photo: string;
};

export type Match = {
  id: string;
  date: string;
  time: string;
  homeTeam: LocalizedString;
  awayTeam: LocalizedString;
  competition: LocalizedString;
  venue: LocalizedString;
  status: LocalizedString;
  note: LocalizedString;
};

export type NewsItem = {
  id: string;
  title: LocalizedString;
  date: string;
  category: LocalizedString;
  summary: LocalizedString;
  image: string;
  href: string;
};

export type GalleryItem = {
  id: string;
  title: LocalizedString;
  category: LocalizedString;
  image: string;
};

export type Sponsor = {
  id: string;
  name: string;
  tier: LocalizedString;
};

export type Stat = {
  value: string;
  label: LocalizedString;
};
