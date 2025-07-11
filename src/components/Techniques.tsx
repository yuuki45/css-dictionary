import React from "react";
import { techniques } from "../data/techniques";

export function Techniques({
  selectedId,
  onSelect,
  onBack,
}: {
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  onBack?: () => void;
}) {
  if (selectedId) {
    const tech = techniques.find((t) => t.id === selectedId);
    if (!tech) return <div>テクニックが見つかりません</div>;
    return (
      <div className="max-w-3xl mx-auto py-8 px-4">
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
        >
          <span className="text-lg">←</span> 一覧に戻る
        </button>
        <section className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
            {tech.title}
          </h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            {tech.description}
          </p>
          {tech.tips && (
            <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded text-blue-800 dark:text-blue-200 text-sm">
              💡 {tech.tips}
            </div>
          )}
          <div className="mb-4">
            <div className="font-semibold mb-1">デモ</div>
            <div className="border rounded p-4 bg-gray-50 dark:bg-gray-900">
              <style>{tech.css}</style>
              <div dangerouslySetInnerHTML={{ __html: tech.html }} />
            </div>
          </div>
          <div className="mb-4">
            <div className="font-semibold mb-1">HTML</div>
            <pre className="bg-gray-100 dark:bg-gray-900 rounded p-3 text-sm overflow-x-auto">
              <code>{tech.html}</code>
            </pre>
          </div>
          <div className="mb-4">
            <div className="font-semibold mb-1">CSS</div>
            <pre className="bg-gray-100 dark:bg-gray-900 rounded p-3 text-sm overflow-x-auto">
              <code>{tech.css}</code>
            </pre>
          </div>
        </section>
      </div>
    );
  }
  // 一覧画面
  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-blue-300">
        CSSテクニック集
      </h1>
      <div className="mb-6 text-sm text-red-600 dark:text-red-300">
        ※ PCでの閲覧推奨。スマホサイズだと一部デモが崩れる場合があります。
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {techniques.map((tech) => (
          <button
            key={tech.id}
            onClick={() => onSelect && onSelect(tech.id)}
            className="block w-full text-left p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
          >
            <div className="text-lg font-bold text-blue-700 dark:text-blue-300 mb-1 mt-0 min-h-[3rem]">
              {tech.title}
            </div>
            <div className="text-gray-600 dark:text-gray-300 text-sm">
              {tech.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
