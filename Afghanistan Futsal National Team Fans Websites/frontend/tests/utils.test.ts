import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { cn } from "../src/lib/utils";

describe("cn", () => {
  it("joins truthy class names in order", () => {
    assert.equal(cn("base", "active", "wide"), "base active wide");
  });

  it("omits false, null, and undefined values", () => {
    assert.equal(cn("base", false, null, undefined, "visible"), "base visible");
  });
});
