import React from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { getCategorySlug } from '@/utils/categorySlug';
import { getCategoryAccent } from '@/utils/categoryColors';

interface CategoryGridProps {
  categories: { name: string; count: number }[];
  onCategorySelect?: (category: string) => void;
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category) => (
        <Link
          key={category.name}
          href={`/categories/${getCategorySlug(category.name)}`}
          className="group relative bg-white dark:bg-gray-800 rounded-md p-6 pl-7 border border-gray-200 dark:border-gray-700
                   hover:border-vermillion-400 dark:hover:border-gold-500 transition-colors duration-200 block"
        >
          {/* カテゴリ色の項目バー */}
          <span
            className={`absolute left-0 top-5 bottom-5 w-[3px] rounded-r ${getCategoryAccent(category.name)}`}
            aria-hidden="true"
          />
          <div className="flex items-center justify-between">
            <div className="text-left">
              <h3 className="font-serif text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1 group-hover:text-vermillion-600 dark:group-hover:text-gold-300 transition-colors">
                {category.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {category.count}項目
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-vermillion-500 dark:group-hover:text-gold-400 group-hover:translate-x-0.5 transition-all" />
          </div>
        </Link>
      ))}
    </div>
  );
}
