import { useEffect } from "react";

// Google Analytics の型定義
declare global {
  interface Window {
    gtag: (
      command: "config" | "event" | "js" | "set",
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
    dataLayer: any[];
  }
}

export const useAnalytics = () => {
  // ページビューを送信
  const trackPageView = (page_title: string, page_location?: string) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "page_view", {
        page_title,
        page_location: page_location || window.location.href,
      });
    }
  };

  // カスタムイベントを送信
  const trackEvent = (event_name: string, parameters?: Record<string, any>) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", event_name, parameters);
    }
  };

  // プロパティ詳細表示イベント
  const trackPropertyView = (propertyId: string, propertyName: string) => {
    trackEvent("property_view", {
      property_id: propertyId,
      property_name: propertyName,
    });
  };

  // お気に入り追加イベント
  const trackFavoriteAdd = (propertyId: string, propertyName: string) => {
    trackEvent("favorite_add", {
      property_id: propertyId,
      property_name: propertyName,
    });
  };

  // お気に入り削除イベント
  const trackFavoriteRemove = (propertyId: string, propertyName: string) => {
    trackEvent("favorite_remove", {
      property_id: propertyId,
      property_name: propertyName,
    });
  };

  // 検索イベント
  const trackSearch = (searchQuery: string, resultCount: number) => {
    trackEvent("search", {
      search_term: searchQuery,
      result_count: resultCount,
    });
  };

  // カテゴリ選択イベント
  const trackCategorySelect = (categoryName: string) => {
    trackEvent("category_select", {
      category_name: categoryName,
    });
  };

  // ユースケース選択イベント
  const trackUsecaseSelect = (usecaseId: string, usecaseLabel: string) => {
    trackEvent("usecase_select", {
      usecase_id: usecaseId,
      usecase_label: usecaseLabel,
    });
  };

  // テクニック表示イベント
  const trackTechniqueView = (techniqueId: string, techniqueTitle: string) => {
    trackEvent("technique_view", {
      technique_id: techniqueId,
      technique_title: techniqueTitle,
    });
  };

  // テーマ変更イベント
  const trackThemeChange = (theme: string) => {
    trackEvent("theme_change", {
      theme_name: theme,
    });
  };

  // コードコピーイベント
  const trackCodeCopy = (techniqueId: string, codeType: string) => {
    trackEvent("code_copy", {
      technique_id: techniqueId,
      code_type: codeType,
    });
  };

  return {
    trackPageView,
    trackEvent,
    trackPropertyView,
    trackFavoriteAdd,
    trackFavoriteRemove,
    trackSearch,
    trackCategorySelect,
    trackUsecaseSelect,
    trackTechniqueView,
    trackThemeChange,
    trackCodeCopy,
  };
};
