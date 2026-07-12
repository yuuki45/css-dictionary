import React from "react";
import { Heart, ArrowLeft } from "lucide-react";
import { CSSProperty } from "../../types/css";
import { InteractiveDemo } from "../InteractiveDemo";
import { CopyForAIButton } from "../CopyForAIButton";
import { SyntaxSection } from "./sections/SyntaxSection";
import { ExamplesSection } from "./sections/ExamplesSection";
import { TipsSection } from "./sections/TipsSection";
import { CommonMistakesSection } from "./sections/CommonMistakesSection";
import { AiNotesSection } from "./sections/AiNotesSection";
import { PromptExamplesSection } from "./sections/PromptExamplesSection";
import { RelatedPropertiesSection } from "./sections/RelatedPropertiesSection";
import { BrowserSupportSection } from "./sections/BrowserSupportSection";

interface PropertyDetailProps {
  property: CSSProperty;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onBack: () => void;
  onNavigateToProperty: (id: string) => void;
}

export function PropertyDetail({
  property,
  isFavorite,
  onToggleFavorite,
  onBack,
  onNavigateToProperty,
}: PropertyDetailProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="sticky top-0 bg-gray-50/95 dark:bg-gray-900/95 backdrop-blur-sm rule-double z-40 px-4 py-3">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            戻る
          </button>
          <div className="flex items-center gap-2">
            <CopyForAIButton property={property} />
            <button
              onClick={() => onToggleFavorite(property.id)}
              className={`p-2 rounded-full transition-colors ${
                isFavorite
                  ? "text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                  : "text-gray-400 hover:text-red-500 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              <Heart className={`w-6 h-6 ${isFavorite ? "fill-current" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Title and Category */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="font-mono text-3xl font-bold text-gray-900 dark:text-gray-100">
              {property.name}
            </h1>
            <span className="px-2 py-0.5 text-xs font-medium border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-sm">
              {property.category}
            </span>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            {property.description}
          </p>
        </div>

        <SyntaxSection syntax={property.syntax} />

        {/* Interactive Demo */}
        {property.interactive && (
          <section className="mb-8">
            <InteractiveDemo
              config={property.interactive}
              propertyName={property.name}
            />
          </section>
        )}

        <ExamplesSection propertyId={property.id} examples={property.examples} />

        {property.tips && <TipsSection tips={property.tips} />}

        {property.commonMistakes && (
          <CommonMistakesSection commonMistakes={property.commonMistakes} />
        )}

        {property.aiNotes && <AiNotesSection aiNotes={property.aiNotes} />}

        {property.promptExamples && property.promptExamples.length > 0 && (
          <PromptExamplesSection promptExamples={property.promptExamples} />
        )}

        {property.relatedProperties.length > 0 && (
          <RelatedPropertiesSection
            propertyId={property.id}
            relatedProperties={property.relatedProperties}
            onNavigateToProperty={onNavigateToProperty}
          />
        )}

        <BrowserSupportSection browserSupport={property.browserSupport} />
      </div>
    </div>
  );
}
