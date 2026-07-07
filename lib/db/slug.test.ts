import { describe, it, expect } from "vitest";
import { slugify, isValidSlug } from "./slug";

describe("slugify", () => {
  it("lowercases and hyphenates a name", () => {
    expect(slugify("Moonwell Lending Exploit")).toBe("moonwell-lending-exploit");
  });

  it("prefixes a year when given", () => {
    expect(slugify("Ronin Bridge", 2022)).toBe("2022-ronin-bridge");
  });

  it("collapses punctuation and trims stray hyphens", () => {
    expect(slugify("  Euler!! Finance — hack  ")).toBe("euler-finance-hack");
  });

  it("caps length at 60 chars and trims a trailing hyphen", () => {
    const long = "a".repeat(80);
    expect(slugify(long).length).toBeLessThanOrEqual(60);
  });

  it("throws when nothing slug-able remains", () => {
    expect(() => slugify("!!! ---")).toThrow();
  });
});

describe("isValidSlug", () => {
  it("accepts a normal slug", () => {
    expect(isValidSlug("2026-moonwell-lending")).toBe(true);
  });
  it("rejects leading hyphen, uppercase, and spaces", () => {
    expect(isValidSlug("-bad")).toBe(false);
    expect(isValidSlug("Bad")).toBe(false);
    expect(isValidSlug("has space")).toBe(false);
  });
});
