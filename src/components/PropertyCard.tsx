import React from "react";
import { Heart, Copy, ExternalLink } from "lucide-react";
import { CSSProperty } from "../types/css";

interface PropertyCardProps {
  property: CSSProperty;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onViewDetail: (id: string) => void;
}

export function PropertyCard({
  property,
  isFavorite,
  onToggleFavorite,
  onViewDetail,
}: PropertyCardProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div
      id={property.id}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 p-6 border border-gray-200 dark:border-gray-700"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
            {property.name}
          </h3>
          <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full">
            {property.category}
          </span>
        </div>
        <button
          onClick={() => onToggleFavorite(property.id)}
          className={`p-2 rounded-full transition-colors ${
            isFavorite
              ? "text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
              : "text-gray-400 hover:text-red-500 hover:bg-gray-50 dark:hover:bg-gray-700"
          }`}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
        </button>
      </div>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
        {property.description}
      </p>

      {/* Code Example */}
      {property.examples[0] && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              コード例
            </span>
            <button
              onClick={() => copyToClipboard(property.examples[0].code)}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              title="コピー"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-3 font-mono text-sm border">
            <code className="text-gray-800 dark:text-gray-200">
              {property.examples[0].code}
            </code>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-between items-center">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          関連: {property.relatedProperties.slice(0, 2).join(", ")}
          {property.relatedProperties.length > 2 && "..."}
        </div>
        <button
          onClick={() => onViewDetail(property.id)}
          className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 
                   hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors"
        >
          詳細
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
