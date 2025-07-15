import React from 'react';
import { ChevronRight } from 'lucide-react';

interface CategoryListProps {
  categories: { name: string; count: number }[];
  onCategorySelect: (category: string) => void;
}

export function CategoryList({ categories, onCategorySelect }: CategoryListProps) {
  return (
    <div className="space-y-2">
      {categories.map((category) => (
        <button
          key={category.name}
          onClick={() => onCategorySelect(category.name)}
          className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 
                   border border-gray-200 dark:border-gray-700 rounded-lg 
                   hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {category.name}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {category.count}件
            </span>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
          </div>
        </button>
      ))}
    </div>
  );
}