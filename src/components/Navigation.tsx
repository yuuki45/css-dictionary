import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Layers, Heart, Settings, Search, Sparkles } from "lucide-react";

interface NavigationProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export function Navigation({
  activeTab,
  onTabChange,
}: NavigationProps) {
  const pathname = usePathname();
  
  const tabs = [
    { id: "home", label: "ホーム", icon: Home, href: "/" },
    { id: "categories", label: "カテゴリ", icon: Layers, href: "/categories" },
    { id: "reverse", label: "逆引き", icon: Search, href: "/reverse" },
    { id: "techniques", label: "テクニック", icon: Sparkles, href: "/techniques" },
    { id: "favorites", label: "お気に入り", icon: Heart, href: "/favorites" },
    { id: "settings", label: "設定", icon: Settings, href: "/settings" },
  ];

  const getActiveTab = () => {
    if (activeTab) return activeTab;
    
    // パスから現在のタブを判定
    if (pathname === "/") return "home";
    if (pathname.startsWith("/categories")) return "categories";
    if (pathname.startsWith("/reverse")) return "reverse";
    if (pathname.startsWith("/techniques")) return "techniques";
    if (pathname.startsWith("/favorites")) return "favorites";
    if (pathname.startsWith("/settings")) return "settings";
    if (pathname.startsWith("/property")) return "home"; // プロパティ詳細はホームタブ
    
    return "home";
  };

  const currentActiveTab = getActiveTab();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-around py-2">
          {tabs.map(({ id, label, icon: Icon, href }) => (
            <Link
              key={id}
              href={href}
              className={`flex flex-col items-center px-3 py-2 rounded-lg transition-all duration-200 ${
                currentActiveTab === id
                  ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 transform scale-105"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              <Icon
                className={`w-5 h-5 mb-1 transition-transform ${
                  currentActiveTab === id ? "scale-110" : ""
                }`}
              />
              <span className="text-xs font-medium hidden sm:block">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
