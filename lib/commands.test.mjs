import { describe, it, expect } from "vitest";
import {
  resolveCliCommandName,
  resolveSlashCommandName,
  isDestructiveCommand,
  isInteractiveOnlyCommand,
} from "./commands.mjs";

describe("resolveCliCommandName", () => {
  it("resolves canonical commands and aliases", () => {
    expect(resolveCliCommandName("login")).toBe("login");
    expect(resolveCliCommandName("ln")).toBe("login");
    expect(resolveCliCommandName("sw")).toBe("switch");
    expect(resolveCliCommandName("-h")).toBe("help");
  });

  it("resolves logout and its alias", () => {
    expect(resolveCliCommandName("logout")).toBe("logout");
    expect(resolveCliCommandName("lo")).toBe("logout");
  });

  it("resolves reauth and its alias", () => {
    expect(resolveCliCommandName("reauth")).toBe("reauth");
    expect(resolveCliCommandName("ra")).toBe("reauth");
  });

  it("resolves refresh and its alias", () => {
    expect(resolveCliCommandName("refresh")).toBe("refresh");
    expect(resolveCliCommandName("rf")).toBe("refresh");
  });

  it("resolves status and its alias", () => {
    expect(resolveCliCommandName("status")).toBe("status");
    expect(resolveCliCommandName("st")).toBe("status");
  });

  it("resolves enable and its alias", () => {
    expect(resolveCliCommandName("enable")).toBe("enable");
    expect(resolveCliCommandName("en")).toBe("enable");
  });

  it("resolves disable and its alias", () => {
    expect(resolveCliCommandName("disable")).toBe("disable");
    expect(resolveCliCommandName("dis")).toBe("disable");
  });

  it("resolves remove and its alias", () => {
    expect(resolveCliCommandName("remove")).toBe("remove");
    expect(resolveCliCommandName("rm")).toBe("remove");
  });

  it("resolves stats", () => {
    expect(resolveCliCommandName("stats")).toBe("stats");
  });

  it("resolves reset-stats", () => {
    expect(resolveCliCommandName("reset-stats")).toBe("reset-stats");
  });

  it("resolves config and its alias", () => {
    expect(resolveCliCommandName("config")).toBe("config");
    expect(resolveCliCommandName("cfg")).toBe("config");
  });

  it("resolves manage and its alias", () => {
    expect(resolveCliCommandName("manage")).toBe("manage");
    expect(resolveCliCommandName("mg")).toBe("manage");
  });

  it("returns null for unknown commands", () => {
    expect(resolveCliCommandName("nope")).toBeNull();
  });

  it("returns null for empty string", () => {
    expect(resolveCliCommandName("")).toBeNull();
  });
});

describe("resolveSlashCommandName", () => {
  it("resolves slash-only aliases", () => {
    expect(resolveSlashCommandName("usage")).toBe("list");
  });

  it("resolves shared aliases", () => {
    expect(resolveSlashCommandName("ra")).toBe("reauth");
    expect(resolveSlashCommandName("mg")).toBe("manage");
  });

  it("resolves CLI aliases (like 'ln') since all aliases are shared", () => {
    // Regular aliases are included in both CLI and slash alias maps.
    // Only slashAliases (like 'usage') are exclusive to slash resolution.
    expect(resolveSlashCommandName("ln")).toBe("login");
    expect(resolveSlashCommandName("lo")).toBe("logout");
    expect(resolveSlashCommandName("sw")).toBe("switch");
  });

  it("returns null for unknown slash commands", () => {
    expect(resolveSlashCommandName("nope")).toBeNull();
    expect(resolveSlashCommandName("")).toBeNull();
  });
});

describe("command metadata helpers", () => {
  it("identifies destructive commands", () => {
    expect(isDestructiveCommand("remove")).toBe(true);
    expect(isDestructiveCommand("logout")).toBe(true);
    expect(isDestructiveCommand("switch")).toBe(false);
  });

  it("identifies interactive-only commands", () => {
    expect(isInteractiveOnlyCommand("manage")).toBe(true);
    expect(isInteractiveOnlyCommand("list")).toBe(false);
  });
});
