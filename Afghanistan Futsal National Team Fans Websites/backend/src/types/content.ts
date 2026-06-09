export type Player = {
  id: string;
  name: string;
  position: string;
  jerseyNumber: number;
  age: number;
  height: string;
  photo: string;
  profile: string;
};

export type Match = {
  id: string;
  date: string;
  time: string;
  homeTeam: string;
  awayTeam: string;
  competition: string;
  venue: string;
  status: string;
  note: string;
};
