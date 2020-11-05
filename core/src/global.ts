import type { CapacitorGlobal } from './definitions';
import { legacyRegisterWebPlugin } from './legacy/legacy-web-plugin-merge';
import { createCapacitor } from './runtime';
import type { WebPlugin } from './web-plugin';

// figure out the current globalThis, such as "window", "self" or "global"
// ensure errors are not thrown in an node SSR environment or web worker
const win = /*#__PURE__*/ (typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {}) as any;

export const Capacitor = (win.Capacitor = /*#__PURE__*/ createCapacitor(
  win,
)) as CapacitorGlobal;

export const registerPlugin = Capacitor.registerPlugin;

/**
 * @deprecated Provided for backwards compatibility for Capacitor v2 plugins.
 * Capacitor v3 plugins should import the plugin directly. This "Plugins"
 * export is deprecated in v3, and will be removed in v4.
 */
export const Plugins = Capacitor.Plugins;

/**
 * Provided for backwards compatibility. Use the registerPlugin() API
 * instead, and provide the web plugin as the "web" implmenetation.
 * For example
 *
 * export const Example = registerPlugin('Example', {
 *   web: () => import('./web').then(m => new m.Example())
 * })
 *
 * @deprecated Deprecated in v3, will be removed from v4.
 */
export const registerWebPlugin = (plugin: WebPlugin): void =>
  legacyRegisterWebPlugin(Capacitor, plugin);
