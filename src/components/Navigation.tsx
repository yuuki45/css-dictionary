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
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-50/95 dark:bg-gray-900/95 backdrop-blur-sm border-t border-gray-300 dark:border-gray-700 shadow-[0_-3px_0_-2px] shadow-gray-200 dark:shadow-gray-800 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-around py-2">
          {tabs.map(({ id, label, icon: Icon, href }) => (
            <Link
              key={id}
              href={href}
              className={`relative flex flex-col items-center px-3 py-2 transition-colors duration-200 ${
                currentActiveTab === id
                  ? "text-vermillion-600 dark:text-gold-300"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              {/* アクティブタブの朱点 */}
              {currentActiveTab === id && (
                <span className="absolute -top-0.5 w-1 h-1 rounded-full bg-vermillion-500 dark:bg-gold-400" />
              )}
              <Icon className="w-5 h-5 mb-1" />
              <span
                className={`text-xs hidden sm:block ${
                  currentActiveTab === id ? "font-bold" : "font-medium"
                }`}
              >
                {label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
