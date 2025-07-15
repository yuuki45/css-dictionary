'use client';

import { Techniques } from '@/components/Techniques';
import { Navigation } from '@/components/Navigation';

export function TechniquesClient() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Techniques />
      <div style={{ height: "64px" }} aria-hidden="true" />
      <Navigation activeTab="techniques" onTabChange={() => {}} />
    </div>
  );
}