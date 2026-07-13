'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Navigation } from '@/components/Navigation';
import { SearchBar } from '@/components/SearchBar';
import { PropertyCard } from '@/components/PropertyCard';
import { useFavorites } from '@/hooks/useFavorites';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { useAnalytics } from '@/hooks/useAnalytics';
import { searchProperties, getUniqueCategories, filterByCategory } from '@/utils/search';
import { getCategoryAccent } from '@/utils/categoryColors';
import { getCategorySlug } from '@/utils/categorySlug';
import { cssProperties } from '@/data/properties';
import { usecases } from '@/data/usecases';

export function FindClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const { isFavorite, addFavorite, removeFavorite, isLoaded } = useFavorites();
  const { addRecentlyViewed } = useRecentlyViewed();
  const analytics = useAnalytics();

  const categories = getUniqueCategories(cssProperties);
  const results = searchQuery ? searchProperties(cssProperties, searchQuery) : [];

  const handleToggleFavorite = (propertyId: string) => {
    const property = cssProperties.find((p) => p.id === propertyId);
    if (isFavorite(propertyId)) {
      removeFavorite(propertyId);
      if (property) analytics.trackFavoriteRemove(propertyId, property.name);
    } else {
      addFavorite(propertyId);
      if (property) analytics.trackFavoriteAdd(propertyId, property.name);
    }
  };

  const handleViewDetail = (propertyId: string) => {
    addRecentlyViewed(propertyId);
    window.location.href = `/property/${propertyId}`;
  };

  return (
    <Layout>
      <div className="py-10">
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            さがす
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            検索、カテゴリ、やりたいことの逆引き。全{cssProperties.length}項目への入口です。
          </p>
        </div>

        <div className="space-y-10">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="プロパティを検索（例: 角丸、ダークモード、:has）..."
          />

          {searchQuery ? (
            <section>
              <div className="flex items-center gap-2.5 mb-4">
                <span className="entry-marker" aria-hidden="true" />
                <h2 className="font-serif text-lg font-semibold text-gray-900 dark:text-gray-100">
                  検索結果（{results.length}件）
                </h2>
              </div>
              {results.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {results.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      isFavorite={isLoaded ? isFavorite(property.id) : false}
                      onToggleFavorite={handleToggleFavorite}
                      onViewDetail={handleViewDetail}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400 py-8 text-center">
                  検索条件に一致するプロパティが見つかりませんでした
                </p>
              )}
            </section>
          ) : (
            <>
              {/* カテゴリから */}
              <section>
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="entry-marker" aria-hidden="true" />
                  <h2 className="font-serif text-lg font-semibold text-gray-900 dark:text-gray-100">
                    カテゴリから
                  </h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                  {categories.map((category) => {
                    const count = filterByCategory(cssProperties, category).length;
                    return (
                      <Link
                        key={category}
                        href={`/categories/${getCategorySlug(category)}/`}
                        className="group flex items-center gap-2.5 px-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md hover:border-vermillion-400 dark:hover:border-gold-500 transition-colors"
                      >
                        <span
                          className={`inline-block w-1 h-6 rounded-r shrink-0 ${getCategoryAccent(category)}`}
                          aria-hidden="true"
                        />
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200 flex-1 min-w-0 truncate">
                          {category}
                        </span>
                        <span className="font-mono text-xs text-gray-400 dark:text-gray-500 shrink-0">
                          {count}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </section>

              {/* 逆引き */}
              <section>
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="entry-marker" aria-hidden="true" />
                  <h2 className="font-serif text-lg font-semibold text-gray-900 dark:text-gray-100">
                    やりたいことから（逆引き）
                  </h2>
                </div>
                <Link
                  href="/reverse/"
                  className="group flex items-center justify-between gap-3 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-4 hover:border-vermillion-400 dark:hover:border-gold-500 transition-colors"
                >
                  <div>
                    <div className="font-medium text-gray-900 dark:text-gray-100 text-sm mb-1">
                      「中央寄せしたい」「ダークモードに対応したい」——{usecases.length}のユースケースから探す
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {usecases.slice(0, 4).map((u) => u.label).join(' / ')} など
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 shrink-0 group-hover:text-vermillion-500 dark:group-hover:text-gold-400 group-hover:translate-x-0.5 transition-all" />
                </Link>
              </section>
            </>
          )}
        </div>
      </div>
      <div style={{ height: '64px' }} aria-hidden="true" />
      <Navigation />
    </Layout>
  );
}
