/**
 * Canonical command metadata used by both CLI and slash command routing.
 *
 * @typedef {{
 *   name: string,
 *   aliases?: string[],
 *   slashAliases?: string[],
 *   destructive?: boolean,
 *   interactiveOnly?: boolean,
 * }} CommandDefinition
 */

/** @type {CommandDefinition[]} */
const COMMAND_DEFINITIONS = [
  { name: "login", aliases: ["ln"] },
  { name: "logout", aliases: ["lo"], destructive: true },
  { name: "reauth", aliases: ["ra"] },
  { name: "refresh", aliases: ["rf"] },
  { name: "list", aliases: ["ls"], slashAliases: ["usage"] },
  { name: "status", aliases: ["st"] },
  { name: "switch", aliases: ["sw"] },
  { name: "enable", aliases: ["en"] },
  { name: "disable", aliases: ["dis"] },
  { name: "remove", aliases: ["rm"], destructive: true },
  { name: "reset" },
  { name: "stats" },
  { name: "reset-stats" },
  { name: "strategy", aliases: ["strat"] },
  { name: "config", aliases: ["cfg"] },
  { name: "manage", aliases: ["mg"], interactiveOnly: true },
  { name: "help", aliases: ["-h", "--help"] },
];

/** @type {Map<string, CommandDefinition>} */
const commandByName = new Map(COMMAND_DEFINITIONS.map((def) => [def.name, def]));

/**
 * @param {boolean} includeSlashAliases
 * @returns {Map<string, string>}
 */
function buildAliasMap(includeSlashAliases) {
  /** @type {Map<string, string>} */
  const map = new Map();
  for (const def of COMMAND_DEFINITIONS) {
    map.set(def.name, def.name);
    for (const alias of def.aliases || []) {
      map.set(alias, def.name);
    }
    if (includeSlashAliases) {
      for (const alias of def.slashAliases || []) {
        map.set(alias, def.name);
      }
    }
  }
  return map;
}

const CLI_ALIAS_MAP = buildAliasMap(false);
const SLASH_ALIAS_MAP = buildAliasMap(true);

/**
 * Resolve a CLI command token to its canonical command name.
 * @param {string} token
 * @returns {string | null}
 */
export function resolveCliCommandName(token) {
  return CLI_ALIAS_MAP.get(token.toLowerCase()) || null;
}

/**
 * Resolve a slash command token to its canonical command name.
 * Includes slash-only aliases like `usage` -> `list`.
 * @param {string} token
 * @returns {string | null}
 */
export function resolveSlashCommandName(token) {
  return SLASH_ALIAS_MAP.get(token.toLowerCase()) || null;
}

/**
 * Check if a canonical command is destructive and should force confirmations in slash mode.
 * @param {string} command
 * @returns {boolean}
 */
export function isDestructiveCommand(command) {
  return commandByName.get(command)?.destructive === true;
}

/**
 * Check if a canonical command is interactive-only.
 * @param {string} command
 * @returns {boolean}
 */
export function isInteractiveOnlyCommand(command) {
  return commandByName.get(command)?.interactiveOnly === true;
}
