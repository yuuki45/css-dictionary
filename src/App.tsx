import React, { useState, useEffect } from "react";
import { Layout } from "./components/Layout";
import { Navigation } from "./components/Navigation";
import { SearchBar } from "./components/SearchBar";
import { PropertyCard } from "./components/PropertyCard";
import { PropertyDetail } from "./components/PropertyDetail";
import { CategoryGrid } from "./components/CategoryGrid";
import { CategoryDetail } from "./components/CategoryDetail";
import { Settings } from "./components/Settings";
import { useFavorites } from "./hooks/useFavorites";
import { useRecentlyViewed } from "./hooks/useRecentlyViewed";
import { useTheme } from "./hooks/useTheme";
import { useAnalytics } from "./hooks/useAnalytics";
import {
  searchProperties,
  getUniqueCategories,
  filterByCategory,
} from "./utils/search";
import { CSSProperty } from "./types/css";
import cssPropertiesData from "./data/cssProperties.json";
import { Clock, Star, Layers, TrendingUp } from "lucide-react";
import { usecases, Usecase } from "./data/usecases";
import { techniques } from "./data/techniques";
import { Techniques } from "./components/Techniques";

// SEO用ページタイトル更新関数
const updatePageTitle = (title: string) => {
  document.title = title
    ? `${title} | CSS辞書`
    : "CSS辞書 - CSSプロパティ完全ガイド";
};

// SEO用メタディスクリプション更新関数
const updateMetaDescription = (description: string) => {
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute("content", description);
  }
};

// スクロール復元用
const lastScrollInfoKey = "lastPropertyScrollInfo";

