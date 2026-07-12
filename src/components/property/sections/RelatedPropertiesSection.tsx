import React from "react";
import Link from "next/link";
import { ExternalLink, Scale } from "lucide-react";
import { comparisons } from "../../../data/comparisons";

interface RelatedPropertiesSectionProps {
  propertyId: string;
  relatedProperties: string[];
  onNavigateToProperty: (id: string) => void;
}

export function RelatedPropertiesSection({
  propertyId,
  relatedProperties,
  onNavigateToProperty,
}: RelatedPropertiesSectionProps) {
  const relatedComparisons = comparisons.filter((comparison) =>
    comparison.propertyIds.includes(propertyId)
  );

  return (
    <section className="mb-8">
      <h2 className="font-serif text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        関連プロパティ
      </h2>
      <div className="flex flex-wrap gap-2">
        {relatedProperties.map((relatedId) => (
          <button
            key={relatedId}
            onClick={() => onNavigateToProperty(relatedId)}
            className="inline-flex items-center gap-1 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                           rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            {relatedId}
            <ExternalLink className="w-3 h-3" />
          </button>
        ))}
      </div>
      {relatedComparisons.length > 0 && (
        <div className="mt-4 space-y-2">
          {relatedComparisons.map((comparison) => (
            <Link
              key={comparison.id}
              href={`/compare/${comparison.id}/`}
              className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-vermillion-600 dark:hover:text-gold-300 transition-colors"
            >
              <Scale className="w-4 h-4 shrink-0" />
              比較記事: {comparison.title}
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
