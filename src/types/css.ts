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
