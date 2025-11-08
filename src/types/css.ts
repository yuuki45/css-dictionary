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
  browserSupport: string;
  interactive?: InteractiveConfig;
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
  enabled: true;
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
