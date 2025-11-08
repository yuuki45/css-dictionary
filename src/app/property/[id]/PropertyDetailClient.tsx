'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PropertyDetail } from '@/components/PropertyDetail';
import { Navigation } from '@/components/Navigation';
import { Breadcrumb } from '@/components/Breadcrumb';
import { useFavorites } from '@/hooks/useFavorites';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { useAnalytics } from '@/hooks/useAnalytics';
import { getCategorySlug } from '@/utils/categorySlug';
import { CSSProperty } from '@/types/css';
import cssPropertiesData from '@/data/cssProperties.json';

interface PropertyDetailClientProps {
  property: CSSProperty;
}

export function PropertyDetailClient({ property }: PropertyDetailClientProps) {
  const router = useRouter();
  const { isFavorite, addFavorite, removeFavorite, isLoaded } = useFavorites();
  const { addRecentlyViewed } = useRecentlyViewed();
  const analytics = useAnalytics();

  const properties: CSSProperty[] = cssPropertiesData;

  useEffect(() => {
    addRecentlyViewed(property.id);
  }, [property.id, addRecentlyViewed]);

  useEffect(() => {
    analytics.trackPropertyView(property.id, property.name);
  }, [property.id, property.name]);

  const handleToggleFavorite = (propertyId: string) => {
    const targetProperty = properties.find((p) => p.id === propertyId);
    if (isFavorite(propertyId)) {
      removeFavorite(propertyId);
      if (targetProperty) {
        analytics.trackFavoriteRemove(propertyId, targetProperty.name);
      }
    } else {
      addFavorite(propertyId);
      if (targetProperty) {
        analytics.trackFavoriteAdd(propertyId, targetProperty.name);
      }
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleNavigateToProperty = (propertyId: string) => {
    router.push(`/property/${propertyId}`);
  };

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-4">
        <Breadcrumb
          items={[
            {
              label: property.category,
              href: `/categories/${getCategorySlug(property.category)}/`,
            },
            {
              label: property.name,
            },
          ]}
        />
      </div>
      <PropertyDetail
        property={property}
        isFavorite={isLoaded ? isFavorite(property.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onBack={handleBack}
        onNavigateToProperty={handleNavigateToProperty}
      />
      <Navigation activeTab="home" onTabChange={() => {}} />
    </>
  );
}