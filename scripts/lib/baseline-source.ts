/**
 * web-features（W3C WebDX Baseline公式データ）からブラウザ対応情報を引くための共有ロジック。
 * migrate（初回変換）と validate（クロスチェック）の両方から使用する。
 */
import { features } from 'web-features';

export type BaselineStatus = 'widely' | 'newly' | 'limited';

export interface BrowserSupportData {
  chrome?: string;
  firefox?: string;
  safari?: string;
  edge?: string;
  baseline: BaselineStatus;
  baselineLowDate?: string;
}

export interface KeyStatus {
  baseline: 'high' | 'low' | false;
  baseline_low_date?: string;
  support?: Record<string, string>;
}

// 概念エントリ・擬似クラス等、`css.properties.<id>` で解決できないIDの手動マッピング
// 値は候補キーの配列（最初に索引でヒットしたものを使用）
export const manualKeys: Record<string, string[]> = {
  'display-flex': ['css.properties.display.flex'],
  'display-grid': ['css.properties.display.grid'],
  'container-queries': ['css.at-rules.container'],
  subgrid: ['css.properties.grid-template-columns.subgrid'],
  clamp: ['css.types.clamp'],
  'min-max-functions': ['css.types.min', 'css.types.max'],
  'css-custom-properties': ['css.properties.custom-property', 'css.types.var'],
  'linear-gradient': ['css.types.image.gradient.linear-gradient', 'css.types.gradient.linear-gradient'],
  'radial-gradient': ['css.types.image.gradient.radial-gradient', 'css.types.gradient.radial-gradient'],
  keyframes: ['css.at-rules.keyframes'],
  'media-queries': ['css.at-rules.media'],
  'prefers-color-scheme': ['css.at-rules.media.prefers-color-scheme'],
  'prefers-reduced-motion': ['css.at-rules.media.prefers-reduced-motion'],
  'position-sticky': ['css.properties.position.sticky'],
  'scroll-snap': ['css.properties.scroll-snap-type'],
  'logical-properties': ['css.properties.margin-inline-start', 'css.properties.margin-inline'],
  'flex-grow-shrink-basis': ['css.properties.flex-grow'],
  'grid-auto-fit-fill': [
    'css.properties.grid-template-columns.repeat',
    'css.properties.grid-template-columns',
  ],
  'pseudo-hover': ['css.selectors.hover'],
  'pseudo-nth-child': ['css.selectors.nth-child'],
  'pseudo-nth-of-type': ['css.selectors.nth-of-type'],
  'pseudo-first-child': ['css.selectors.first-child'],
  'pseudo-focus-visible': ['css.selectors.focus-visible'],
  'pseudo-has': ['css.selectors.has'],
  'css-nesting': ['css.selectors.nesting'],
  'color-mix': ['css.types.color.color-mix'],
  'light-dark': ['css.types.color.light-dark'],
  'at-property': ['css.at-rules.property'],
  'at-starting-style': ['css.at-rules.starting-style'],
  'anchor-positioning': ['css.properties.anchor-name'],
  'cascade-layers': ['css.at-rules.layer'],
  'at-scope': ['css.at-rules.scope'],
};

let cachedIndex: Map<string, KeyStatus> | null = null;

/** BCDキー → per-key status のグローバル索引 */
export function getBcdIndex(): Map<string, KeyStatus> {
  if (cachedIndex) return cachedIndex;
  const index = new Map<string, KeyStatus>();
  for (const feature of Object.values(features)) {
    const status = (feature as { status?: { by_compat_key?: Record<string, KeyStatus> } }).status;
    const byKey = status?.by_compat_key;
    if (!byKey) continue;
    for (const [key, st] of Object.entries(byKey)) {
      if (!index.has(key)) index.set(key, st);
    }
  }
  cachedIndex = index;
  return index;
}

export function candidateKeys(id: string): string[] {
  if (manualKeys[id]) return manualKeys[id];
  return [`css.properties.${id}`];
}

export function toBaseline(b: 'high' | 'low' | false): BaselineStatus {
  if (b === 'high') return 'widely';
  if (b === 'low') return 'newly';
  return 'limited';
}

function cleanVersion(v: string | undefined): string | undefined {
  if (!v) return undefined;
  return v.replace(/^≤/, ''); // "≤37" → "37"
}

export function convertKeyStatus(st: KeyStatus): BrowserSupportData {
  const result: BrowserSupportData = {
    chrome: cleanVersion(st.support?.chrome),
    firefox: cleanVersion(st.support?.firefox),
    safari: cleanVersion(st.support?.safari),
    edge: cleanVersion(st.support?.edge),
    baseline: toBaseline(st.baseline),
  };
  if (st.baseline_low_date) {
    result.baselineLowDate = st.baseline_low_date.replace(/^ranged before /, '').slice(0, 7);
  }
  for (const key of Object.keys(result) as (keyof BrowserSupportData)[]) {
    if (result[key] === undefined) delete result[key];
  }
  return result;
}

/** プロパティIDに対応するBaseline情報を取得（見つからなければ null） */
export function lookupBaseline(id: string): BrowserSupportData | null {
  const index = getBcdIndex();
  const hitKey = candidateKeys(id).find((k) => index.has(k));
  if (!hitKey) return null;
  return convertKeyStatus(index.get(hitKey)!);
}
