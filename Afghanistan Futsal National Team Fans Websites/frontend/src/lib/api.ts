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

type ApiRequestOptions = {
  body?: unknown;
  cache?: RequestCache;
  headers?: HeadersInit;
  method?: string;
  token?: string;
};

const pendingPublicRequests = new Map<string, Promise<unknown>>();

async function apiRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const headers = new Headers(options.headers);

  if (options.token) {
    headers.set("Authorization", `Bearer ${options.token}`);
  }

  const requestInit: RequestInit = {
    cache: options.cache,
    headers,
    method: options.method ?? (options.body ? "POST" : "GET")
  };

  if (options.body !== undefined) {
    headers.set("Content-Type", "application/json");
    requestInit.body = JSON.stringify(options.body);
  }

  const response = await fetch(`${apiBaseUrl}${path}`, requestInit);

  if (response.status === 204) {
    return undefined as T;
  }

  const data = (await response.json().catch(() => ({}))) as T & { message?: string };

  if (!response.ok) {
    throw new Error(data.message || "API request failed");
  }

  return data;
}

function fetchPublicResource<T>(path: string) {
  const pending = pendingPublicRequests.get(path) as Promise<T> | undefined;

  if (pending) {
    return pending;
  }

  const request = apiRequest<T>(path, { cache: "no-store" }).finally(() => {
    pendingPublicRequests.delete(path);
  });

  pendingPublicRequests.set(path, request);
  return request;
}

export async function login(email: string, password: string) {
  return apiRequest<LoginResponse>("/auth/login", {
    body: { email, password },
    method: "POST"
  });
}

export async function getCurrentUser(token: string) {
  return apiRequest<{ user: AuthUser }>("/auth/me", {
    token
  });
}

export async function getDashboard(path: "/admin/dashboard" | "/editor/dashboard", token: string) {
  return apiRequest<DashboardResponse>(path, {
    token
  });
}

export async function fetchPlayers({ dedupe = true } = {}) {
  return dedupe
    ? fetchPublicResource<{ players: ContentPlayer[] }>("/players")
    : apiRequest<{ players: ContentPlayer[] }>("/players", { cache: "no-store" });
}

export async function createPlayer(token: string, player: Omit<ContentPlayer, "id">) {
  return apiRequest<{ player: ContentPlayer }>("/players", {
    body: player,
    method: "POST",
    token
  });
}

export async function updatePlayer(
  token: string,
  id: string,
  player: Omit<ContentPlayer, "id">
) {
  return apiRequest<{ player: ContentPlayer }>(`/players/${id}`, {
    body: player,
    method: "PUT",
    token
  });
}

export async function deletePlayer(token: string, id: string) {
  return apiRequest<void>(`/players/${id}`, {
    method: "DELETE",
    token
  });
}

export async function fetchMatches({ dedupe = true } = {}) {
  return dedupe
    ? fetchPublicResource<{ matches: ContentMatch[] }>("/matches")
    : apiRequest<{ matches: ContentMatch[] }>("/matches", { cache: "no-store" });
}

export async function createMatch(token: string, match: Omit<ContentMatch, "id">) {
  return apiRequest<{ match: ContentMatch }>("/matches", {
    body: match,
    method: "POST",
    token
  });
}

export async function updateMatch(token: string, id: string, match: Omit<ContentMatch, "id">) {
  return apiRequest<{ match: ContentMatch }>(`/matches/${id}`, {
    body: match,
    method: "PUT",
    token
  });
}

export async function deleteMatch(token: string, id: string) {
  return apiRequest<void>(`/matches/${id}`, {
    method: "DELETE",
    token
  });
}
