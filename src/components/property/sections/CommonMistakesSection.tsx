import React from "react";

interface CommonMistakesSectionProps {
  commonMistakes: string;
}

export function CommonMistakesSection({ commonMistakes }: CommonMistakesSectionProps) {
  return (
    <section className="mb-8">
      <h2 className="font-serif text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        ⚠️ よくある間違い
      </h2>
      <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
        <p className="text-orange-800 dark:text-orange-300">
          {commonMistakes}
        </p>
      </div>
    </section>
  );
}
