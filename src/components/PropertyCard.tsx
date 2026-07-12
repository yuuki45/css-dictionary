import React from "react";
import { Heart, Copy, ExternalLink } from "lucide-react";
import { CSSProperty } from "../types/css";
import { BaselineBadge } from "./BaselineBadge";
import { getCategoryAccent } from "../utils/categoryColors";

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
      className="relative bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 hover:border-vermillion-400 dark:hover:border-gold-500 transition-colors duration-200 p-6 pl-7"
    >
      {/* カテゴリ色の項目バー（辞書のインデックス風） */}
      <span
        className={`absolute left-0 top-5 bottom-5 w-[3px] rounded-r ${getCategoryAccent(property.category)}`}
        aria-hidden="true"
      />

      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-mono text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1.5">
            {property.name}
          </h3>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="inline-block px-1.5 py-0.5 text-[11px] font-medium border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-sm">
              {property.category}
            </span>
            {property.browserSupport.baseline !== "widely" && (
              <BaselineBadge baseline={property.browserSupport.baseline} size="sm" />
            )}
          </div>
        </div>
        <button
          onClick={() => onToggleFavorite(property.id)}
          className={`p-2 rounded-full transition-colors ${
            isFavorite
              ? "text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
              : "text-gray-400 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
          aria-label="お気に入り"
        >
          <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
        </button>
      </div>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2 leading-relaxed">
        {property.description}
      </p>

      {/* Code Example */}
      {property.examples[0] && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Example
            </span>
            <button
              onClick={() => copyToClipboard(property.examples[0].code)}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              title="コピー"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
          <div className="bg-gray-100 dark:bg-gray-900 rounded-sm p-3 font-mono text-sm border border-gray-200 dark:border-gray-700">
            <code className="text-gray-800 dark:text-gray-200">
              {property.examples[0].code}
            </code>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end">
        <button
          onClick={() => onViewDetail(property.id)}
          className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-vermillion-600 dark:text-gold-300
                   hover:bg-vermillion-50 dark:hover:bg-gold-900/20 rounded-md transition-colors"
        >
          詳細
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
