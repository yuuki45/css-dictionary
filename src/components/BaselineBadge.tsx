import React from 'react';
import { BaselineStatus } from '@/types/css';

interface BaselineBadgeProps {
  baseline: BaselineStatus;
  baselineLowDate?: string;
  size?: 'sm' | 'md';
}

const config: Record<BaselineStatus, { label: string; className: string }> = {
  widely: {
    label: 'Baseline 広く利用可能',
    className:
      'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 border-green-300 dark:border-green-700',
  },
  newly: {
    label: 'Baseline 新しく利用可能',
    className:
      'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border-blue-300 dark:border-blue-700',
  },
  limited: {
    label: '対応が限定的',
    className:
      'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border-amber-300 dark:border-amber-700',
  },
};

// 年月 "2023-09" → "2023年9月"
function formatYearMonth(yearMonth: string): string {
  const [year, month] = yearMonth.split('-');
  return `${year}年${Number(month)}月`;
}

export function BaselineBadge({ baseline, baselineLowDate, size = 'md' }: BaselineBadgeProps) {
  const { label, className } = config[baseline];
  const sizeClass = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1';

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border font-medium ${sizeClass} ${className}`}
      title={
        baseline === 'newly' && baselineLowDate
          ? `${formatYearMonth(baselineLowDate)}に全主要ブラウザ対応`
          : undefined
      }
    >
      {label}
      {baseline === 'newly' && baselineLowDate && (
        <span className="font-normal opacity-75">（{formatYearMonth(baselineLowDate)}〜）</span>
      )}
    </span>
  );
}
