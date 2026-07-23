'use client';

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, BookOpen, Heart } from "lucide-react";

interface NavigationProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

// 旧タブID（categories/reverse/techniques等）からの互換マッピング
const legacyTabMap: Record<string, string> = {
  categories: "find",
  reverse: "find",
  techniques: "read",
  settings: "",
};

export function Navigation({
  activeTab,
  onTabChange,
}: NavigationProps) {
  const pathname = usePathname();

  const tabs = [
    { id: "home", label: "ホーム", icon: Home, href: "/" },
    { id: "find", label: "さがす", icon: Search, href: "/find" },
    { id: "read", label: "よみもの", icon: BookOpen, href: "/read" },
    { id: "favorites", label: "お気に入り", icon: Heart, href: "/favorites" },
  ];

  const getActiveTab = () => {
    if (activeTab) return legacyTabMap[activeTab] ?? activeTab;

    // パスから現在のタブを判定
    if (pathname === "/") return "home";
    if (pathname.startsWith("/find")) return "find";
    if (pathname.startsWith("/categories")) return "find";
    if (pathname.startsWith("/reverse")) return "find";
    if (pathname.startsWith("/read")) return "read";
    if (pathname.startsWith("/modern")) return "read";
    if (pathname.startsWith("/animations")) return "read";
    if (pathname.startsWith("/recipes")) return "read";
    if (pathname.startsWith("/compare")) return "read";
    if (pathname.startsWith("/ai-review")) return "read";
    if (pathname.startsWith("/techniques")) return "read";
    if (pathname.startsWith("/favorites")) return "favorites";
    if (pathname.startsWith("/property")) return "home"; // プロパティ詳細はホームタブ

    return "";
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
              className={`relative flex flex-col items-center px-4 py-2 transition-colors duration-200 ${
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
                className={`text-[11px] sm:text-xs ${
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