function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsecase, setSelectedUsecase] = useState<Usecase | null>(null);
  const [selectedTechniqueId, setSelectedTechniqueId] = useState<string | null>(
    null
  );
  const [usecasePage, setUsecasePage] = useState(0);

  const { isFavorite, addFavorite, removeFavorite, getFavoriteIds } =
    useFavorites();
  const { addRecentlyViewed, getRecentIds, clearRecentlyViewed } =
    useRecentlyViewed();
  const { theme } = useTheme();
  const analytics = useAnalytics();

  const properties: CSSProperty[] = cssPropertiesData;
  const categories = getUniqueCategories(properties);

  const handleToggleFavorite = (propertyId: string) => {
    const property = properties.find((p) => p.id === propertyId);
    if (isFavorite(propertyId)) {
      removeFavorite(propertyId);
      if (property) {
        analytics.trackFavoriteRemove(propertyId, property.name);
      }
    } else {
      addFavorite(propertyId);
      if (property) {
        analytics.trackFavoriteAdd(propertyId, property.name);
      }
    }
  };

  const handleViewDetail = (propertyId: string) => {
    // スクロール位置とIDを保存
    const info = { id: propertyId, scrollY: window.scrollY };
    try {
      localStorage.setItem(lastScrollInfoKey, JSON.stringify(info));
    } catch {}
    setSelectedProperty(propertyId);
    addRecentlyViewed(propertyId);

    // Analytics: プロパティ詳細表示
    const property = properties.find((p) => p.id === propertyId);
    if (property) {
      analytics.trackPropertyView(propertyId, property.name);
    }

    window.scrollTo(0, 0);
  };

  const handleNavigateToProperty = (propertyId: string) => {
    const property = properties.find((p) => p.id === propertyId);
    if (property) {
      setSelectedProperty(propertyId);
      addRecentlyViewed(propertyId);
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    // Analytics: カテゴリ選択
    analytics.trackCategorySelect(category);
  };

  const handleBackToCategories = () => {
    setSelectedCategory("");
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSelectedProperty(null);
    // カテゴリータブに切り替える時は、選択されたカテゴリをリセット
    if (tab === "categories") {
      setSelectedCategory("");
    }
    // 逆引きタブに切り替える時は、選択されたユースケースをリセット
    if (tab === "reverse") {
      setSelectedUsecase(null);
    }

    // SEO用ページタイトル更新とAnalytics
    switch (tab) {
      case "home":
        updatePageTitle("");
        updateMetaDescription(
          "すべてのCSSプロパティを日本語で解説。実用的なサンプルコード、逆引き検索、最新テクニック集を収録。初心者から上級者まで使えるCSS学習の決定版ツール。"
        );
        analytics.trackPageView("ホーム");
        break;
      case "categories":
        updatePageTitle("カテゴリ別プロパティ一覧");
        updateMetaDescription(
          "CSSプロパティをカテゴリ別に整理。レイアウト、テキスト、背景、アニメーションなど目的別にプロパティを効率的に検索できます。"
        );
        analytics.trackPageView("カテゴリ一覧");
        break;
      case "reverse":
        updatePageTitle("逆引き検索");
        updateMetaDescription(
          "「中央寄せしたい」「角丸にしたい」など、やりたいことから必要なCSSプロパティを逆引き検索。初心者にも分かりやすい目的別検索機能。"
        );
        analytics.trackPageView("逆引き検索");
        break;
      case "techniques":
        updatePageTitle("最新CSSテクニック集");
        updateMetaDescription(
          "実用的なCSSテクニックをコピペ可能なサンプルコード付きで紹介。レスポンシブデザイン、レイアウト、アニメーションなど現場で使えるテクニック満載。"
        );
        analytics.trackPageView("テクニック集");
        break;
      case "favorites":
        updatePageTitle("お気に入りプロパティ");
        updateMetaDescription(
          "よく使うCSSプロパティをお気に入りに登録して素早くアクセス。個人の学習進度に合わせてカスタマイズできます。"
        );
        analytics.trackPageView("お気に入り");
        break;
      case "settings":
        updatePageTitle("設定");
        updateMetaDescription(
          "CSS辞書アプリの表示設定。ダークモード切り替え、表示オプションなどの設定を変更できます。"
        );
        analytics.trackPageView("設定");
        break;
    }
  };

  const filteredProperties = searchQuery
    ? searchProperties(properties, searchQuery)
    : selectedCategory
    ? filterByCategory(properties, selectedCategory)
    : properties;

  // 検索クエリ変更時のAnalytics
  useEffect(() => {
    if (searchQuery.trim()) {
      const timeoutId = setTimeout(() => {
        analytics.trackSearch(searchQuery, filteredProperties.length);
      }, 1000); // 1秒のデバウンス
      return () => clearTimeout(timeoutId);
    }
  }, [searchQuery, filteredProperties.length, analytics]);

  const favoriteProperties = properties.filter((p) =>
    getFavoriteIds().includes(p.id)
  );
  const recentProperties = properties.filter((p) =>
    getRecentIds(5).includes(p.id)
  );

  const categoryStats = categories
    .map((category) => ({
      name: category,
      count: properties.filter((p) => p.category === category).length,
    }))
    .sort((a, b) => {
      // 「その他」カテゴリーを最後に配置
      if (a.name === "その他") return 1;
      if (b.name === "その他") return -1;
      // それ以外はプロパティ数が多い順にソート
      return b.count - a.count;
    });

  // SEO用タイトル更新（プロパティ詳細表示時）
  useEffect(() => {
    if (selectedProperty) {
      const property = properties.find((p) => p.id === selectedProperty);
      if (property) {
        updatePageTitle(`${property.name} - ${property.description}`);
        updateMetaDescription(
          `CSS ${property.name}プロパティの使い方。${property.description}。実用的なサンプルコードと詳細解説付き。`
        );
      }
    }
  }, [selectedProperty, properties]);

  // Property detail view
  if (selectedProperty) {
    const property = properties.find((p) => p.id === selectedProperty);
    if (property) {
      const handleBackWithScroll = () => {
        setSelectedProperty(null);
        // タイトルをリセット
        updatePageTitle("");
        updateMetaDescription(
          "すべてのCSSプロパティを日本語で解説。実用的なサンプルコード、逆引き検索、最新テクニック集を収録。初心者から上級者まで使えるCSS学習の決定版ツール。"
        );
        setTimeout(() => {
          try {
            const info = JSON.parse(
              localStorage.getItem(lastScrollInfoKey) || "null"
            );
            if (info && info.id) {
              const el = document.getElementById(info.id);
              if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "center" });
              } else if (info.scrollY) {
                window.scrollTo({ top: info.scrollY, behavior: "smooth" });
              }
            }
          } catch {}
        }, 50);
      };
      return (
        <>
          <PropertyDetail
            property={property}
            isFavorite={isFavorite(property.id)}
            onToggleFavorite={handleToggleFavorite}
            onBack={handleBackWithScroll}
            onNavigateToProperty={handleNavigateToProperty}
          />
          <Navigation activeTab={activeTab} onTabChange={handleTabChange} />
        </>
      );
    }
  }

  // 逆引きタブの表示ロジック（仮実装）
  if (activeTab === "reverse") {
    // 逆引き: ユースケース選択 or プロパティ一覧
    const handleUsecaseSelect = (usecase: Usecase) => {
      setSelectedUsecase(usecase);
      analytics.trackUsecaseSelect(usecase.id, usecase.label);
    };
    const handleBackToUsecases = () => setSelectedUsecase(null);

    const usecasesPerPage = 10;
    const pagedUsecases = usecases.slice(
      usecasePage * usecasesPerPage,
      (usecasePage + 1) * usecasesPerPage
    );
    const totalPages = Math.ceil(usecases.length / usecasesPerPage);

    let content;
    if (!selectedUsecase) {
      // ユースケース一覧（ページネーション対応）
      content = (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {pagedUsecases.map((uc) => (
              <button
                key={uc.id}
                onClick={() => handleUsecaseSelect(uc)}
                className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-left"
              >
                <div className="text-lg font-bold text-blue-700 dark:text-blue-300 mb-1">
                  {uc.label}
                </div>
                <div className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                  {uc.description}
                </div>
                <div className="text-xs text-gray-400">
                  {uc.propertyIds.length}件の関連プロパティ
                </div>
              </button>
            ))}
          </div>
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setUsecasePage((p) => Math.max(0, p - 1))}
              disabled={usecasePage === 0}
              className={`px-4 py-2 rounded border text-sm font-medium transition-colors ${
                usecasePage === 0
                  ? "bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
              }`}
            >
              前へ
            </button>
            <span className="self-center text-sm text-gray-600 dark:text-gray-300">
              {usecasePage + 1} / {totalPages}
            </span>
            <button
              onClick={() =>
                setUsecasePage((p) => Math.min(totalPages - 1, p + 1))
              }
              disabled={usecasePage === totalPages - 1}
              className={`px-4 py-2 rounded border text-sm font-medium transition-colors ${
                usecasePage === totalPages - 1
                  ? "bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
              }`}
            >
              次へ
            </button>
          </div>
        </>
      );
    } else {
      // プロパティカード一覧
      const relatedProperties = properties.filter((p) =>
        selectedUsecase.propertyIds.includes(p.id)
      );
      content = (
        <>
          <button
            onClick={handleBackToUsecases}
            className="mb-6 flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
          >
            <span className="text-lg">←</span> ユースケース一覧に戻る
          </button>
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            {selectedUsecase.label} に関連するプロパティ
          </h2>
          {relatedProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  isFavorite={isFavorite(property.id)}
                  onToggleFavorite={handleToggleFavorite}
                  onViewDetail={handleViewDetail}
                />
              ))}
            </div>
          ) : (
            <div className="text-gray-500">該当するプロパティがありません</div>
          )}
        </>
      );
    }
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            逆引き（ユースケースから探す）
          </h1>
          {content}
        </div>
        <div style={{ height: "64px" }} aria-hidden="true" />
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    );
  }

  if (activeTab === "techniques") {
    const handleTechniqueSelect = (techniqueId: string) => {
      setSelectedTechniqueId(techniqueId);
      // Analytics: テクニック表示
      const technique = techniques.find((t) => t.id === techniqueId);
      if (technique) {
        analytics.trackTechniqueView(techniqueId, technique.title);
      }
    };

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Techniques
          selectedId={selectedTechniqueId}
          onSelect={handleTechniqueSelect}
          onBack={() => setSelectedTechniqueId(null)}
        />
        <div style={{ height: "64px" }} aria-hidden="true" />
        <Navigation
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            setSelectedTechniqueId(null);
          }}
        />
      </div>
    );
  }

  return (
    <Layout>
      <div className="py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            CSS Dictionary
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            CSSプロパティを効率的に学習しよう！
          </p>
        </div>

        {/* Content based on active tab */}
        {activeTab === "home" && (
          <div className="space-y-8">
            {/* Search */}
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="プロパティを検索..."
            />

            {/* Recent Properties */}
            {recentProperties.length > 0 && !searchQuery && (
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    最近見たプロパティ
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recentProperties.slice(0, 3).map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      isFavorite={isFavorite(property.id)}
                      onToggleFavorite={handleToggleFavorite}
                      onViewDetail={handleViewDetail}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Popular Properties or Search Results */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                {searchQuery ? (
                  <Layers className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                ) : (
                  <TrendingUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                )}
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {searchQuery
                    ? `検索結果 (${filteredProperties.length}件)`
                    : "人気のプロパティ"}
                </h2>
              </div>
              {filteredProperties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredProperties
                    .slice(0, searchQuery ? undefined : 6)
                    .map((property) => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                        isFavorite={isFavorite(property.id)}
                        onToggleFavorite={handleToggleFavorite}
                        onViewDetail={handleViewDetail}
                      />
                    ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 dark:text-gray-500 mb-2">
                    <Layers className="w-12 h-12 mx-auto mb-4" />
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    検索条件に一致するプロパティが見つかりませんでした
                  </p>
                </div>
              )}
            </section>
          </div>
        )}

        {activeTab === "categories" && (
          <div className="space-y-6">
            {selectedCategory ? (
              <CategoryDetail
                category={selectedCategory}
                properties={filterByCategory(properties, selectedCategory)}
                onBack={handleBackToCategories}
                onToggleFavorite={handleToggleFavorite}
                onViewDetail={handleViewDetail}
                isFavorite={isFavorite}
              />
            ) : (
              <>
                <div className="flex items-center gap-2 mb-6">
                  <Layers className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    カテゴリ一覧
                  </h2>
                </div>
                <CategoryGrid
                  categories={categoryStats}
                  onCategorySelect={handleCategorySelect}
                />
              </>
            )}
          </div>
        )}

        {activeTab === "favorites" && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                お気に入り
              </h2>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                ({favoriteProperties.length}件)
              </span>
            </div>

            {favoriteProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {favoriteProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    isFavorite={true}
                    onToggleFavorite={handleToggleFavorite}
                    onViewDetail={handleViewDetail}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Star className="w-12 h-12 mx-auto mb-4 text-gray-400 dark:text-gray-500" />
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  お気に入りプロパティがありません
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  気になるプロパティのハートマークをクリックしてお気に入りに追加しましょう
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === "settings" && (
          <Settings onClearHistory={clearRecentlyViewed} />
        )}
      </div>

      <Navigation activeTab={activeTab} onTabChange={handleTabChange} />
    </Layout>
  );
}

export default App;
