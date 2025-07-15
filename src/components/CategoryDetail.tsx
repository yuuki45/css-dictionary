import React from 'react';
import { ArrowLeft, Layers } from 'lucide-react';
import { PropertyCard } from './PropertyCard';
import { CSSProperty } from '../types/css';

interface CategoryDetailProps {
  category: string;
  properties: CSSProperty[];
  onBack: () => void;
  onToggleFavorite: (id: string) => void;
  onViewDetail: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export function CategoryDetail({ 
  category, 
  properties, 
  onBack, 
  onToggleFavorite, 
  onViewDetail, 
  isFavorite 
}: CategoryDetailProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <Layers className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {category}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {properties.length}個のプロパティ
            </p>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            isFavorite={isFavorite(property.id)}
            onToggleFavorite={onToggleFavorite}
            onViewDetail={onViewDetail}
          />
        ))}
      </div>

      {properties.length === 0 && (
        <div className="text-center py-12">
          <Layers className="w-12 h-12 mx-auto mb-4 text-gray-400 dark:text-gray-500" />
          <p className="text-gray-600 dark:text-gray-400">
            このカテゴリにはプロパティがありません
          </p>
        </div>
      )}
    </div>
  );
}