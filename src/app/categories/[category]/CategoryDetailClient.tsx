'use client';

import { CategoryDetail } from '@/components/CategoryDetail';
import { Navigation } from '@/components/Navigation';
import { useFavorites } from '@/hooks/useFavorites';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { useAnalytics } from '@/hooks/useAnalytics';
import { CSSProperty } from '@/types/css';
import { useRouter } from 'next/navigation';

interface CategoryDetailClientProps {
  category: string;
  properties: CSSProperty[];
}

export function CategoryDetailClient({ category, properties }: CategoryDetailClientProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { addRecentlyViewed } = useRecentlyViewed();
  const analytics = useAnalytics();
  const router = useRouter();

  const handleBackToCategories = () => {
    router.push('/categories');
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
    router.push(`/property/${propertyId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <CategoryDetail
            category={category}
            properties={properties}
            onBack={handleBackToCategories}
            onToggleFavorite={handleToggleFavorite}
            onViewDetail={handleViewDetail}
            isFavorite={isFavorite}
          />
        </div>
      </div>
      <div style={{ height: '64px' }} aria-hidden="true" />
      <Navigation activeTab="categories" onTabChange={() => {}} />
    </div>
  );
}