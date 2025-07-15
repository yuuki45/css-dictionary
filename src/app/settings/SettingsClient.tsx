'use client';

import { Settings } from '@/components/Settings';
import { Navigation } from '@/components/Navigation';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';

export function SettingsClient() {
  const { clearRecentlyViewed } = useRecentlyViewed();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Settings onClearHistory={clearRecentlyViewed} />
      </div>
      <div style={{ height: "64px" }} aria-hidden="true" />
      <Navigation />
    </div>
  );
}