'use client';

import { useState } from 'react';
import { PropertyCard } from '@/components/PropertyCard';
import { Navigation } from '@/components/Navigation';
import { useFavorites } from '@/hooks/useFavorites';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { useAnalytics } from '@/hooks/useAnalytics';
import { CSSProperty } from '@/types/css';
import { usecases, Usecase } from '@/data/usecases';
import cssPropertiesData from '@/data/cssProperties.json';

export function ReverseClient() {
  const [selectedUsecase, setSelectedUsecase] = useState<Usecase | null>(null);
  const [usecasePage, setUsecasePage] = useState(0);
  
  const { isFavorite, addFavorite, removeFavorite, isLoaded } = useFavorites();
  const { addRecentlyViewed } = useRecentlyViewed();
  const analytics = useAnalytics();

  const properties: CSSProperty[] = cssPropertiesData;

  const handleUsecaseSelect = (usecase: Usecase) => {
    setSelectedUsecase(usecase);
    analytics.trackUsecaseSelect(usecase.id, usecase.label);
  };

  const handleBackToUsecases = () => setSelectedUsecase(null);

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

  const usecasesPerPage = 10;
  const pagedUsecases = usecases.slice(
    usecasePage * usecasesPerPage,
    (usecasePage + 1) * usecasesPerPage
  );
  const totalPages = Math.ceil(usecases.length / usecasesPerPage);

  let content;
  if (!selectedUsecase) {
    content = (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {pagedUsecases.map((uc) => (
            <button
              key={uc.id}
              onClick={() => handleUsecaseSelect(uc)}
              className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-left"
            >
              <div className="text-lg font-bold text-blue-700 dark:text-blue-300 mb-1">
                {uc.label}
              </div>
              <div className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                {uc.description}
              </div>
              <div className="text-xs text-gray-400">
                {uc.propertyIds.length}件の関連プロパティ
              </div>
            </button>
          ))}
        </div>
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setUsecasePage((p) => Math.max(0, p - 1))}
            disabled={usecasePage === 0}
            className={`px-4 py-2 rounded border text-sm font-medium transition-colors ${
              usecasePage === 0
                ? "bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            }`}
          >
            前へ
          </button>
          <span className="self-center text-sm text-gray-600 dark:text-gray-300">
            {usecasePage + 1} / {totalPages}
          </span>
          <button
            onClick={() =>
              setUsecasePage((p) => Math.min(totalPages - 1, p + 1))
            }
            disabled={usecasePage === totalPages - 1}
            className={`px-4 py-2 rounded border text-sm font-medium transition-colors ${
              usecasePage === totalPages - 1
                ? "bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            }`}
          >
            次へ
          </button>
        </div>
      </>
    );
  } else {
    const relatedProperties = properties.filter((p) =>
      selectedUsecase.propertyIds.includes(p.id)
    );
    content = (
      <>
        <button
          onClick={handleBackToUsecases}
          className="mb-6 flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
        >
          <span className="text-lg">←</span> ユースケース一覧に戻る
        </button>
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          {selectedUsecase.label} に関連するプロパティ
        </h2>
        {relatedProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedProperties.map((property) => (
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
          <div className="text-gray-500">該当するプロパティがありません</div>
        )}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          逆引き（ユースケースから探す）
        </h1>
        {content}
      </div>
      <div style={{ height: "64px" }} aria-hidden="true" />
      <Navigation />
    </div>
  );
}