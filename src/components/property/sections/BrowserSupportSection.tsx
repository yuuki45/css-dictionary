import React from "react";
import { BrowserSupport } from "../../../types/css";
import { BaselineBadge } from "../../BaselineBadge";

interface BrowserSupportSectionProps {
  browserSupport: BrowserSupport;
}

export function BrowserSupportSection({ browserSupport }: BrowserSupportSectionProps) {
  return (
    <section className="mb-8">
      <h2 className="font-serif text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        ブラウザサポート
      </h2>
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 space-y-4">
        <BaselineBadge
          baseline={browserSupport.baseline}
          baselineLowDate={browserSupport.baselineLowDate}
        />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {(
            [
              ["Chrome", browserSupport.chrome],
              ["Firefox", browserSupport.firefox],
              ["Safari", browserSupport.safari],
              ["Edge", browserSupport.edge],
            ] as const
          ).map(([browser, version]) => (
            <div
              key={browser}
              className="bg-white dark:bg-gray-800 rounded-md px-3 py-2 text-center border border-blue-100 dark:border-blue-900"
            >
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {browser}
              </div>
              <div
                className={`text-sm font-semibold ${
                  version
                    ? "text-gray-900 dark:text-gray-100"
                    : "text-red-500 dark:text-red-400"
                }`}
              >
                {version ? `${version}+` : "未対応"}
              </div>
            </div>
          ))}
        </div>
        {browserSupport.note && (
          <p className="text-sm text-blue-800 dark:text-blue-300">
            {browserSupport.note}
          </p>
        )}
      </div>
    </section>
  );
}
