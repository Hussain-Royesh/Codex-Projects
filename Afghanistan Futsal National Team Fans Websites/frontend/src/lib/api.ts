export type AuthUser = {
  id: string;
  fullName: string;
  email: string;
  role: "admin" | "editor";
  status: string;
};

export type LoginResponse = {
  message: string;
  token: string;
  user: AuthUser;
};

export type DashboardResponse = {
  message: string;
  user: Pick<AuthUser, "id" | "email" | "role">;
  permissions: string[];
};

export type ContentPlayer = {
  id: string;
  name: string;
  position: string;
  jerseyNumber: number;
  age: number;
  height: string;
  photo: string;
  profile: string;
};

export type ContentMatch = {
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

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? "http://127.0.0.1:4000/api";

async function readJson<T>(response: Response): Promise<T> {
  const data = (await response.json()) as T & { message?: string };

  if (!response.ok) {
    throw new Error(data.message || "API request failed");
  }

  return data;
}

export async function login(email: string, password: string) {
  const response = await fetch(`${apiBaseUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  return readJson<LoginResponse>(response);
}

export async function getCurrentUser(token: string) {
  const response = await fetch(`${apiBaseUrl}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return readJson<{ user: AuthUser }>(response);
}

export async function getDashboard(path: "/admin/dashboard" | "/editor/dashboard", token: string) {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return readJson<DashboardResponse>(response);
}

export async function fetchPlayers() {
  const response = await fetch(`${apiBaseUrl}/players`, {
    cache: "no-store"
  });

  return readJson<{ players: ContentPlayer[] }>(response);
}

export async function createPlayer(token: string, player: Omit<ContentPlayer, "id">) {
  const response = await fetch(`${apiBaseUrl}/players`, {
    method: "POST",
    headers: authJsonHeaders(token),
    body: JSON.stringify(player)
  });

  return readJson<{ player: ContentPlayer }>(response);
}

export async function updatePlayer(
  token: string,
  id: string,
  player: Omit<ContentPlayer, "id">
) {
  const response = await fetch(`${apiBaseUrl}/players/${id}`, {
    method: "PUT",
    headers: authJsonHeaders(token),
    body: JSON.stringify(player)
  });

  return readJson<{ player: ContentPlayer }>(response);
}

export async function deletePlayer(token: string, id: string) {
  const response = await fetch(`${apiBaseUrl}/players/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    await readJson(response);
  }
}

export async function fetchMatches() {
  const response = await fetch(`${apiBaseUrl}/matches`, {
    cache: "no-store"
  });

  return readJson<{ matches: ContentMatch[] }>(response);
}

export async function createMatch(token: string, match: Omit<ContentMatch, "id">) {
  const response = await fetch(`${apiBaseUrl}/matches`, {
    method: "POST",
    headers: authJsonHeaders(token),
    body: JSON.stringify(match)
  });

  return readJson<{ match: ContentMatch }>(response);
}

export async function updateMatch(token: string, id: string, match: Omit<ContentMatch, "id">) {
  const response = await fetch(`${apiBaseUrl}/matches/${id}`, {
    method: "PUT",
    headers: authJsonHeaders(token),
    body: JSON.stringify(match)
  });

  return readJson<{ match: ContentMatch }>(response);
}

export async function deleteMatch(token: string, id: string) {
  const response = await fetch(`${apiBaseUrl}/matches/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    await readJson(response);
  }
}

function authJsonHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  };
}
