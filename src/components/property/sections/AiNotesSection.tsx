import React from "react";

interface AiNotesSectionProps {
  aiNotes: string;
}

export function AiNotesSection({ aiNotes }: AiNotesSectionProps) {
  return (
    <section className="mb-8">
      <h2 className="font-serif text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        🤖 AIがよく間違えるポイント
      </h2>
      <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
        <p className="text-purple-800 dark:text-purple-300">
          {aiNotes}
        </p>
      </div>
    </section>
  );
}
