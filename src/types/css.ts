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
// 逆引き（ユースケース → 関連プロパティ）
export interface Usecase {
  id: string;
  label: string;
  description?: string;
  propertyIds: string[];
}

// アニメーション実装例
export interface AnimationExample {
  id: string;               // URLスラッグ（例: "spinner-ring"）
  title: string;            // 「リングスピナー」
  description: string;      // 一覧・meta description用の説明
  category: string;         // 'ホバー' | 'ローディング' | '出現・入場' | 'テキスト' | 'マイクロインタラクション' | '背景・装飾'
  html: string;
  css: string;
  explanation: string;      // 仕組みの解説
  keyProperties: string[];  // 使用している主要プロパティ（実在ID。validateで検証）
  tips?: string;
}

// UIレシピ（完成されたUI部品の実装例）
export interface Recipe {
  id: string;                // URLスラッグ（例: "breadcrumb"）
  title: string;             // 「パンくずリスト」
  description: string;       // 一覧・meta description用の説明
  category: string;          // recipeCategories（src/data/recipes.ts）のいずれか
  html: string;
  css: string;
  js?: string;               // 最小限のJS（モーダル開閉等）。ある場合のみプレビューでスクリプトを実行
  explanation: string;       // 仕組みの解説
  keyProperties: string[];   // 使用している主要プロパティ（実在ID。validateで検証）
  tips?: string;
  aiPrompt: string;          // このUIをAIに作らせるときの依頼文例
}

// 比較記事（「AとBの違い」）
export interface Comparison {
  id: string;               // URLスラッグ（例: "word-break-vs-overflow-wrap"）
  title: string;            // 「word-break と overflow-wrap の違い」
  description: string;      // meta description（SEO用）
  propertyIds: string[];    // 関連プロパティ（実在IDのみ。npm run validateで検証）
  labels: string[];         // 比較表の列見出し（rows.valuesと同順・同数）
  tldr: string;             // 結論ファースト（ひとことで言うと）
  rows: { aspect: string; values: string[] }[];  // 比較表（valuesはlabelsと同順）
  guideline: string;        // 使い分けの指針
  aiNote?: string;          // AIがよくやる取り違え
}
