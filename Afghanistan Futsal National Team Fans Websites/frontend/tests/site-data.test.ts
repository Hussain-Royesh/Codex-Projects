import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  brandName,
  galleryItems,
  matches,
  navigation,
  news,
  players,
  siteStats,
  sponsors
} from "../src/data/site";
import type { LocalizedString } from "../src/types/site";

function assertLocalizedString(value: LocalizedString, label: string) {
  assert.equal(typeof value.en, "string", `${label}.en should be a string`);
  assert.equal(typeof value.fa, "string", `${label}.fa should be a string`);
  assert.ok(value.en.trim().length > 0, `${label}.en should not be empty`);
  assert.ok(value.fa.trim().length > 0, `${label}.fa should not be empty`);
}

function assertUnique<T extends string | number>(values: T[], label: string) {
  assert.equal(new Set(values).size, values.length, `${label} should be unique`);
}

describe("site content data", () => {
  it("has localized brand, navigation, stats, and sponsors", () => {
    assertLocalizedString(brandName, "brandName");
    assert.ok(navigation.length >= 6, "navigation should include main site routes");
    assert.equal(navigation[0].href, "/");

    for (const item of navigation) {
      assert.ok(item.href.startsWith("/"), `navigation href should be root-relative: ${item.href}`);
      assertLocalizedString(item.label, `navigation ${item.href}`);
    }

    for (const stat of siteStats) {
      assert.ok(stat.value.trim().length > 0, `stat ${stat.value} should have a value`);
      assertLocalizedString(stat.label, `stat ${stat.value}`);
    }

    for (const sponsor of sponsors) {
      assert.ok(sponsor.id.trim().length > 0, "sponsor should have an id");
      assert.ok(sponsor.name.trim().length > 0, `sponsor ${sponsor.id} should have a name`);
      assertLocalizedString(sponsor.tier, `sponsor ${sponsor.id}`);
    }
  });

  it("keeps player records complete and unique", () => {
    assert.ok(players.length >= 8, "expected the featured squad data to include at least 8 players");
    assertUnique(
      players.map((player) => player.id),
      "player ids"
    );
    assertUnique(
      players.map((player) => player.jerseyNumber),
      "player jersey numbers"
    );

    for (const player of players) {
      assert.ok(player.name.trim().length > 0, `player ${player.id} should have a name`);
      assert.ok(player.age > 0, `player ${player.id} should have a positive age`);
      assert.ok(player.photo.startsWith("/images/"), `player ${player.id} should use a public image`);
      assertLocalizedString(player.position, `player ${player.id} position`);
      assertLocalizedString(player.profile, `player ${player.id} profile`);
    }
  });

  it("keeps fixtures sorted and fully localized", () => {
    assert.ok(matches.length >= 1, "matches should not be empty");

    const dates = matches.map((match) => match.date);
    assert.deepEqual(dates, [...dates].sort(), "matches should stay sorted by date");

    for (const match of matches) {
      assert.match(match.date, /^\d{4}-\d{2}-\d{2}$/, `match ${match.id} should use YYYY-MM-DD`);
      assert.match(match.time, /^\d{2}:\d{2}$/, `match ${match.id} should use HH:mm`);
      assertLocalizedString(match.homeTeam, `match ${match.id} homeTeam`);
      assertLocalizedString(match.awayTeam, `match ${match.id} awayTeam`);
      assertLocalizedString(match.competition, `match ${match.id} competition`);
      assertLocalizedString(match.venue, `match ${match.id} venue`);
      assertLocalizedString(match.status, `match ${match.id} status`);
      assertLocalizedString(match.note, `match ${match.id} note`);
    }
  });

  it("keeps news and gallery links usable", () => {
    assert.ok(news.length >= 1, "news should not be empty");
    assert.ok(galleryItems.length >= 1, "gallery should not be empty");

    for (const item of news) {
      assertLocalizedString(item.title, `news ${item.id} title`);
      assertLocalizedString(item.category, `news ${item.id} category`);
      assertLocalizedString(item.summary, `news ${item.id} summary`);
      assert.ok(item.href.startsWith("/"), `news ${item.id} href should be root-relative`);
      assert.ok(item.image.startsWith("/images/"), `news ${item.id} should use a public image`);
    }

    for (const item of galleryItems) {
      assertLocalizedString(item.title, `gallery ${item.id} title`);
      assertLocalizedString(item.category, `gallery ${item.id} category`);
      assert.ok(item.image.startsWith("/images/"), `gallery ${item.id} should use a public image`);
    }
  });
});
