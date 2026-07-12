import React from "react";
import Link from "next/link";
import { techniques } from "../data/techniques";

export function Techniques() {
  // 一覧画面
  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h1 className="font-serif text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        CSSテクニック集
      </h1>
      <div className="mb-6 text-sm text-gray-500 dark:text-gray-400">
        各テクニックはHTML/CSSをその場で書き換えて試せます。動きの実装例は
        <Link
          href="/animations/"
          className="text-vermillion-600 dark:text-gold-300 hover:underline mx-1"
        >
          アニメーション実装集
        </Link>
        にまとまっています。
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {techniques.map((tech) => (
          <Link
            key={tech.id}
            href={`/techniques/${tech.id}`}
            className="block w-full text-left p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
          >
            <div className="text-lg font-bold text-blue-700 dark:text-blue-300 mb-1 mt-0 min-h-[3rem]">
              {tech.title}
            </div>
            <div className="text-gray-600 dark:text-gray-300 text-sm">
              {tech.description}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
