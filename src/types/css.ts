// W3C WebDX Baseline準拠のブラウザ対応ステータス
// widely: 全主要ブラウザで2.5年以上安定 / newly: 全主要ブラウザ対応済みだが日が浅い / limited: 一部ブラウザ未対応
export type BaselineStatus = 'widely' | 'newly' | 'limited';

export interface BrowserSupport {
  chrome?: string;          // 初対応バージョン 例: "117"
  firefox?: string;
  safari?: string;
  edge?: string;
  baseline: BaselineStatus;
  baselineLowDate?: string; // Baseline Newly到達年月 例: "2023-09"
  note?: string;            // 部分対応などの補足（日本語）
}

export interface CSSProperty {
  id: string;
  name: string;
  category: string;
  description: string;
  syntax: string;
  examples: CodeExample[];
  tips?: string;
  commonMistakes?: string;
  relatedProperties: string[];
  browserSupport: BrowserSupport;
  interactive?: InteractiveConfig;
  aiNotes?: string;           // AIがこのプロパティでよく間違えるポイント
  promptExamples?: string[];  // AIへの依頼文例
  searchAliases?: string[];   // 日本語検索別名（「角丸」等）
  mdnUrl?: string;
}

export interface CodeExample {
  code: string;
  description: string;
  demo?: string;
}

export type Theme = 'light' | 'dark';

export interface FavoriteProperty {
  id: string;
  addedAt: number;
}

export interface RecentProperty {
  id: string;
  viewedAt: number;
}

// インタラクティブデモ用の型定義
export interface InteractiveConfig {
  enabled: boolean;
  type: 'number' | 'color' | 'select' | 'multi';
  controls: Control[];
  preview: PreviewConfig;
}

export interface Control {
  name: string;
  type: 'slider' | 'color' | 'select';
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  options?: string[];
  defaultValue: string | number;
}

export interface PreviewConfig {
  template: 'box' | 'text' | 'layout';
  content?: string;
  className?: string;
}

// CSSテクニック集
export interface Technique {
  id: string;
  title: string;
  description: string;
  html: string;
  css: string;
  tips?: string;
}

// 逆引き（ユースケース → 関連プロパティ）
export interface Usecase {
  id: string;
  label: string;
  description?: string;
  propertyIds: string[];
}
