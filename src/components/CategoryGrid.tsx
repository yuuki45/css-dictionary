import React from 'react';
import { ChevronRight } from 'lucide-react';

interface CategoryGridProps {
  categories: { name: string; count: number }[];
  onCategorySelect: (category: string) => void;
}

export function CategoryGrid({ categories, onCategorySelect }: CategoryGridProps) {
  const getCategoryColor = (index: number) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500', 
      'bg-purple-500',
      'bg-orange-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-teal-500',
      'bg-red-500'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category, index) => (
        <button
          key={category.name}
          onClick={() => onCategorySelect(category.name)}
          className="group bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 
                   hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200
                   hover:-translate-y-1"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${getCategoryColor(index)} rounded-lg flex items-center justify-center`}>
              <div className="w-6 h-6 bg-white rounded-sm opacity-90"></div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
          </div>
          
          <div className="text-left">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {category.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {category.count}個のプロパティ
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}