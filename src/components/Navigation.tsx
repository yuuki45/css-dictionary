import React from "react";
import { Home, Layers, Heart, Settings, Search, Sparkles } from "lucide-react";

interface NavigationProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export function Navigation({
  activeTab = "home",
  onTabChange,
}: NavigationProps) {
  const tabs = [
    { id: "home", label: "ホーム", icon: Home },
    { id: "categories", label: "カテゴリ", icon: Layers },
    { id: "reverse", label: "逆引き", icon: Search },
    { id: "techniques", label: "テクニック", icon: Sparkles },
    { id: "favorites", label: "お気に入り", icon: Heart },
    { id: "settings", label: "設定", icon: Settings },
  ];

  const handleTabClick = (tabId: string) => {
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-around py-2">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => handleTabClick(id)}
              className={`flex flex-col items-center px-3 py-2 rounded-lg transition-all duration-200 ${
                activeTab === id
                  ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 transform scale-105"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              <Icon
                className={`w-5 h-5 mb-1 transition-transform ${
                  activeTab === id ? "scale-110" : ""
                }`}
              />
              <span className="text-xs font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
