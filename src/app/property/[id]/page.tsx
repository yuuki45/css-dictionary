import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PropertyDetailClient } from './PropertyDetailClient';
import cssPropertiesData from '@/data/cssProperties.json';
import { CSSProperty } from '@/types/css';

const properties: CSSProperty[] = cssPropertiesData;

export async function generateStaticParams() {
  return properties.map((property) => ({
    id: property.id,
  }));
}

function generateSEOTitle(property: CSSProperty): string {
  const { name, category } = property;
  
  // カテゴリ別のSEOキーワードパターン
  const categoryPatterns: Record<string, string> = {
    'レイアウト・配置': '使い方【CSS完全図解】レイアウト指定方法',
    '背景・装飾': '使い方【CSS完全図解】背景指定の方法', 
    'テキスト・フォント': 'とは？【CSS解説】テキスト制御プロパティ',
    'スペーシング・サイズ': '使い方【CSS解説】余白・サイズ指定方法',
    'アニメーション・トランジション': '使い方【CSS完全図解】アニメーション実装',
    'カラー・透明度': '使い方【CSS解説】色・透明度の指定方法',
    'ボーダー・アウトライン': '使い方【CSS解説】枠線・境界線の指定',
    'レスポンシブ・関数': '使い方【CSS完全図解】レスポンシブ対応方法',
    'その他': '使い方【CSS解説】プロパティ完全ガイド'
  };

  // 特定プロパティのカスタムタイトル
  const customTitles: Record<string, string> = {
    'background-image': 'background-imageの使い方【CSS完全図解】背景画像の指定方法',
    'word-break': 'word-breakとは？改行ルールのCSSプロパティ解説',
    'display': 'displayプロパティ使い方【CSS完全図解】要素表示の制御方法',
    'flex': 'flexプロパティ使い方【CSS完全図解】フレックスレイアウト',
    'grid': 'gridプロパティ使い方【CSS完全図解】グリッドレイアウト',
    'position': 'positionプロパティ使い方【CSS完全図解】要素配置の指定',
    'transform': 'transformプロパティ使い方【CSS完全図解】要素変形の方法',
    'animation': 'animationプロパティ使い方【CSS完全図解】アニメーション実装',
    'transition': 'transitionプロパティ使い方【CSS完全図解】滑らかな変化',
    'z-index': 'z-indexプロパティ使い方【CSS解説】重ね順の制御方法'
  };

  // カスタムタイトルがある場合はそれを使用
  if (customTitles[name]) {
    return customTitles[name];
  }

  // カテゴリ別パターンを使用
  const pattern = categoryPatterns[category] || categoryPatterns['その他'];
  return `${name}${pattern}`;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const property = properties.find((p) => p.id === id);
  
  if (!property) {
    return {
      title: 'プロパティが見つかりません - CSS辞書',
      description: '指定されたCSSプロパティが見つかりませんでした。',
    };
  }

  const seoTitle = generateSEOTitle(property);

  return {
    title: seoTitle,
    description: `CSS ${property.name}プロパティの使い方。${property.description}。実用的なサンプルコードと詳細解説付き。`,
    openGraph: {
      title: seoTitle,
      description: `CSS ${property.name}プロパティの使い方。${property.description}。`,
      url: `https://www.css-dictionary.com/property/${property.id}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: `CSS ${property.name}プロパティの使い方。${property.description}。`,
    },
  };
}

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = properties.find((p) => p.id === id);
  
  if (!property) {
    notFound();
  }

  return <PropertyDetailClient property={property} />;
}