'use client';

import { useState } from 'react';
import { CategoryGrid } from '@/components/CategoryGrid';
import { CategoryDetail } from '@/components/CategoryDetail';
import { Navigation } from '@/components/Navigation';
import { useFavorites } from '@/hooks/useFavorites';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { useAnalytics } from '@/hooks/useAnalytics';
import { getUniqueCategories, filterByCategory } from '@/utils/search';
import { CSSProperty } from '@/types/css';
import cssPropertiesData from '@/data/cssProperties.json';
import { Layers } from 'lucide-react';

export function CategoriesClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { addRecentlyViewed } = useRecentlyViewed();
  const analytics = useAnalytics();

  const properties: CSSProperty[] = cssPropertiesData;
  const categories = getUniqueCategories(properties);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    analytics.trackCategorySelect(category);
  };

  const handleBackToCategories = () => {
    setSelectedCategory('');
  };

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

  const categoryStats = categories
    .map((category) => ({
      name: category,
      count: properties.filter((p) => p.category === category).length,
    }))
    .sort((a, b) => {
      if (a.name === 'その他') return 1;
      if (b.name === 'その他') return -1;
      return b.count - a.count;
    });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {selectedCategory ? (
            <CategoryDetail
              category={selectedCategory}
              properties={filterByCategory(properties, selectedCategory)}
              onBack={handleBackToCategories}
              onToggleFavorite={handleToggleFavorite}
              onViewDetail={handleViewDetail}
              isFavorite={isFavorite}
            />
          ) : (
            <>
              <div className="flex items-center gap-2 mb-6">
                <Layers className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  カテゴリ一覧
                </h1>
              </div>
              <CategoryGrid
                categories={categoryStats}
                onCategorySelect={handleCategorySelect}
              />
            </>
          )}
        </div>
      </div>
      <div style={{ height: '64px' }} aria-hidden="true" />
      <Navigation activeTab="categories" onTabChange={() => {}} />
    </div>
  );
}