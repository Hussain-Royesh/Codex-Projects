import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";

import {
  fetchPlayers,
  getCurrentUser,
  login,
  type AuthUser,
  type ContentPlayer
} from "../src/lib/api";

const originalFetch = globalThis.fetch;

type FetchCall = {
  input: string;
  init: RequestInit;
};

afterEach(() => {
  globalThis.fetch = originalFetch;
});

function mockJsonResponse(body: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(body), {
    headers: { "Content-Type": "application/json" },
    status: 200,
    ...init
  });
}

function installFetchMock(handler: (input: string, init: RequestInit) => Response | Promise<Response>) {
  const calls: FetchCall[] = [];

  globalThis.fetch = (async (input, init) => {
    const call = {
      input: String(input),
      init: init ?? {}
    };
    calls.push(call);
    return handler(call.input, call.init);
  }) as typeof fetch;

  return calls;
}

describe("frontend API client", () => {
  it("posts login credentials as JSON", async () => {
    const user: AuthUser = {
      id: "u-1",
      fullName: "Admin User",
      email: "admin@example.com",
      role: "admin",
      status: "active"
    };

    const calls = installFetchMock(() =>
      mockJsonResponse({
        message: "Logged in",
        token: "token-1",
        user
      })
    );

    const result = await login("admin@example.com", "secret");

    assert.equal(result.token, "token-1");
    assert.equal(calls.length, 1);
    assert.equal(calls[0].input, "http://127.0.0.1:4000/api/auth/login");
    assert.equal(calls[0].init.method, "POST");
    assert.equal((calls[0].init.headers as Headers).get("Content-Type"), "application/json");
    assert.deepEqual(JSON.parse(calls[0].init.body as string), {
      email: "admin@example.com",
      password: "secret"
    });
  });

  it("adds bearer authorization when a token is provided", async () => {
    const calls = installFetchMock(() =>
      mockJsonResponse({
        user: {
          id: "u-2",
          fullName: "Editor User",
          email: "editor@example.com",
          role: "editor",
          status: "active"
        }
      })
    );

    await getCurrentUser("token-2");

    assert.equal(calls.length, 1);
    assert.equal(calls[0].input, "http://127.0.0.1:4000/api/auth/me");
    assert.equal((calls[0].init.headers as Headers).get("Authorization"), "Bearer token-2");
  });

  it("throws the API message when a request fails", async () => {
    installFetchMock(() => mockJsonResponse({ message: "Invalid credentials" }, { status: 401 }));

    await assert.rejects(() => login("wrong@example.com", "bad"), /Invalid credentials/);
  });

  it("deduplicates concurrent public player requests", async () => {
    const players: ContentPlayer[] = [
      {
        id: "p-1",
        name: "Jawad Safari",
        position: "Goalkeeper",
        jerseyNumber: 1,
        age: 25,
        height: "180 cm",
        photo: "/images/mohammad-jawad-safari.webp",
        profile: "Commanding presence"
      }
    ];
    let releaseFetch: () => void = () => {};
    const waitForRelease = new Promise<void>((resolve) => {
      releaseFetch = resolve;
    });

    const calls = installFetchMock(async () => {
      await waitForRelease;
      return mockJsonResponse({ players });
    });

    const firstRequest = fetchPlayers();
    const secondRequest = fetchPlayers();

    assert.equal(calls.length, 1);
    releaseFetch();

    const [firstResult, secondResult] = await Promise.all([firstRequest, secondRequest]);
    assert.deepEqual(firstResult.players, players);
    assert.deepEqual(secondResult.players, players);
  });
});
