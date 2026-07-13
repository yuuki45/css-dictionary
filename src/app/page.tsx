'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { SearchBar } from "@/components/SearchBar";
import { PropertyCard } from "@/components/PropertyCard";
import { Navigation } from "@/components/Navigation";
import { Layout } from "@/components/Layout";
import { useFavorites } from "@/hooks/useFavorites";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { useTheme } from "@/hooks/useTheme";
import { useAnalytics } from "@/hooks/useAnalytics";
import { searchProperties, getUniqueCategories } from "@/utils/search";
import { getCategoryAccent } from "@/utils/categoryColors";
import { getCategorySlug } from "@/utils/categorySlug";
import { CSSProperty } from "@/types/css";
import { cssProperties } from "@/data/properties";
import { animations } from "@/data/animations";
import { comparisons } from "@/data/comparisons";
import { Layers, ArrowRight } from "lucide-react";

// 「定番の項目」— 実務で最も引かれる項目のキュレーション
const standardIds = [
  "display-flex",
  "display-grid",
  "position",
  "transition",
  "border-radius",
  "gap",
];

const kanjiNumbers = ["一", "二", "三", "四", "五"];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  // 「/」キーで検索ボックスにフォーカス（入力中は無効）
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "/") return;
      const target = event.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
        return;
      }
      event.preventDefault();
      searchInputRef.current?.focus();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { addRecentlyViewed, getRecentIds, isLoaded: recentLoaded } = useRecentlyViewed();
  useTheme();
  const analytics = useAnalytics();

  const properties: CSSProperty[] = cssProperties;
  const categories = getUniqueCategories(properties);

  const handleToggleFavorite = (propertyId: string) => {
    const property = properties.find((p) => p.id === propertyId);
    if (isFavorite(propertyId)) {
      removeFavorite(propertyId);
      if (property) {
        analytics.trackFavoriteRemove(propertyId, property.name);
      }
    } else {
      addFavorite(propertyId);
      if (property) {
        analytics.trackFavoriteAdd(propertyId, property.name);
      }
    }
  };

  const handleViewDetail = (propertyId: string) => {
    addRecentlyViewed(propertyId);
    window.location.href = `/property/${propertyId}`;
  };

  const filteredProperties = searchQuery
    ? searchProperties(properties, searchQuery)
    : properties;

  // 検索クエリ変更時のAnalytics
  useEffect(() => {
    if (searchQuery.trim()) {
      const timeoutId = setTimeout(() => {
        analytics.trackSearch(searchQuery, filteredProperties.length);
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [searchQuery, filteredProperties.length, analytics]);

  const recentProperties = properties.filter((p) =>
    getRecentIds(5).includes(p.id)
  );
  const standardProperties = standardIds
    .map((id) => properties.find((p) => p.id === id))
    .filter((p): p is CSSProperty => Boolean(p));

  const aiCount = properties.filter((p) => p.aiNotes).length;

  const features = [
    {
      href: "/modern/",
      title: "モダンCSS",
      description: "あなたのAIが知らないかもしれない新機能",
      count: null,
    },
    {
      href: "/animations/",
      title: "アニメーション実装集",
      description: "動くプレビュー付き・編集して試せる",
      count: `${animations.length}例`,
    },
    {
      href: "/compare/",
      title: "比較でわかるCSS",
      description: "混同しがちな「違い」を比較表で",
      count: `${comparisons.length}記事`,
    },
    {
      href: "/ai-review/",
      title: "AI生成CSSレビューチェックリスト",
      description: "AIがよく間違えるポイントの観点集",
      count: `${aiCount}観点`,
    },
    {
      href: "/techniques/",
      title: "CSSテクニック集",
      description: "コピペで使える定番実装",
      count: null,
    },
  ];

  return (
    <Layout>
      <div className="py-10">
        {/* Hero */}
        <div className="mb-10 animate-fade-up">
          <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-wide text-gray-900 dark:text-gray-100 mb-3 leading-snug">
            調べる、書ける、確かめる。
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            AIと協働する開発者のための日本語CSSリファレンス
            <span className="font-mono text-sm text-gray-500 dark:text-gray-500 ml-2">
              — 全{properties.length}項目
            </span>
          </p>
        </div>

        <div className="space-y-12">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="プロパティを検索（例: 角丸、ダークモード、:has）..."
            inputRef={searchInputRef}
          />

          {searchQuery ? (
            /* 検索結果 */
            <section>
              <div className="flex items-center gap-2.5 mb-4">
                <span className="entry-marker" aria-hidden="true" />
                <h2 className="font-serif text-lg font-semibold text-gray-900 dark:text-gray-100">
                  検索結果（{filteredProperties.length}件）
                </h2>
              </div>
              {filteredProperties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      isFavorite={isFavorite(property.id)}
                      onToggleFavorite={handleToggleFavorite}
                      onViewDetail={handleViewDetail}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 dark:text-gray-500 mb-2">
                    <Layers className="w-12 h-12 mx-auto mb-4" />
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    検索条件に一致するプロパティが見つかりませんでした
                  </p>
                </div>
              )}
            </section>
          ) : (
            <>
              {/* 引く */}
              <section>
                <div className="flex items-baseline justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="entry-marker" aria-hidden="true" />
                    <h2 className="font-serif text-lg font-semibold text-gray-900 dark:text-gray-100">
                      引く
                    </h2>
                  </div>
                  <Link
                    href="/find/"
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-vermillion-600 dark:hover:text-gold-300 transition-colors"
                  >
                    すべての探し方 →
                  </Link>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {categories.map((category) => (
                    <Link
                      key={category}
                      href={`/categories/${getCategorySlug(category)}/`}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:border-vermillion-400 dark:hover:border-gold-500 transition-colors"
                    >
                      <span
                        className={`inline-block w-2 h-2 rounded-full ${getCategoryAccent(category)}`}
                        aria-hidden="true"
                      />
                      {category}
                    </Link>
                  ))}
                </div>
                <Link
                  href="/reverse/"
                  className="group inline-flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-vermillion-600 dark:hover:text-gold-300 transition-colors"
                >
                  やりたいことから探す（逆引き）
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </section>

              {/* 読む */}
              <section>
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="entry-marker" aria-hidden="true" />
                  <h2 className="font-serif text-lg font-semibold text-gray-900 dark:text-gray-100">
                    読む
                  </h2>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-700 border-y border-gray-200 dark:border-gray-700">
                  {features.map((feature, index) => (
                    <Link
                      key={feature.href}
                      href={feature.href}
                      className="group flex items-center gap-3 py-3.5 px-2 hover:bg-white dark:hover:bg-gray-800 transition-colors"
                    >
                      <span className="font-serif text-vermillion-600 dark:text-gold-400 shrink-0 w-9 text-center">
                        【{kanjiNumbers[index]}】
                      </span>
                      <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
                        <span className="font-serif font-semibold text-gray-900 dark:text-gray-100 group-hover:text-vermillion-600 dark:group-hover:text-gold-300 transition-colors">
                          {feature.title}
                          {feature.count && (
                            <span className="font-mono text-xs font-normal text-gray-400 dark:text-gray-500 ml-2">
                              {feature.count}
                            </span>
                          )}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {feature.description}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-vermillion-500 dark:group-hover:text-gold-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                    </Link>
                  ))}
                </div>
              </section>

              {/* 最近見たプロパティ */}
              {recentLoaded && recentProperties.length > 0 && (
                <section>
                  <div className="flex items-center gap-2.5 mb-4">
                    <span className="entry-marker" aria-hidden="true" />
                    <h2 className="font-serif text-lg font-semibold text-gray-900 dark:text-gray-100">
                      最近見たプロパティ
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recentProperties.slice(0, 3).map((property) => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                        isFavorite={isFavorite(property.id)}
                        onToggleFavorite={handleToggleFavorite}
                        onViewDetail={handleViewDetail}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* 定番の項目 */}
              <section>
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="entry-marker" aria-hidden="true" />
                  <h2 className="font-serif text-lg font-semibold text-gray-900 dark:text-gray-100">
                    定番の項目
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {standardProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      isFavorite={isFavorite(property.id)}
                      onToggleFavorite={handleToggleFavorite}
                      onViewDetail={handleViewDetail}
                    />
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </div>

      <div style={{ height: "64px" }} aria-hidden="true" />
      <Navigation activeTab="home" onTabChange={() => {}} />
    </Layout>
  );
}
