/**
 * Remove ANSI color/control codes from a string to get its visible content.
 * @param {string} value
 * @returns {string}
 */
export function stripAnsi(value) {
  return value.replace(/\x1b\[[0-9;]*m/g, ""); // eslint-disable-line no-control-regex
}
