'use client';

import { PropertyCard } from '@/components/PropertyCard';
import { Navigation } from '@/components/Navigation';
import { useFavorites } from '@/hooks/useFavorites';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { useAnalytics } from '@/hooks/useAnalytics';
import { CSSProperty } from '@/types/css';
import cssPropertiesData from '@/data/cssProperties.json';
import { Star } from 'lucide-react';

export function FavoritesClient() {
  const { isFavorite, addFavorite, removeFavorite, getFavoriteIds, isLoaded } = useFavorites();
  const { addRecentlyViewed } = useRecentlyViewed();
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
    addRecentlyViewed(propertyId);
    window.location.href = `/property/${propertyId}`;
  };

  const favoriteProperties = isLoaded 
    ? properties.filter((p) => getFavoriteIds().includes(p.id))
    : [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              お気に入り
            </h1>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              ({favoriteProperties.length}件)
            </span>
          </div>

          {isLoaded ? (
            favoriteProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {favoriteProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    isFavorite={true}
                    onToggleFavorite={handleToggleFavorite}
                    onViewDetail={handleViewDetail}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Star className="w-12 h-12 mx-auto mb-4 text-gray-400 dark:text-gray-500" />
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  お気に入りプロパティがありません
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  気になるプロパティのハートマークをクリックしてお気に入りに追加しましょう
                </p>
              </div>
            )
          ) : (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="text-gray-600 dark:text-gray-400 mt-4">読み込み中...</p>
            </div>
          )}
        </div>
      </div>
      <div style={{ height: "64px" }} aria-hidden="true" />
      <Navigation />
    </div>
  );
}