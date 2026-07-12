import rawProperties from './cssProperties.json';
import type { CSSProperty } from '@/types/css';

// JSONの推論型はユニオンリテラル型（baseline等）と互換にならないためここで一括キャストする。
// 構造の正しさは scripts/validate/validate-data.ts（npm run validate）がCIで保証する。
export const cssProperties = rawProperties as unknown as CSSProperty[];
