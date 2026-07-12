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
import {
  searchProperties,
  getUniqueCategories,
  filterByCategory,
} from "@/utils/search";
import { CSSProperty } from "@/types/css";
import { cssProperties } from "@/data/properties";
import { Layers, Sparkles, ArrowRight } from "lucide-react";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
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

  const { isFavorite, addFavorite, removeFavorite, getFavoriteIds, isLoaded: favoritesLoaded } =
    useFavorites();
  const { addRecentlyViewed, getRecentIds, isLoaded: recentLoaded } = useRecentlyViewed();
  const { theme } = useTheme();
  const analytics = useAnalytics();

  const properties: CSSProperty[] = cssProperties;

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
    window.location.href = `/property/${propertyId}`;
  };

  const filteredProperties = searchQuery
    ? searchProperties(properties, searchQuery)
    : selectedCategory
    ? filterByCategory(properties, selectedCategory)
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

  const favoriteProperties = properties.filter((p) =>
    getFavoriteIds().includes(p.id)
  );
  const recentProperties = properties.filter((p) =>
    getRecentIds(5).includes(p.id)
  );

  return (
    <Layout>
      <div className="py-10">
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

        <div className="space-y-8">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="プロパティを検索（例: 角丸、ダークモード、:has）..."
            inputRef={searchInputRef}
          />

          {!searchQuery && (
            <Link
              href="/modern/"
              className="group flex items-center justify-between gap-3 rounded-md border border-gold-300 dark:border-gold-700 bg-gold-50 dark:bg-gold-900/20 px-4 py-3 hover:border-gold-500 dark:hover:border-gold-500 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-gold-600 dark:text-gold-300 shrink-0" />
                <div>
                  <div className="font-serif font-semibold text-gray-900 dark:text-gray-100 text-sm">
                    モダンCSS — あなたのAIが知らないかもしれない新機能
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    :has()・ネスティング・View Transitions など2022年以降の新しいCSS
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gold-600 dark:text-gold-400 shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          )}

          {!searchQuery && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Link
                href="/compare/"
                className="group flex items-center justify-between gap-3 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 hover:border-vermillion-400 dark:hover:border-gold-500 transition-colors"
              >
                <div>
                  <div className="font-serif font-semibold text-gray-900 dark:text-gray-100 text-sm">
                    比較でわかるCSS
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    FlexとGridの違いなど、混同しがちな「違い」を整理
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 shrink-0 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/ai-review/"
                className="group flex items-center justify-between gap-3 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 hover:border-vermillion-400 dark:hover:border-gold-500 transition-colors"
              >
                <div>
                  <div className="font-serif font-semibold text-gray-900 dark:text-gray-100 text-sm">
                    AI生成CSSレビューチェックリスト
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    AIがよく間違えるポイント全網羅の観点集
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 shrink-0 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          )}

          {recentLoaded && recentProperties.length > 0 && !searchQuery && (
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

          <section>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="entry-marker" aria-hidden="true" />
              <h2 className="font-serif text-lg font-semibold text-gray-900 dark:text-gray-100">
                {searchQuery
                  ? `検索結果（${filteredProperties.length}件）`
                  : "人気のプロパティ"}
              </h2>
            </div>
            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProperties
                  .slice(0, searchQuery ? undefined : 6)
                  .map((property) => (
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
        </div>
      </div>

      <Navigation activeTab="home" onTabChange={() => {}} />
    </Layout>
  );
}