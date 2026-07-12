import React from "react";

interface TipsSectionProps {
  tips: string;
}

export function TipsSection({ tips }: TipsSectionProps) {
  return (
    <section className="mb-8">
      <h2 className="font-serif text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        💡 TIPS
      </h2>
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
        <p className="text-green-800 dark:text-green-300">
          {tips}
        </p>
      </div>
    </section>
  );
}
