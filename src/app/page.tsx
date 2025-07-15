'use client';

import { useState, useEffect } from "react";
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
import cssPropertiesData from "@/data/cssProperties.json";
import { Clock, Star, Layers, TrendingUp } from "lucide-react";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const { isFavorite, addFavorite, removeFavorite, getFavoriteIds, isLoaded: favoritesLoaded } =
    useFavorites();
  const { addRecentlyViewed, getRecentIds, isLoaded: recentLoaded } = useRecentlyViewed();
  const { theme } = useTheme();
  const analytics = useAnalytics();

  const properties: CSSProperty[] = cssPropertiesData;

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
      <div className="py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            CSS Dictionary
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            CSSプロパティを効率的に学習しよう！
          </p>
        </div>

        <div className="space-y-8">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="プロパティを検索..."
          />

          {recentLoaded && recentProperties.length > 0 && !searchQuery && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
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
            <div className="flex items-center gap-2 mb-4">
              {searchQuery ? (
                <Layers className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <TrendingUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {searchQuery
                  ? `検索結果 (${filteredProperties.length}件)`
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