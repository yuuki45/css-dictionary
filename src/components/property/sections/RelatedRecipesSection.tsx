import React from "react";
import Link from "next/link";
import { Blocks } from "lucide-react";
import { recipes } from "../../../data/recipes";

interface RelatedRecipesSectionProps {
  propertyId: string;
}

/** このプロパティをkeyPropertiesに含むUIレシピへの逆リンク。該当がなければ何も描画しない */
export function RelatedRecipesSection({ propertyId }: RelatedRecipesSectionProps) {
  const relatedRecipes = recipes.filter((recipe) =>
    recipe.keyProperties.includes(propertyId)
  );

  if (relatedRecipes.length === 0) return null;

  return (
    <section className="mb-8">
      <h2 className="font-serif text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        このプロパティを使ったUIレシピ
      </h2>
      <div className="space-y-2">
        {relatedRecipes.map((recipe) => (
          <Link
            key={recipe.id}
            href={`/recipes/${recipe.id}/`}
            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-vermillion-600 dark:hover:text-gold-300 transition-colors"
          >
            <Blocks className="w-4 h-4 shrink-0" />
            {recipe.title}（{recipe.category}）
          </Link>
        ))}
      </div>
    </section>
  );
}
