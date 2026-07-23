import React from "react";
import { tailwindMap } from "../../../data/tailwindMap";

interface TailwindSectionProps {
  propertyId: string;
}

/** このプロパティのTailwind対応（クラス・パターン・バリアント）。対応データが無ければ何も描画しない */
export function TailwindSection({ propertyId }: TailwindSectionProps) {
  const tw = tailwindMap[propertyId];
  if (!tw) return null;

  return (
    <section className="mb-8">
      <h2 className="font-serif text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Tailwindでは
      </h2>
      <div className="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden">
        {tw.variant && (
          <p className="px-4 pt-4 text-sm text-gray-700 dark:text-gray-300">
            バリアント{" "}
            <code className="font-mono font-semibold text-vermillion-600 dark:text-gold-300">
              {tw.variant}
            </code>{" "}
            を先頭に付けて使います
          </p>
        )}
        {tw.classes && tw.classes.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <tbody>
                {tw.classes.map((entry) => (
                  <tr
                    key={entry.className}
                    className="border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                  >
                    <td className="px-4 py-2 font-mono font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap">
                      {entry.className}
                    </td>
                    <td className="px-4 py-2 font-mono text-xs text-gray-500 dark:text-gray-400">
                      {entry.css}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {(tw.pattern || tw.arbitrary) && (
          <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-400 space-y-1">
            {tw.pattern && (
              <p>
                一般形: <code className="font-mono">{tw.pattern}</code>
              </p>
            )}
            {tw.arbitrary && (
              <p>
                任意値: <code className="font-mono">{tw.arbitrary}</code>
              </p>
            )}
          </div>
        )}
        {tw.note && (
          <p className="px-4 py-3 border-t border-gray-100 dark:border-gray-700 text-xs leading-relaxed text-gray-600 dark:text-gray-400">
            {tw.note}
          </p>
        )}
      </div>
    </section>
  );
}
