// レシピのkeyPropertiesから代表Baselineステータスを算出するユーティリティ。
// 集計はプロパティ単位の近似（値・組み合わせ単位の対応状況は表現しない。仕様書参照）。
import { cssProperties } from '@/data/properties';
import type { BaselineStatus } from '@/types/css';

// 低い順（この順で最初に見つかったものが代表値）
const statusOrder: BaselineStatus[] = ['limited', 'newly', 'widely'];

export function aggregateBaseline(propertyIds: string[]): BaselineStatus | null {
  const statuses = propertyIds
    .map((id) => cssProperties.find((p) => p.id === id)?.browserSupport.baseline)
    .filter((s): s is BaselineStatus => Boolean(s));
  if (statuses.length === 0) return null;
  for (const status of statusOrder) {
    if (statuses.includes(status)) return status;
  }
  return 'widely';
}
