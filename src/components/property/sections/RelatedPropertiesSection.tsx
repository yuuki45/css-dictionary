import React from "react";
import { ExternalLink } from "lucide-react";

interface RelatedPropertiesSectionProps {
  relatedProperties: string[];
  onNavigateToProperty: (id: string) => void;
}

export function RelatedPropertiesSection({
  relatedProperties,
  onNavigateToProperty,
}: RelatedPropertiesSectionProps) {
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
    </section>
  );
}
