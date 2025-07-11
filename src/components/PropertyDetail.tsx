import React from "react";
import { Heart, Copy, ArrowLeft, ExternalLink, Eye } from "lucide-react";
import { CSSProperty } from "../types/css";

interface PropertyDetailProps {
  property: CSSProperty;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onBack: () => void;
  onNavigateToProperty: (id: string) => void;
}

export function PropertyDetail({
  property,
  isFavorite,
  onToggleFavorite,
  onBack,
  onNavigateToProperty,
}: PropertyDetailProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getVisualExample = (propertyId: string, exampleIndex: number) => {
    // プロパティごとの視覚的な例を生成
    const examples: { [key: string]: { [key: number]: JSX.Element } } = {
      display: {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="flex gap-2">
              <div className="bg-blue-500 text-white px-3 py-2 rounded text-sm">
                Item 1
              </div>
              <div className="bg-green-500 text-white px-3 py-2 rounded text-sm">
                Item 2
              </div>
              <div className="bg-purple-500 text-white px-3 py-2 rounded text-sm">
                Item 3
              </div>
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-blue-500 text-white px-3 py-2 rounded text-sm text-center">
                1
              </div>
              <div className="bg-green-500 text-white px-3 py-2 rounded text-sm text-center">
                2
              </div>
              <div className="bg-purple-500 text-white px-3 py-2 rounded text-sm text-center">
                3
              </div>
              <div className="bg-orange-500 text-white px-3 py-2 rounded text-sm text-center">
                4
              </div>
              <div className="bg-pink-500 text-white px-3 py-2 rounded text-sm text-center">
                5
              </div>
              <div className="bg-indigo-500 text-white px-3 py-2 rounded text-sm text-center">
                6
              </div>
            </div>
          </div>
        ),
        2: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="text-gray-500 text-sm">要素が非表示になります</div>
          </div>
        ),
        3: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div>
              <span
                style={{
                  display: "inline",
                  background: "#3b82f6",
                  color: "white",
                  padding: "4px 8px",
                  borderRadius: 4,
                }}
              >
                inline1
              </span>
              <span
                style={{
                  display: "inline",
                  background: "#10b981",
                  color: "white",
                  padding: "4px 8px",
                  borderRadius: 4,
                  marginLeft: 8,
                }}
              >
                inline2
              </span>
              <span
                style={{
                  display: "inline",
                  background: "#f59e42",
                  color: "white",
                  padding: "4px 8px",
                  borderRadius: 4,
                  marginLeft: 8,
                }}
              >
                inline3
              </span>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              display: inline（幅・高さ指定不可、横並び）
            </div>
          </div>
        ),
        4: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div>
              <span
                style={{
                  display: "inline-block",
                  background: "#3b82f6",
                  color: "white",
                  padding: "4px 8px",
                  borderRadius: 4,
                  width: 80,
                  height: 40,
                  lineHeight: "32px",
                  textAlign: "center",
                  marginRight: 8,
                }}
              >
                inline-block1
              </span>
              <span
                style={{
                  display: "inline-block",
                  background: "#10b981",
                  color: "white",
                  padding: "4px 8px",
                  borderRadius: 4,
                  width: 80,
                  height: 40,
                  lineHeight: "32px",
                  textAlign: "center",
                  marginRight: 8,
                }}
              >
                inline-block2
              </span>
              <span
                style={{
                  display: "inline-block",
                  background: "#f59e42",
                  color: "white",
                  padding: "4px 8px",
                  borderRadius: 4,
                  width: 80,
                  height: 40,
                  lineHeight: "32px",
                  textAlign: "center",
                }}
              >
                inline-block3
              </span>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              display: inline-block（幅・高さ指定可、横並び）
            </div>
          </div>
        ),
      },
      "container-queries": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="bg-white dark:bg-gray-800 p-4 rounded border-2 border-dashed border-blue-300">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Container (400px+)
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-blue-500 text-white p-2 rounded text-xs">
                  Content 1
                </div>
                <div className="bg-green-500 text-white p-2 rounded text-xs">
                  Content 2
                </div>
              </div>
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="bg-white dark:bg-gray-800 p-3 rounded border-2 border-dashed border-purple-300 w-48">
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                Sidebar (&lt;300px)
              </div>
              <div className="text-xs bg-purple-500 text-white p-1 rounded">
                Small text
              </div>
            </div>
          </div>
        ),
      },
      "container-type": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="bg-white dark:bg-gray-800 p-3 rounded border border-blue-300">
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                inline-size監視
              </div>
              <div className="bg-blue-500 text-white p-2 rounded text-xs">
                幅の変化を監視
              </div>
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="bg-white dark:bg-gray-800 p-3 rounded border border-green-300">
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                size監視
              </div>
              <div className="bg-green-500 text-white p-2 rounded text-xs">
                幅と高さを監視
              </div>
            </div>
          </div>
        ),
      },
      subgrid: {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="grid grid-cols-3 gap-2 border border-dashed border-gray-400 p-2">
              <div className="text-xs text-gray-500">親グリッド</div>
              <div className="text-xs text-gray-500">列1</div>
              <div className="text-xs text-gray-500">列2</div>
              <div className="bg-blue-500 text-white p-2 rounded text-xs col-span-3">
                <div className="grid grid-cols-subgrid gap-2">
                  <div className="bg-blue-600 p-1 rounded">子1</div>
                  <div className="bg-blue-600 p-1 rounded">子2</div>
                  <div className="bg-blue-600 p-1 rounded">子3</div>
                </div>
              </div>
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="grid grid-rows-3 gap-2 h-32 border border-dashed border-gray-400 p-2">
              <div className="bg-green-500 text-white p-2 rounded text-xs grid grid-rows-subgrid">
                <div className="bg-green-600 p-1 rounded text-center">
                  Header
                </div>
                <div className="bg-green-600 p-1 rounded text-center">
                  Content
                </div>
                <div className="bg-green-600 p-1 rounded text-center">
                  Footer
                </div>
              </div>
            </div>
          </div>
        ),
      },
      "aspect-ratio": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                aspect-ratio: 16 / 9 - 動画の標準比率
              </div>
              <div className="bg-white dark:bg-gray-800 border rounded p-3 flex justify-center">
                <div
                  className="bg-blue-500 text-white rounded flex items-center justify-center text-sm border-2 border-blue-700"
                  style={{ aspectRatio: "16/9", width: "240px" }}
                >
                  16:9 動画コンテナ
                </div>
              </div>
              <div className="text-xs text-gray-500 p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                💡
                YouTube、Netflix等の標準動画比率。レイアウトシフト防止に効果的
              </div>
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                aspect-ratio: 1 - 正方形（1:1）
              </div>
              <div className="bg-white dark:bg-gray-800 border rounded p-3 flex justify-center">
                <div
                  className="bg-green-500 text-white rounded flex items-center justify-center text-sm border-2 border-green-700"
                  style={{ aspectRatio: "1", width: "120px" }}
                >
                  アバター画像
                </div>
              </div>
              <div className="text-xs text-gray-500 p-2 bg-green-50 dark:bg-green-900/20 rounded">
                💡 プロフィール画像、アイコン、正方形カードに最適
              </div>
            </div>
          </div>
        ),
        2: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                aspect-ratio: 4 / 3 - 従来のテレビ比率
              </div>
              <div className="bg-white dark:bg-gray-800 border rounded p-3">
                <div
                  className="bg-purple-500 text-white rounded flex items-center justify-center text-sm border-2 border-purple-700 w-full"
                  style={{
                    aspectRatio: "4/3",
                    maxWidth: "200px",
                    margin: "0 auto",
                  }}
                >
                  4:3 画像コンテナ
                </div>
              </div>
              <div className="text-xs text-gray-500 p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
                💡 従来TV、デジカメ画像。Instagram投稿画像でも使用
              </div>
            </div>
          </div>
        ),
        3: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                レスポンシブ動画 - width: 100% + aspect-ratio: 16/9
              </div>
              <div className="bg-white dark:bg-gray-800 border rounded p-3">
                <div
                  className="bg-orange-500 text-white rounded flex items-center justify-center text-sm border-2 border-orange-700 w-full"
                  style={{ aspectRatio: "16/9" }}
                >
                  <div className="text-center">
                    <div className="text-sm font-bold">レスポンシブ動画</div>
                    <div className="text-xs opacity-75">画面幅に応じて拡縮</div>
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-500 p-2 bg-orange-50 dark:bg-orange-900/20 rounded">
                💡 iframe動画の埋め込みでよく使用。高さが自動計算される
              </div>
            </div>
          </div>
        ),
      },
      gap: {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="flex gap-4">
              <div className="bg-blue-500 text-white px-3 py-2 rounded text-sm">
                Item 1
              </div>
              <div className="bg-green-500 text-white px-3 py-2 rounded text-sm">
                Item 2
              </div>
              <div className="bg-purple-500 text-white px-3 py-2 rounded text-sm">
                Item 3
              </div>
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="grid grid-cols-2 gap-8 gap-x-4">
              <div className="bg-blue-500 text-white px-3 py-2 rounded text-sm text-center">
                1
              </div>
              <div className="bg-green-500 text-white px-3 py-2 rounded text-sm text-center">
                2
              </div>
              <div className="bg-purple-500 text-white px-3 py-2 rounded text-sm text-center">
                3
              </div>
              <div className="bg-orange-500 text-white px-3 py-2 rounded text-sm text-center">
                4
              </div>
            </div>
          </div>
        ),
        2: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="flex gap-4">
              <div className="bg-red-500 text-white px-2 py-1 rounded text-xs">
                clamp(1rem, 3vw, 2rem)
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-xs">
                レスポンシブ間隔
              </div>
            </div>
          </div>
        ),
      },
      clamp: {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                font-size: clamp(1rem, 4vw, 3rem) - レスポンシブフォント
              </div>
              <div className="bg-white dark:bg-gray-800 border rounded p-3">
                <div
                  style={{ fontSize: "clamp(1rem, 4vw, 3rem)" }}
                  className="text-blue-600 dark:text-blue-400 font-bold text-center"
                >
                  レスポンシブなタイトル
                </div>
              </div>
              <div className="text-xs text-gray-500 p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                💡 最小1rem、最大3rem。画面幅に応じて4vwで自動調整
              </div>
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                width: clamp(300px, 50%, 800px) - レスポンシブ幅
              </div>
              <div className="bg-white dark:bg-gray-800 border rounded p-3 flex justify-center">
                <div
                  style={{ width: "clamp(200px, 50%, 400px)" }}
                  className="bg-green-500 text-white p-3 rounded text-center"
                >
                  幅が自動調整されるコンテナ
                </div>
              </div>
              <div className="text-xs text-gray-500 p-2 bg-green-50 dark:bg-green-900/20 rounded">
                💡 最小200px、最大400px。親要素の50%で調整
              </div>
            </div>
          </div>
        ),
        2: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                padding: clamp(1rem, 5vw, 4rem) - レスポンシブ余白
              </div>
              <div className="bg-white dark:bg-gray-800 border rounded">
                <div
                  style={{ padding: "clamp(1rem, 5vw, 4rem)" }}
                  className="bg-purple-500 text-white rounded text-center"
                >
                  余白が画面サイズに応じて調整
                </div>
              </div>
              <div className="text-xs text-gray-500 p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
                💡 メディアクエリ不要でレスポンシブな余白を実現
              </div>
            </div>
          </div>
        ),
      },
      "min-max-functions": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div
              className="bg-blue-500 text-white p-3 rounded"
              style={{ width: "min(100%, 600px)" }}
            >
              min(100%, 600px) - 小さい方を選択
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div
              className="bg-green-500 text-white p-3 rounded"
              style={{ fontSize: "max(1rem, 3vw)" }}
            >
              max(1rem, 3vw) - 大きい方を選択
            </div>
          </div>
        ),
        2: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div
              className="bg-purple-500 text-white p-3 rounded mx-auto"
              style={{ margin: "min(5vw, 2rem) auto" }}
            >
              レスポンシブマージン
            </div>
          </div>
        ),
      },
      "css-custom-properties": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div
              style={
                {
                  "--primary-color": "#3b82f6",
                  "--spacing": "1rem",
                } as React.CSSProperties
              }
            >
              <div className="bg-blue-500 text-white p-4 rounded mb-2">
                var(--primary-color)
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                CSS変数でテーマ管理
              </div>
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div style={{ "--card-padding": "2rem" } as React.CSSProperties}>
              <div
                className="bg-white dark:bg-gray-800 border rounded"
                style={{ padding: "var(--card-padding)" }}
              >
                <div className="text-sm">通常カード</div>
              </div>
              <div
                className="bg-white dark:bg-gray-800 border rounded mt-2"
                style={
                  {
                    "--card-padding": "1rem",
                    padding: "var(--card-padding)",
                  } as React.CSSProperties
                }
              >
                <div className="text-sm">コンパクトカード</div>
              </div>
            </div>
          </div>
        ),
        2: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div style={{ color: "var(--text-color, #333)" }}>
              フォールバック値付き変数
            </div>
          </div>
        ),
      },
      "scroll-behavior": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="bg-white dark:bg-gray-800 p-3 rounded border">
              <div className="text-sm mb-2">スムーズスクロール有効</div>
              <div className="flex gap-2">
                <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs">
                  セクション1
                </div>
                <div className="bg-green-500 text-white px-2 py-1 rounded text-xs">
                  セクション2
                </div>
                <div className="bg-purple-500 text-white px-2 py-1 rounded text-xs">
                  セクション3
                </div>
              </div>
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div
              className="bg-white dark:bg-gray-800 p-3 rounded border h-20 overflow-y-auto"
              style={{ scrollBehavior: "smooth" }}
            >
              <div className="text-sm mb-2">コンテナスクロール</div>
              <div className="space-y-2">
                <div className="bg-blue-500 text-white p-2 rounded text-xs">
                  コンテンツ1
                </div>
                <div className="bg-green-500 text-white p-2 rounded text-xs">
                  コンテンツ2
                </div>
                <div className="bg-purple-500 text-white p-2 rounded text-xs">
                  コンテンツ3
                </div>
              </div>
            </div>
          </div>
        ),
      },
      "scroll-snap": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div
              className="flex gap-2 overflow-x-auto"
              style={{ scrollSnapType: "x mandatory" }}
            >
              <div
                className="bg-blue-500 text-white px-6 py-4 rounded flex-none text-sm"
                style={{ scrollSnapAlign: "start" }}
              >
                Slide 1
              </div>
              <div
                className="bg-green-500 text-white px-6 py-4 rounded flex-none text-sm"
                style={{ scrollSnapAlign: "start" }}
              >
                Slide 2
              </div>
              <div
                className="bg-purple-500 text-white px-6 py-4 rounded flex-none text-sm"
                style={{ scrollSnapAlign: "start" }}
              >
                Slide 3
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              → 横スクロールでスナップ
            </div>
          </div>
        ),
      },
      "backdrop-filter": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border relative">
            <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-6 rounded">
              <div className="absolute inset-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded p-3 flex items-center justify-center">
                <span className="text-white font-medium">ガラス効果</span>
              </div>
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border relative">
            <div className="bg-gradient-to-br from-green-400 to-blue-500 p-6 rounded">
              <div className="absolute inset-4 bg-black/30 backdrop-blur-md rounded p-3 flex items-center justify-center">
                <span className="text-white font-medium">モーダル背景</span>
              </div>
            </div>
          </div>
        ),
        2: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border relative">
            <div className="bg-gradient-to-r from-pink-400 to-red-500 p-6 rounded">
              <div
                className="absolute inset-4 bg-white/10 rounded p-3 flex items-center justify-center"
                style={{ backdropFilter: "saturate(180%) blur(20px)" }}
              >
                <span className="text-white font-medium">彩度+ぼかし</span>
              </div>
            </div>
          </div>
        ),
      },
      filter: {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div
              className="bg-blue-500 text-white p-3 rounded"
              style={{ filter: "blur(5px)" }}
            >
              5pxぼかし効果
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div
              className="bg-green-500 text-white p-3 rounded"
              style={{ filter: "brightness(1.2) contrast(1.1)" }}
            >
              明度・コントラスト調整
            </div>
          </div>
        ),
        2: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="bg-purple-500 text-white p-3 rounded transition-all duration-300 hover:filter hover:grayscale hover:sepia hover:hue-rotate-180">
              ホバーでフィルター変化
            </div>
          </div>
        ),
      },
      "object-fit": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                object-fit: cover -
                アスペクト比を保ちながらコンテナを完全に埋める
              </div>
              <div className="flex gap-4 items-center">
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-2">
                    元画像 (横長)
                  </div>
                  <div
                    className="w-20 h-12 border border-gray-300 rounded"
                    style={{
                      background:
                        "linear-gradient(45deg, #3B82F6 25%, #60A5FA 25%, #60A5FA 50%, #3B82F6 50%, #3B82F6 75%, #60A5FA 75%)",
                      backgroundSize: "8px 8px",
                    }}
                  ></div>
                  <div className="text-xs text-gray-500 mt-1">400×200px</div>
                </div>
                <div className="text-gray-500">→</div>
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-2">
                    正方形コンテナ
                  </div>
                  <div className="relative w-16 h-16 border-2 border-blue-400 rounded overflow-hidden">
                    <div
                      className="w-full h-full"
                      style={{
                        background:
                          "linear-gradient(45deg, #3B82F6 25%, #60A5FA 25%, #60A5FA 50%, #3B82F6 50%, #3B82F6 75%, #60A5FA 75%)",
                        backgroundSize: "8px 8px",
                        transform: "scale(1.33)",
                        transformOrigin: "center",
                      }}
                    ></div>
                    <div className="absolute bottom-1 right-1 bg-blue-500 text-white text-xs px-1 rounded">
                      cover
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">100×100px</div>
                </div>
              </div>
              <div className="text-xs text-gray-500 p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                💡 上下がカットされて正方形に収まる。ヒーロー画像によく使用
              </div>
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                object-fit: contain - アスペクト比を保ちながら全体を表示
              </div>
              <div className="flex gap-4 items-center">
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-2">
                    元画像 (横長)
                  </div>
                  <div
                    className="w-20 h-12 border border-gray-300 rounded"
                    style={{
                      background:
                        "linear-gradient(45deg, #10B981 25%, #34D399 25%, #34D399 50%, #10B981 50%, #10B981 75%, #34D399 75%)",
                      backgroundSize: "8px 8px",
                    }}
                  ></div>
                  <div className="text-xs text-gray-500 mt-1">400×200px</div>
                </div>
                <div className="text-gray-500">→</div>
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-2">
                    正方形コンテナ
                  </div>
                  <div className="relative w-16 h-16 border-2 border-green-400 rounded bg-gray-100 dark:bg-gray-600 flex items-center justify-center">
                    <div
                      className="w-full h-8"
                      style={{
                        background:
                          "linear-gradient(45deg, #10B981 25%, #34D399 25%, #34D399 50%, #10B981 50%, #10B981 75%, #34D399 75%)",
                        backgroundSize: "8px 8px",
                      }}
                    ></div>
                    <div className="absolute bottom-1 right-1 bg-green-500 text-white text-xs px-1 rounded">
                      contain
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">100×100px</div>
                </div>
              </div>
              <div className="text-xs text-gray-500 p-2 bg-green-50 dark:bg-green-900/20 rounded">
                💡 上下に余白ができるが全体が表示される。ロゴや重要な画像に適用
              </div>
            </div>
          </div>
        ),
        2: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                object-fit: fill - アスペクト比を無視してコンテナに合わせる
              </div>
              <div className="flex gap-4 items-center">
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-2">
                    元画像 (横長)
                  </div>
                  <div
                    className="w-20 h-12 border border-gray-300 rounded"
                    style={{
                      background:
                        "linear-gradient(45deg, #F59E0B 25%, #FCD34D 25%, #FCD34D 50%, #F59E0B 50%, #F59E0B 75%, #FCD34D 75%)",
                      backgroundSize: "8px 8px",
                    }}
                  ></div>
                  <div className="text-xs text-gray-500 mt-1">400×200px</div>
                </div>
                <div className="text-gray-500">→</div>
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-2">
                    正方形コンテナ
                  </div>
                  <div className="relative w-16 h-16 border-2 border-yellow-400 rounded overflow-hidden">
                    <div
                      className="w-full h-full"
                      style={{
                        background:
                          "linear-gradient(45deg, #F59E0B 25%, #FCD34D 25%, #FCD34D 50%, #F59E0B 50%, #F59E0B 75%, #FCD34D 75%)",
                        backgroundSize: "6px 12px",
                      }}
                    ></div>
                    <div className="absolute bottom-1 right-1 bg-yellow-600 text-white text-xs px-1 rounded">
                      fill
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">100×100px</div>
                </div>
              </div>
              <div className="text-xs text-gray-500 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                ⚠️ 縦に圧縮されて歪む。通常は使用しない
              </div>
            </div>
          </div>
        ),
        3: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                object-fit: none - 元のサイズのまま（中央に配置）
              </div>
              <div className="flex gap-4 items-center">
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-2">
                    元画像 (横長)
                  </div>
                  <div
                    className="w-20 h-12 border border-gray-300 rounded"
                    style={{
                      background:
                        "linear-gradient(45deg, #8B5CF6 25%, #A78BFA 25%, #A78BFA 50%, #8B5CF6 50%, #8B5CF6 75%, #A78BFA 75%)",
                      backgroundSize: "8px 8px",
                    }}
                  ></div>
                  <div className="text-xs text-gray-500 mt-1">400×200px</div>
                </div>
                <div className="text-gray-500">→</div>
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-2">
                    正方形コンテナ
                  </div>
                  <div className="relative w-16 h-16 border-2 border-purple-400 rounded overflow-hidden">
                    <div
                      className="absolute"
                      style={{
                        width: "80px",
                        height: "40px",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        background:
                          "linear-gradient(45deg, #8B5CF6 25%, #A78BFA 25%, #A78BFA 50%, #8B5CF6 50%, #8B5CF6 75%, #A78BFA 75%)",
                        backgroundSize: "8px 8px",
                      }}
                    ></div>
                    <div className="absolute bottom-1 right-1 bg-purple-500 text-white text-xs px-1 rounded">
                      none
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">100×100px</div>
                </div>
              </div>
              <div className="text-xs text-gray-500 p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
                💡 元サイズのまま中央配置。はみ出し部分がカットされる
              </div>
            </div>
          </div>
        ),
        4: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                object-fit: scale-down - containとnoneの小さい方を選択
              </div>
              <div className="flex gap-4 items-center">
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-2">
                    元画像 (小さい)
                  </div>
                  <div
                    className="w-12 h-8 border border-gray-300 rounded mx-auto"
                    style={{
                      background:
                        "linear-gradient(45deg, #EF4444 25%, #F87171 25%, #F87171 50%, #EF4444 50%, #EF4444 75%, #F87171 75%)",
                      backgroundSize: "4px 4px",
                    }}
                  ></div>
                  <div className="text-xs text-gray-500 mt-1">60×40px</div>
                </div>
                <div className="text-gray-500">→</div>
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-2">
                    大きいコンテナ
                  </div>
                  <div className="relative w-16 h-16 border-2 border-red-400 rounded bg-gray-100 dark:bg-gray-600 flex items-center justify-center">
                    <div
                      className="w-12 h-8"
                      style={{
                        background:
                          "linear-gradient(45deg, #EF4444 25%, #F87171 25%, #F87171 50%, #EF4444 50%, #EF4444 75%, #F87171 75%)",
                        backgroundSize: "4px 4px",
                      }}
                    ></div>
                    <div className="absolute bottom-1 right-1 bg-red-500 text-white text-xs px-1 rounded">
                      scale-down
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">100×100px</div>
                </div>
              </div>
              <div className="text-xs text-gray-500 p-2 bg-red-50 dark:bg-red-900/20 rounded">
                💡 画像が小さい場合は元サイズ、大きい場合はcontainと同じ動作
              </div>
            </div>
          </div>
        ),
      },
      "place-content": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div
              className="flex flex-wrap gap-2 h-24 border border-dashed border-gray-400"
              style={{ placeContent: "center" }}
            >
              <div className="bg-blue-500 text-white p-2 rounded text-xs">
                Item 1
              </div>
              <div className="bg-green-500 text-white p-2 rounded text-xs">
                Item 2
              </div>
              <div className="bg-purple-500 text-white p-2 rounded text-xs">
                Item 3
              </div>
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div
              className="flex flex-wrap gap-2 h-24 border border-dashed border-gray-400"
              style={{ placeContent: "space-between center" }}
            >
              <div className="bg-blue-500 text-white p-2 rounded text-xs">
                A
              </div>
              <div className="bg-green-500 text-white p-2 rounded text-xs">
                B
              </div>
              <div className="bg-purple-500 text-white p-2 rounded text-xs">
                C
              </div>
            </div>
          </div>
        ),
      },
      "display-flex": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                水平・垂直中央配置 - justify-content: center + align-items:
                center
              </div>
              <div className="h-24 bg-white dark:bg-gray-800 border-2 border-dashed border-blue-300 rounded flex justify-center items-center">
                <div className="bg-blue-500 text-white px-4 py-2 rounded">
                  中央配置されたボタン
                </div>
              </div>
              <div className="text-xs text-gray-500 p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                💡 モーダル、ボタン、カードの中央配置に最適
              </div>
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                ナビゲーションバー - justify-content: space-between +
                align-items: center
              </div>
              <div className="bg-white dark:bg-gray-800 border rounded p-3 flex justify-between items-center">
                <div className="text-green-600 font-bold">Logo</div>
                <div className="flex gap-3">
                  <div className="text-gray-600 dark:text-gray-300 text-sm">
                    Home
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm">
                    About
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm">
                    Contact
                  </div>
                </div>
                <div className="bg-green-500 text-white px-3 py-1 rounded text-sm">
                  Login
                </div>
              </div>
              <div className="text-xs text-gray-500 p-2 bg-green-50 dark:bg-green-900/20 rounded">
                💡 左端にロゴ、右端にボタン、間にナビゲーション
              </div>
            </div>
          </div>
        ),
        2: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                レスポンシブカードレイアウト - flex-wrap: wrap + gap: 1rem
              </div>
              <div
                className="bg-white dark:bg-gray-800 border rounded p-3 flex flex-wrap gap-3"
                style={{ maxWidth: "300px" }}
              >
                <div
                  className="bg-purple-500 text-white px-3 py-2 rounded text-sm flex-1"
                  style={{ minWidth: "120px" }}
                >
                  Card 1
                </div>
                <div
                  className="bg-purple-500 text-white px-3 py-2 rounded text-sm flex-1"
                  style={{ minWidth: "120px" }}
                >
                  Card 2
                </div>
                <div
                  className="bg-purple-500 text-white px-3 py-2 rounded text-sm flex-1"
                  style={{ minWidth: "120px" }}
                >
                  Card 3
                </div>
              </div>
              <div className="text-xs text-gray-500 p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
                💡 幅が足りない場合は自動で折り返し。レスポンシブ対応
              </div>
            </div>
          </div>
        ),
        3: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                サイドバーレイアウト - flex: 0 0 固定幅 + flex: 1
              </div>
              <div
                className="bg-white dark:bg-gray-800 border rounded overflow-hidden flex"
                style={{ height: "120px" }}
              >
                <div
                  className="bg-orange-500 text-white p-3 flex items-center justify-center"
                  style={{ flex: "0 0 80px" }}
                >
                  <div className="text-xs text-center">
                    Sidebar
                    <br />
                    (80px固定)
                  </div>
                </div>
                <div className="bg-orange-100 dark:bg-orange-900/20 p-3 flex items-center justify-center flex-1">
                  <div className="text-orange-800 dark:text-orange-300 text-sm">
                    メインコンテンツ (flex: 1で残り全幅)
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-500 p-2 bg-orange-50 dark:bg-orange-900/20 rounded">
                💡 サイドバーは固定幅、メインは可変幅で画面サイズに対応
              </div>
            </div>
          </div>
        ),
      },
      "display-grid": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                3列等幅グリッド - grid-template-columns: 1fr 1fr 1fr
              </div>
              <div className="bg-white dark:bg-gray-800 border rounded p-3 grid grid-cols-3 gap-3">
                <div className="bg-blue-500 text-white p-3 rounded text-center text-sm">
                  Item 1
                </div>
                <div className="bg-green-500 text-white p-3 rounded text-center text-sm">
                  Item 2
                </div>
                <div className="bg-purple-500 text-white p-3 rounded text-center text-sm">
                  Item 3
                </div>
                <div className="bg-orange-500 text-white p-3 rounded text-center text-sm">
                  Item 4
                </div>
                <div className="bg-pink-500 text-white p-3 rounded text-center text-sm">
                  Item 5
                </div>
                <div className="bg-indigo-500 text-white p-3 rounded text-center text-sm">
                  Item 6
                </div>
              </div>
              <div className="text-xs text-gray-500 p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                💡 1fr = 利用可能な空間を等分。自動で行が作成される
              </div>
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                サイドバーレイアウト - grid-template-columns: 250px 1fr
              </div>
              <div
                className="bg-white dark:bg-gray-800 border rounded overflow-hidden"
                style={{ height: "140px" }}
              >
                <div
                  className="grid h-full"
                  style={{
                    gridTemplateColumns: "80px 1fr",
                    gridTemplateRows: "auto 1fr auto",
                  }}
                >
                  <div className="bg-gray-600 text-white p-2 text-xs text-center col-span-2">
                    Header
                  </div>
                  <div className="bg-green-500 text-white p-2 text-xs flex items-center justify-center">
                    Sidebar
                  </div>
                  <div className="bg-green-100 dark:bg-green-900/20 p-2 text-xs flex items-center justify-center">
                    <div className="text-green-800 dark:text-green-300">
                      Main Content
                    </div>
                  </div>
                  <div className="bg-gray-600 text-white p-2 text-xs text-center col-span-2">
                    Footer
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-500 p-2 bg-green-50 dark:bg-green-900/20 rounded">
                💡 固定幅サイドバー +
                可変幅メインエリア。ヘッダー・フッターは全幅
              </div>
            </div>
          </div>
        ),
        2: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                レスポンシブグリッド - repeat(auto-fit, minmax(120px, 1fr))
              </div>
              <div
                className="bg-white dark:bg-gray-800 border rounded p-3"
                style={{ maxWidth: "320px" }}
              >
                <div
                  className="grid gap-2"
                  style={{
                    gridTemplateColumns: "repeat(auto-fit, minmax(90px, 1fr))",
                  }}
                >
                  <div className="bg-purple-500 text-white p-2 rounded text-center text-xs">
                    Card 1
                  </div>
                  <div className="bg-purple-500 text-white p-2 rounded text-center text-xs">
                    Card 2
                  </div>
                  <div className="bg-purple-500 text-white p-2 rounded text-center text-xs">
                    Card 3
                  </div>
                  <div className="bg-purple-500 text-white p-2 rounded text-center text-xs">
                    Card 4
                  </div>
                  <div className="bg-purple-500 text-white p-2 rounded text-center text-xs">
                    Card 5
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-500 p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
                💡 画面幅に応じて自動的に列数を調整。最小90pxを保証
              </div>
            </div>
          </div>
        ),
        3: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                グリッドエリア - grid-template-areas で直感的レイアウト
              </div>
              <div
                className="bg-white dark:bg-gray-800 border rounded overflow-hidden"
                style={{ height: "140px" }}
              >
                <div
                  className="grid h-full gap-1 p-1"
                  style={{
                    gridTemplateAreas:
                      '"header header" "sidebar main" "footer footer"',
                    gridTemplateColumns: "70px 1fr",
                    gridTemplateRows: "auto 1fr auto",
                  }}
                >
                  <div
                    className="bg-orange-500 text-white p-2 text-xs text-center rounded"
                    style={{ gridArea: "header" }}
                  >
                    Header
                  </div>
                  <div
                    className="bg-orange-400 text-white p-2 text-xs flex items-center justify-center rounded"
                    style={{ gridArea: "sidebar" }}
                  >
                    Side
                  </div>
                  <div
                    className="bg-orange-100 dark:bg-orange-900/20 p-2 text-xs flex items-center justify-center rounded"
                    style={{ gridArea: "main" }}
                  >
                    <div className="text-orange-800 dark:text-orange-300">
                      Main
                    </div>
                  </div>
                  <div
                    className="bg-orange-500 text-white p-2 text-xs text-center rounded"
                    style={{ gridArea: "footer" }}
                  >
                    Footer
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-500 p-2 bg-orange-50 dark:bg-orange-900/20 rounded">
                💡 エリア名でレイアウトを定義。視覚的で分かりやすい
              </div>
            </div>
          </div>
        ),
      },
      "place-items": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                place-items: center - 水平・垂直中央配置
              </div>
              <div className="bg-white dark:bg-gray-800 border rounded p-3">
                <div
                  className="grid grid-cols-3 gap-3 h-32"
                  style={{ placeItems: "center" }}
                >
                  <div className="bg-blue-500 text-white p-2 rounded text-xs">
                    Item 1
                  </div>
                  <div className="bg-green-500 text-white p-2 rounded text-xs">
                    Item 2
                  </div>
                  <div className="bg-purple-500 text-white p-2 rounded text-xs">
                    Item 3
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-500 p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                💡 各グリッドセル内でアイテムが中央配置される
              </div>
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                place-items: start end - 垂直方向は上、水平方向は右
              </div>
              <div className="bg-white dark:bg-gray-800 border rounded p-3">
                <div
                  className="grid grid-cols-2 gap-3 h-32"
                  style={{ placeItems: "start end" }}
                >
                  <div className="bg-orange-500 text-white p-2 rounded text-xs">
                    Item 1
                  </div>
                  <div className="bg-pink-500 text-white p-2 rounded text-xs">
                    Item 2
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-500 p-2 bg-orange-50 dark:bg-orange-900/20 rounded">
                💡 align-items: start + justify-items: end の組み合わせ
              </div>
            </div>
          </div>
        ),
      },
      order: {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                HTMLの順序（1,2,3）→ 視覚的順序（1,3,2）
              </div>
              <div className="bg-white dark:bg-gray-800 border rounded p-3">
                <div className="text-xs text-gray-500 mb-2">
                  HTML順序：1番目、2番目、3番目
                </div>
                <div className="flex gap-2">
                  <div
                    className="bg-blue-500 text-white px-3 py-2 rounded text-sm"
                    style={{ order: 1 }}
                  >
                    1番目 (order: 1)
                  </div>
                  <div
                    className="bg-green-500 text-white px-3 py-2 rounded text-sm"
                    style={{ order: 3 }}
                  >
                    2番目 (order: 3)
                  </div>
                  <div
                    className="bg-purple-500 text-white px-3 py-2 rounded text-sm"
                    style={{ order: 2 }}
                  >
                    3番目 (order: 2)
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  表示順序：1番目、3番目、2番目
                </div>
              </div>
              <div className="text-xs text-gray-500 p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                💡 HTMLは論理的順序、CSSで視覚的順序を調整
              </div>
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                レスポンシブ順序変更 - PC vs モバイル
              </div>
              <div className="bg-white dark:bg-gray-800 border rounded p-3">
                <div className="text-xs text-gray-500 mb-2">
                  PC表示（画面幅大）
                </div>
                <div className="flex gap-2 mb-4">
                  <div
                    className="bg-orange-500 text-white px-3 py-2 rounded text-sm flex-1 text-center"
                    style={{ order: 1 }}
                  >
                    メインコンテンツ
                  </div>
                  <div
                    className="bg-orange-400 text-white px-3 py-2 rounded text-sm"
                    style={{ order: 2, minWidth: "120px" }}
                  >
                    サイドバー
                  </div>
                </div>
                <div className="text-xs text-gray-500 mb-2">
                  モバイル表示（画面幅小）
                </div>
                <div
                  className="flex flex-col gap-2"
                  style={{ maxWidth: "200px" }}
                >
                  <div
                    className="bg-orange-400 text-white px-3 py-2 rounded text-sm text-center"
                    style={{ order: 1 }}
                  >
                    サイドバー
                  </div>
                  <div
                    className="bg-orange-500 text-white px-3 py-2 rounded text-sm text-center"
                    style={{ order: 2 }}
                  >
                    メインコンテンツ
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-500 p-2 bg-orange-50 dark:bg-orange-900/20 rounded">
                💡 メディアクエリと組み合わせて画面サイズごとに順序を変更
              </div>
            </div>
          </div>
        ),
        2: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                負の値を使った優先順位 - order: -1, 0, 1
              </div>
              <div className="bg-white dark:bg-gray-800 border rounded p-3">
                <div className="flex gap-2">
                  <div
                    className="bg-green-500 text-white px-3 py-2 rounded text-sm"
                    style={{ order: 0 }}
                  >
                    通常 (order: 0)
                  </div>
                  <div
                    className="bg-red-500 text-white px-3 py-2 rounded text-sm"
                    style={{ order: -1 }}
                  >
                    最優先 (order: -1)
                  </div>
                  <div
                    className="bg-blue-500 text-white px-3 py-2 rounded text-sm"
                    style={{ order: 1 }}
                  >
                    後回し (order: 1)
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-500 p-2 bg-green-50 dark:bg-green-900/20 rounded">
                💡 負の値は最前面、0がデフォルト、正の値は後ろに配置
              </div>
            </div>
          </div>
        ),
        3: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                実用例 - ヘッダー・コンテンツ・フッター
              </div>
              <div className="bg-white dark:bg-gray-800 border rounded p-3">
                <div
                  className="flex flex-col gap-2"
                  style={{ height: "120px" }}
                >
                  <div
                    className="bg-gray-600 text-white px-3 py-1 rounded text-sm text-center"
                    style={{ order: -999 }}
                  >
                    ヘッダー (order: -999)
                  </div>
                  <div
                    className="bg-purple-500 text-white px-3 py-2 rounded text-sm text-center flex-1"
                    style={{ order: 0 }}
                  >
                    メインコンテンツ (order: 0)
                  </div>
                  <div
                    className="bg-gray-600 text-white px-3 py-1 rounded text-sm text-center"
                    style={{ order: 999 }}
                  >
                    フッター (order: 999)
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-500 p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
                💡 極端な値でヘッダー・フッターの位置を確実に固定
              </div>
            </div>
          </div>
        ),
      },
      "flex-direction": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="flex gap-2">
              <div className="bg-blue-500 text-white px-3 py-2 rounded text-sm">
                1
              </div>
              <div className="bg-green-500 text-white px-3 py-2 rounded text-sm">
                2
              </div>
              <div className="bg-purple-500 text-white px-3 py-2 rounded text-sm">
                3
              </div>
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="flex flex-col gap-2 w-fit">
              <div className="bg-blue-500 text-white px-3 py-2 rounded text-sm">
                1
              </div>
              <div className="bg-green-500 text-white px-3 py-2 rounded text-sm">
                2
              </div>
              <div className="bg-purple-500 text-white px-3 py-2 rounded text-sm">
                3
              </div>
            </div>
          </div>
        ),
      },
      "justify-content": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="flex justify-center gap-2">
              <div className="bg-blue-500 text-white px-3 py-2 rounded text-sm">
                1
              </div>
              <div className="bg-green-500 text-white px-3 py-2 rounded text-sm">
                2
              </div>
              <div className="bg-purple-500 text-white px-3 py-2 rounded text-sm">
                3
              </div>
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="flex justify-between">
              <div className="bg-blue-500 text-white px-3 py-2 rounded text-sm">
                1
              </div>
              <div className="bg-green-500 text-white px-3 py-2 rounded text-sm">
                2
              </div>
              <div className="bg-purple-500 text-white px-3 py-2 rounded text-sm">
                3
              </div>
            </div>
          </div>
        ),
        2: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="flex justify-start gap-2">
              <div className="bg-blue-500 text-white px-3 py-2 rounded text-sm">
                1
              </div>
              <div className="bg-green-500 text-white px-3 py-2 rounded text-sm">
                2
              </div>
              <div className="bg-purple-500 text-white px-3 py-2 rounded text-sm">
                3
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              justify-content: flex-start（左寄せ）
            </div>
          </div>
        ),
        3: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="flex justify-around">
              <div className="bg-blue-500 text-white px-3 py-2 rounded text-sm">
                1
              </div>
              <div className="bg-green-500 text-white px-3 py-2 rounded text-sm">
                2
              </div>
              <div className="bg-purple-500 text-white px-3 py-2 rounded text-sm">
                3
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              justify-content: space-around（両端と間に均等な余白）
            </div>
          </div>
        ),
      },
      "justify-items": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                justify-items: center - 各アイテムをセル内の中央に配置
              </div>
              <div className="grid grid-cols-3 gap-3 w-full max-w-md">
                <div className="bg-gray-200 dark:bg-gray-600 p-2 h-16 flex items-center justify-center border-2 border-dashed border-gray-400">
                  <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs">
                    Item 1
                  </div>
                </div>
                <div className="bg-gray-200 dark:bg-gray-600 p-2 h-16 flex items-center justify-center border-2 border-dashed border-gray-400">
                  <div className="bg-green-500 text-white px-2 py-1 rounded text-xs">
                    Item 2
                  </div>
                </div>
                <div className="bg-gray-200 dark:bg-gray-600 p-2 h-16 flex items-center justify-center border-2 border-dashed border-gray-400">
                  <div className="bg-purple-500 text-white px-2 py-1 rounded text-xs">
                    Item 3
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                💡 破線はグリッドセルの境界。アイテムが各セルの中央に配置される
              </div>
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                justify-items: start - 各アイテムをセル内の左端に配置
              </div>
              <div className="grid grid-cols-3 gap-3 w-full max-w-md">
                <div className="bg-gray-200 dark:bg-gray-600 p-2 h-16 flex items-center justify-start border-2 border-dashed border-gray-400">
                  <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs">
                    Item 1
                  </div>
                </div>
                <div className="bg-gray-200 dark:bg-gray-600 p-2 h-16 flex items-center justify-start border-2 border-dashed border-gray-400">
                  <div className="bg-green-500 text-white px-2 py-1 rounded text-xs">
                    Item 2
                  </div>
                </div>
                <div className="bg-gray-200 dark:bg-gray-600 p-2 h-16 flex items-center justify-start border-2 border-dashed border-gray-400">
                  <div className="bg-purple-500 text-white px-2 py-1 rounded text-xs">
                    Item 3
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-2 p-2 bg-orange-50 dark:bg-orange-900/20 rounded">
                💡 各アイテムがセルの左端（start）に揃って配置される
              </div>
            </div>
          </div>
        ),
        2: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                justify-items: stretch -
                アイテムをセルの幅に合わせて伸縮（デフォルト）
              </div>
              <div className="grid grid-cols-2 gap-3 w-full max-w-md">
                <div className="bg-gray-200 dark:bg-gray-600 p-2 h-16 flex items-center border-2 border-dashed border-gray-400">
                  <div className="bg-blue-500 text-white py-1 rounded text-xs w-full text-center">
                    Item 1 - 幅100%
                  </div>
                </div>
                <div className="bg-gray-200 dark:bg-gray-600 p-2 h-16 flex items-center border-2 border-dashed border-gray-400">
                  <div className="bg-green-500 text-white py-1 rounded text-xs w-full text-center">
                    Item 2 - 幅100%
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-2 p-2 bg-green-50 dark:bg-green-900/20 rounded">
                💡 stretch（デフォルト）：アイテムがセルいっぱいに広がる
              </div>
            </div>
          </div>
        ),
        3: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                justify-items: end - 各アイテムをセル内の右端に配置
              </div>
              <div className="grid grid-cols-3 gap-3 w-full max-w-md">
                <div className="bg-gray-200 dark:bg-gray-600 p-2 h-16 flex items-center justify-end border-2 border-dashed border-gray-400">
                  <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs">
                    Card 1
                  </div>
                </div>
                <div className="bg-gray-200 dark:bg-gray-600 p-2 h-16 flex items-center justify-end border-2 border-dashed border-gray-400">
                  <div className="bg-green-500 text-white px-2 py-1 rounded text-xs">
                    Card 2
                  </div>
                </div>
                <div className="bg-gray-200 dark:bg-gray-600 p-2 h-16 flex items-center justify-end border-2 border-dashed border-gray-400">
                  <div className="bg-purple-500 text-white px-2 py-1 rounded text-xs">
                    Card 3
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-2 p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
                💡 レスポンシブカードレイアウトでよく使用される配置パターン
              </div>
            </div>
          </div>
        ),
      },
      "align-items": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border h-32 flex items-center">
            <div className="flex flex-row h-24 w-full items-center gap-2">
              <div className="bg-blue-500 text-white px-3 py-2 rounded text-sm h-8">
                1
              </div>
              <div className="bg-green-500 text-white px-3 py-6 rounded text-sm h-16">
                2
              </div>
              <div className="bg-purple-500 text-white px-3 py-4 rounded text-sm h-12">
                3
              </div>
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border h-32 flex items-stretch">
            <div className="flex flex-row h-24 w-full items-stretch gap-2">
              <div className="bg-blue-500 text-white px-3 py-2 rounded text-sm">
                1
              </div>
              <div className="bg-green-500 text-white px-3 py-6 rounded text-sm">
                2
              </div>
              <div className="bg-purple-500 text-white px-3 py-4 rounded text-sm">
                3
              </div>
            </div>
          </div>
        ),
        2: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border h-32 flex items-start">
            <div className="flex flex-row h-24 w-full items-start gap-2">
              <div className="bg-blue-500 text-white px-3 py-2 rounded text-sm h-8">
                1
              </div>
              <div className="bg-green-500 text-white px-3 py-6 rounded text-sm h-16">
                2
              </div>
              <div className="bg-purple-500 text-white px-3 py-4 rounded text-sm h-12">
                3
              </div>
            </div>
          </div>
        ),
        3: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border h-32 flex items-end">
            <div className="flex flex-row h-24 w-full items-end gap-2">
              <div className="bg-blue-500 text-white px-3 py-2 rounded text-sm h-8">
                1
              </div>
              <div className="bg-green-500 text-white px-3 py-6 rounded text-sm h-16">
                2
              </div>
              <div className="bg-purple-500 text-white px-3 py-4 rounded text-sm h-12">
                3
              </div>
            </div>
          </div>
        ),
      },
      "align-content": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                align-content: center - 複数行全体を垂直中央に配置
              </div>
              <div className="h-32 bg-white dark:bg-gray-800 border-2 border-dashed border-blue-300 rounded p-2 flex flex-col justify-center">
                <div className="flex flex-wrap gap-2 w-32">
                  <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs">
                    Item 1
                  </div>
                  <div className="bg-green-500 text-white px-2 py-1 rounded text-xs">
                    Item 2
                  </div>
                  <div className="bg-purple-500 text-white px-2 py-1 rounded text-xs">
                    Item 3
                  </div>
                  <div className="bg-orange-500 text-white px-2 py-1 rounded text-xs">
                    Item 4
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                💡 flex-wrap: wrapで複数行になった全体をコンテナ中央に配置
              </div>
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                align-content: space-between - 行間に均等な間隔
              </div>
              <div className="h-32 bg-white dark:bg-gray-800 border-2 border-dashed border-green-300 rounded p-2 flex flex-col justify-between">
                <div className="flex gap-2 w-32">
                  <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs">
                    Item 1
                  </div>
                  <div className="bg-green-500 text-white px-2 py-1 rounded text-xs">
                    Item 2
                  </div>
                </div>
                <div className="flex gap-2 w-32">
                  <div className="bg-purple-500 text-white px-2 py-1 rounded text-xs">
                    Item 3
                  </div>
                  <div className="bg-orange-500 text-white px-2 py-1 rounded text-xs">
                    Item 4
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-2 p-2 bg-green-50 dark:bg-green-900/20 rounded">
                💡 1行目は上端、2行目は下端に配置（行間に最大の間隔）
              </div>
            </div>
          </div>
        ),
        2: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                align-content: start - 複数行を上端に配置
              </div>
              <div className="h-32 bg-white dark:bg-gray-800 border-2 border-dashed border-purple-300 rounded p-2 flex flex-col justify-start">
                <div className="flex gap-2 w-32 mb-1">
                  <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs">
                    Item 1
                  </div>
                  <div className="bg-green-500 text-white px-2 py-1 rounded text-xs">
                    Item 2
                  </div>
                </div>
                <div className="flex gap-2 w-32 mb-1">
                  <div className="bg-purple-500 text-white px-2 py-1 rounded text-xs">
                    Item 3
                  </div>
                  <div className="bg-orange-500 text-white px-2 py-1 rounded text-xs">
                    Item 4
                  </div>
                </div>
                <div className="flex gap-2 w-32">
                  <div className="bg-pink-500 text-white px-2 py-1 rounded text-xs">
                    Item 5
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-2 p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
                💡 グリッドでも使用可能。全体を上端に詰めて配置
              </div>
            </div>
          </div>
        ),
        3: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                align-content: space-evenly - 全体に均等な間隔
              </div>
              <div className="h-32 bg-white dark:bg-gray-800 border-2 border-dashed border-orange-300 rounded p-2 flex flex-col justify-evenly">
                <div className="flex gap-2 w-32">
                  <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs">
                    Item 1
                  </div>
                  <div className="bg-green-500 text-white px-2 py-1 rounded text-xs">
                    Item 2
                  </div>
                </div>
                <div className="flex gap-2 w-32">
                  <div className="bg-purple-500 text-white px-2 py-1 rounded text-xs">
                    Item 3
                  </div>
                  <div className="bg-orange-500 text-white px-2 py-1 rounded text-xs">
                    Item 4
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-2 p-2 bg-orange-50 dark:bg-orange-900/20 rounded">
                💡 上下端と行間すべてに均等な間隔を配置
              </div>
            </div>
          </div>
        ),
      },
      "flex-wrap": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="flex flex-wrap gap-2 w-48">
              <div className="bg-blue-500 text-white px-4 py-2 rounded text-sm flex-1 min-w-20">
                Item 1
              </div>
              <div className="bg-green-500 text-white px-4 py-2 rounded text-sm flex-1 min-w-20">
                Item 2
              </div>
              <div className="bg-purple-500 text-white px-4 py-2 rounded text-sm flex-1 min-w-20">
                Item 3
              </div>
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="flex flex-wrap-reverse gap-2 w-48">
              <div className="bg-blue-500 text-white px-4 py-2 rounded text-sm flex-1 min-w-20">
                1
              </div>
              <div className="bg-green-500 text-white px-4 py-2 rounded text-sm flex-1 min-w-20">
                2
              </div>
              <div className="bg-purple-500 text-white px-4 py-2 rounded text-sm flex-1 min-w-20">
                3
              </div>
            </div>
          </div>
        ),
      },
      "flex-grow-shrink-basis": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="flex gap-2">
              <div
                className="bg-blue-500 text-white p-2 rounded text-sm"
                style={{ flex: "0 0 250px" }}
              >
                Sidebar (固定)
              </div>
              <div
                className="bg-green-500 text-white p-2 rounded text-sm"
                style={{ flex: "1" }}
              >
                Main (可変)
              </div>
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="flex gap-2">
              <div
                className="bg-blue-500 text-white p-2 rounded text-sm"
                style={{ flex: "1 1 300px" }}
              >
                Card 1
              </div>
              <div
                className="bg-green-500 text-white p-2 rounded text-sm"
                style={{ flex: "1 1 300px" }}
              >
                Card 2
              </div>
              <div
                className="bg-purple-500 text-white p-2 rounded text-sm"
                style={{ flex: "1 1 300px" }}
              >
                Card 3
              </div>
            </div>
          </div>
        ),
        2: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="flex gap-2">
              <div
                className="bg-blue-500 text-white p-2 rounded text-sm"
                style={{ flex: "none" }}
              >
                固定要素
              </div>
              <div
                className="bg-green-500 text-white p-2 rounded text-sm"
                style={{ flex: "1" }}
              >
                伸縮要素
              </div>
            </div>
          </div>
        ),
      },
      "grid-template-columns": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-blue-500 text-white px-3 py-2 rounded text-sm text-center">
                1
              </div>
              <div className="bg-green-500 text-white px-3 py-2 rounded text-sm text-center">
                2
              </div>
              <div className="bg-purple-500 text-white px-3 py-2 rounded text-sm text-center">
                3
              </div>
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div
              className="grid gap-2"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
              }}
            >
              <div className="bg-blue-500 text-white px-2 py-2 rounded text-xs text-center">
                1
              </div>
              <div className="bg-green-500 text-white px-2 py-2 rounded text-xs text-center">
                2
              </div>
              <div className="bg-purple-500 text-white px-2 py-2 rounded text-xs text-center">
                3
              </div>
              <div className="bg-orange-500 text-white px-2 py-2 rounded text-xs text-center">
                4
              </div>
            </div>
          </div>
        ),
      },
      "grid-template-areas": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div
              className="grid gap-2"
              style={{
                gridTemplateAreas:
                  '"header header" "sidebar main" "footer footer"',
                gridTemplateColumns: "1fr 2fr",
                gridTemplateRows: "auto 1fr auto",
              }}
            >
              <div
                className="bg-blue-500 text-white p-2 rounded text-xs text-center"
                style={{ gridArea: "header" }}
              >
                Header
              </div>
              <div
                className="bg-green-500 text-white p-2 rounded text-xs text-center"
                style={{ gridArea: "sidebar" }}
              >
                Sidebar
              </div>
              <div
                className="bg-purple-500 text-white p-2 rounded text-xs text-center"
                style={{ gridArea: "main" }}
              >
                Main
              </div>
              <div
                className="bg-orange-500 text-white p-2 rounded text-xs text-center"
                style={{ gridArea: "footer" }}
              >
                Footer
              </div>
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div
              className="grid gap-2"
              style={{
                gridTemplateAreas:
                  '"logo nav nav" "hero hero hero" "content content sidebar"',
                gridTemplateColumns: "1fr 2fr 1fr",
              }}
            >
              <div
                className="bg-blue-500 text-white p-1 rounded text-xs text-center"
                style={{ gridArea: "logo" }}
              >
                Logo
              </div>
              <div
                className="bg-green-500 text-white p-1 rounded text-xs text-center"
                style={{ gridArea: "nav" }}
              >
                Nav
              </div>
              <div
                className="bg-purple-500 text-white p-1 rounded text-xs text-center"
                style={{ gridArea: "hero" }}
              >
                Hero
              </div>
              <div
                className="bg-orange-500 text-white p-1 rounded text-xs text-center"
                style={{ gridArea: "content" }}
              >
                Content
              </div>
              <div
                className="bg-pink-500 text-white p-1 rounded text-xs text-center"
                style={{ gridArea: "sidebar" }}
              >
                Sidebar
              </div>
            </div>
          </div>
        ),
      },
      "grid-auto-fit-fill": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div
              className="grid gap-2"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
              }}
            >
              <div className="bg-blue-500 text-white p-2 rounded text-xs text-center">
                auto-fit
              </div>
              <div className="bg-green-500 text-white p-2 rounded text-xs text-center">
                250px
              </div>
              <div className="bg-purple-500 text-white p-2 rounded text-xs text-center">
                min
              </div>
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div
              className="grid gap-2"
              style={{ gridTemplateColumns: "repeat(auto-fill, 60px)" }}
            >
              <div className="bg-blue-500 text-white p-2 rounded text-xs text-center">
                fill
              </div>
              <div className="bg-green-500 text-white p-2 rounded text-xs text-center">
                200px
              </div>
              <div className="bg-purple-500 text-white p-2 rounded text-xs text-center">
                固定
              </div>
            </div>
          </div>
        ),
      },
      position: {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border relative h-24">
            <div className="bg-blue-500 text-white px-3 py-2 rounded text-sm absolute top-2 left-2">
              相対配置
            </div>
            <div className="bg-gray-300 dark:bg-gray-600 px-3 py-2 rounded text-sm mt-8">
              通常の要素
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border relative h-24">
            <div className="bg-green-500 text-white px-3 py-2 rounded text-sm absolute top-4 right-4">
              絶対配置
            </div>
            <div className="bg-gray-300 dark:bg-gray-600 px-3 py-2 rounded text-sm">
              通常の要素
            </div>
          </div>
        ),
        2: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="bg-purple-500 text-white px-3 py-2 rounded text-sm inline-block">
              固定配置（画面に固定）
            </div>
          </div>
        ),
        3: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border h-32 overflow-y-auto">
            <div className="bg-blue-500 text-white px-3 py-2 rounded text-sm sticky top-0 shadow">
              スクロールしても上部に固定（sticky）
            </div>
            <div className="space-y-2 mt-2">
              <div className="bg-gray-200 dark:bg-gray-600 px-3 py-2 rounded text-sm">
                Content 1
              </div>
              <div className="bg-gray-200 dark:bg-gray-600 px-3 py-2 rounded text-sm">
                Content 2
              </div>
              <div className="bg-gray-200 dark:bg-gray-600 px-3 py-2 rounded text-sm">
                Content 3
              </div>
              <div className="bg-gray-200 dark:bg-gray-600 px-3 py-2 rounded text-sm">
                Content 4
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              position: sticky; top: 0;
            </div>
          </div>
        ),
        4: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border relative h-40">
            <div
              className="bg-orange-500 text-white px-4 py-2 rounded text-sm absolute"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                minWidth: 120,
                textAlign: "center",
              }}
            >
              transformで中央配置
            </div>
            <div className="text-xs text-gray-500 absolute bottom-2 left-2">
              position: fixed; top: 50%; left: 50%; transform: translate(-50%,
              -50%);
            </div>
          </div>
        ),
      },
      "position-sticky": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="h-32 overflow-y-auto border border-gray-300 dark:border-gray-600">
              <div className="bg-blue-500 text-white p-2 text-sm sticky top-0">
                Sticky Header
              </div>
              <div className="p-4 space-y-2">
                <div className="bg-gray-200 dark:bg-gray-600 p-2 rounded">
                  Content 1
                </div>
                <div className="bg-gray-200 dark:bg-gray-600 p-2 rounded">
                  Content 2
                </div>
                <div className="bg-gray-200 dark:bg-gray-600 p-2 rounded">
                  Content 3
                </div>
                <div className="bg-gray-200 dark:bg-gray-600 p-2 rounded">
                  Content 4
                </div>
              </div>
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="flex gap-4 h-32">
              <div className="bg-green-500 text-white p-2 rounded text-sm sticky top-8 h-fit">
                Sticky Sidebar
              </div>
              <div className="flex-1 space-y-2 overflow-y-auto">
                <div className="bg-gray-200 dark:bg-gray-600 p-2 rounded">
                  Main Content
                </div>
                <div className="bg-gray-200 dark:bg-gray-600 p-2 rounded">
                  More Content
                </div>
              </div>
            </div>
          </div>
        ),
      },
      "z-index": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border relative h-32 flex items-center justify-center">
            <div className="relative w-64 h-24">
              <div
                className="absolute left-8 top-6 w-40 h-12 bg-blue-500 text-white flex items-center justify-center rounded shadow-lg border-2 border-blue-700 z-20"
                style={{ zIndex: 10 }}
              >
                z-index: 10
              </div>
              <div
                className="absolute left-16 top-10 w-40 h-12 bg-orange-400 text-white flex items-center justify-center rounded shadow border-2 border-orange-600 z-10"
                style={{ zIndex: 5 }}
              >
                z-index: 5
              </div>
              <div
                className="absolute left-24 top-14 w-40 h-12 bg-gray-400 text-white flex items-center justify-center rounded border-2 border-gray-700 opacity-80"
                style={{ zIndex: 0 }}
              >
                z-index: 0（奥）
              </div>
            </div>
            <div className="text-xs text-gray-500 absolute bottom-2 left-4">
              z-indexが大きいほど手前に表示されます
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border relative h-32 flex items-center justify-center">
            <div className="relative w-64 h-24">
              <div
                className="absolute left-8 top-6 w-40 h-12 bg-blue-500 text-white flex items-center justify-center rounded shadow-lg border-2 border-blue-700 z-20"
                style={{ zIndex: 10 }}
              >
                z-index: 10
              </div>
              <div
                className="absolute left-16 top-10 w-40 h-12 bg-orange-400 text-white flex items-center justify-center rounded shadow border-2 border-orange-600 z-10"
                style={{ zIndex: 5 }}
              >
                z-index: 5
              </div>
              <div
                className="absolute left-24 top-14 w-40 h-12 bg-purple-500 text-white flex items-center justify-center rounded border-2 border-purple-700 opacity-80"
                style={{ zIndex: -1 }}
              >
                z-index: -1（背面）
              </div>
            </div>
            <div className="text-xs text-gray-500 absolute bottom-2 left-4">
              z-indexが大きいほど手前に表示されます
            </div>
          </div>
        ),
      },
      color: {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <p className="text-blue-500 font-medium">このテキストは青色です</p>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <p style={{ color: "rgb(59, 130, 246)" }} className="font-medium">
              このテキストはRGB値で青色です
            </p>
          </div>
        ),
        2: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <p style={{ color: "hsl(217, 91%, 60%)" }} className="font-medium">
              このテキストはHSL値で青色です
            </p>
          </div>
        ),
      },
      "font-size": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <p style={{ fontSize: "16px" }}>16pxのテキストサイズ</p>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <p style={{ fontSize: "1.2em" }}>1.2emのテキストサイズ</p>
          </div>
        ),
        2: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <p style={{ fontSize: "1.2rem" }}>1.2remのテキストサイズ</p>
          </div>
        ),
      },
      "font-weight": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <p style={{ fontWeight: 400 }}>通常の太さ (400)</p>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <p style={{ fontWeight: 700 }}>太字 (700)</p>
          </div>
        ),
        2: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <p style={{ fontWeight: 300 }}>細字 (300)</p>
          </div>
        ),
      },
      "line-height": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <p style={{ lineHeight: 1.6 }}>
              行の高さが1.6倍に設定されています。
              <br />
              読みやすい行間になっています。
            </p>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <p style={{ lineHeight: 1 }}>
              行の高さが1倍（タイトル用）
              <br />
              文字サイズと同じ高さです。
            </p>
          </div>
        ),
        2: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <p style={{ lineHeight: "2rem" }}>
              絶対値で2remの行高
              <br />
              固定の行間です。
            </p>
          </div>
        ),
      },
      "text-align": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                text-align: center - 中央揃え
              </div>
              <div className="bg-white dark:bg-gray-800 border rounded p-3">
                <p
                  style={{ textAlign: "center" }}
                  className="text-blue-600 dark:text-blue-400"
                >
                  このテキストは中央に配置されます
                </p>
              </div>
              <div className="text-xs text-gray-500 p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                💡 見出し、ボタンテキスト、キャッチコピーでよく使用
              </div>
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                text-align: justify - 両端揃え
              </div>
              <div className="bg-white dark:bg-gray-800 border rounded p-3">
                <p
                  style={{ textAlign: "justify", lineHeight: "1.6" }}
                  className="text-green-600 dark:text-green-400"
                >
                  両端揃えのテキストです。長い文章の場合、左右の端が揃うように文字間隔が自動調整されます。新聞や雑誌のような整然とした見た目になります。
                </p>
              </div>
              <div className="text-xs text-gray-500 p-2 bg-green-50 dark:bg-green-900/20 rounded">
                💡 文章が短いと文字間隔が不自然になる場合があるので注意
              </div>
            </div>
          </div>
        ),
        2: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                text-align: right - 右揃え
              </div>
              <div className="bg-white dark:bg-gray-800 border rounded p-3">
                <p
                  style={{ textAlign: "right" }}
                  className="text-purple-600 dark:text-purple-400"
                >
                  このテキストは右端に揃えられます
                </p>
              </div>
              <div className="text-xs text-gray-500 p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
                💡 日付、価格表示、署名などでよく使用
              </div>
            </div>
          </div>
        ),
        3: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                配置の比較
              </div>
              <div className="bg-white dark:bg-gray-800 border rounded p-3 space-y-2">
                <p
                  style={{ textAlign: "left" }}
                  className="text-orange-600 dark:text-orange-400 text-sm"
                >
                  left: 左揃え（デフォルト）
                </p>
                <p
                  style={{ textAlign: "center" }}
                  className="text-blue-600 dark:text-blue-400 text-sm"
                >
                  center: 中央揃え
                </p>
                <p
                  style={{ textAlign: "right" }}
                  className="text-green-600 dark:text-green-400 text-sm"
                >
                  right: 右揃え
                </p>
              </div>
              <div className="text-xs text-gray-500 p-2 bg-orange-50 dark:bg-orange-900/20 rounded">
                💡 start/endは書字方向（RTL/LTR）に応じて動的に変わる
              </div>
            </div>
          </div>
        ),
      },
      "text-decoration": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <p style={{ textDecoration: "underline" }}>下線付きテキスト</p>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <p style={{ textDecoration: "line-through red" }}>赤い取り消し線</p>
          </div>
        ),
        2: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <p style={{ textDecoration: "underline wavy blue" }}>
              青い波線の下線
            </p>
          </div>
        ),
      },
      "background-color": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border flex items-center justify-center">
            <div
              className="w-16 h-16 rounded"
              style={{
                backgroundColor: "#f8fafc",
                border: "1px solid #e5e7eb",
              }}
            />
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border flex items-center justify-center">
            <div
              className="w-16 h-16 rounded"
              style={{
                backgroundColor: "rgba(59,130,246,0.1)",
                border: "1px solid #3b82f6",
              }}
            />
          </div>
        ),
      },
      "background-image": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div
              className="p-4 rounded text-center bg-cover bg-center"
              style={{
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23666" fill-opacity="0.1"%3E%3Cpath d="m0 40l40-40h-40v40zm40 0v-40h-40l40 40z"/%3E%3C/g%3E%3C/svg%3E")',
                color: "#111",
              }}
            >
              背景画像パターン
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div
              className="p-4 rounded text-center"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "#111",
              }}
            >
              線形グラデーション背景
            </div>
          </div>
        ),
        2: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div
              className="p-4 rounded text-center"
              style={{
                backgroundImage: "radial-gradient(circle, #ff6b6b, #4ecdc4)",
                color: "#111",
              }}
            >
              円形グラデーション背景
            </div>
          </div>
        ),
      },
      "background-size": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border flex flex-col items-center">
            <div
              className="w-40 h-24 rounded border overflow-hidden relative"
              style={{ background: "#eee" }}
            >
              <img
                src="https://placehold.jp/150x100.png"
                alt="cover"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-2">
              background-size: cover（全体を覆う）
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border flex flex-col items-center">
            <div
              className="w-40 h-24 rounded border overflow-hidden relative"
              style={{ background: "#eee" }}
            >
              <img
                src="https://placehold.jp/150x100.png"
                alt="contain"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-2">
              background-size: contain（全体が収まる）
            </div>
          </div>
        ),
        2: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border flex flex-col items-center">
            <div
              className="w-40 h-24 rounded border overflow-hidden relative"
              style={{ background: "#eee" }}
            >
              <img
                src="https://placehold.jp/150x100.png"
                alt="100% auto"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-2">
              background-size: 100% auto（幅100%、高さ自動）
            </div>
          </div>
        ),
      },
      "background-position": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                background-position: center - 背景画像を中央に配置
              </div>
              <div
                className="h-24 bg-white dark:bg-gray-800 border-2 border-dashed border-blue-300 rounded relative overflow-hidden"
                style={{
                  backgroundImage:
                    'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%2360A5FA" fill-opacity="0.8"%3E%3Ccircle cx="20" cy="20" r="8"/%3E%3C/g%3E%3C/svg%3E")',
                  backgroundSize: "40px 40px",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs">
                    中央配置
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                💡 最も使用頻度が高い配置。ロゴやアイコンでよく使用
              </div>
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                background-position: top right - 背景画像を右上に配置
              </div>
              <div
                className="h-24 bg-white dark:bg-gray-800 border-2 border-dashed border-green-300 rounded relative overflow-hidden"
                style={{
                  backgroundImage:
                    'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%2310B981" fill-opacity="0.8"%3E%3Crect x="8" y="8" width="24" height="24" rx="4"/%3E%3C/g%3E%3C/svg%3E")',
                  backgroundSize: "40px 40px",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "top right",
                }}
              >
                <div className="absolute top-2 right-2">
                  <div className="bg-green-500 text-white px-2 py-1 rounded text-xs">
                    右上
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-2 p-2 bg-green-50 dark:bg-green-900/20 rounded">
                💡 バッジやアイコンを右上に配置する際によく使用
              </div>
            </div>
          </div>
        ),
        2: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                background-position: 20% 80% - パーセントでの位置指定
              </div>
              <div
                className="h-24 bg-white dark:bg-gray-800 border-2 border-dashed border-purple-300 rounded relative overflow-hidden"
                style={{
                  backgroundImage:
                    'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23A855F7" fill-opacity="0.8"%3E%3Cpolygon points="20,8 28,28 12,28"/%3E%3C/g%3E%3C/svg%3E")',
                  backgroundSize: "40px 40px",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "20% 80%",
                }}
              >
                <div
                  className="absolute"
                  style={{
                    left: "20%",
                    top: "80%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="bg-purple-500 text-white px-2 py-1 rounded text-xs">
                    20% 80%
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-2 p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
                💡 水平20%、垂直80%の位置。精密な位置調整に便利
              </div>
            </div>
          </div>
        ),
        3: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                background-position: 50px 100px - ピクセル単位での位置指定
              </div>
              <div
                className="h-24 bg-white dark:bg-gray-800 border-2 border-dashed border-orange-300 rounded relative overflow-hidden"
                style={{
                  backgroundImage:
                    'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23F97316" fill-opacity="0.8"%3E%3Cstar cx="20" cy="20" r="12" stroke="%23F97316" stroke-width="2" fill="none"/%3E%3C/g%3E%3C/svg%3E")',
                  backgroundSize: "40px 40px",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "50px 20px",
                }}
              >
                <div className="absolute" style={{ left: "50px", top: "20px" }}>
                  <div className="bg-orange-500 text-white px-2 py-1 rounded text-xs">
                    50px 20px
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-2 p-2 bg-orange-50 dark:bg-orange-900/20 rounded">
                💡 左から50px、上から20px。絶対的な位置指定
              </div>
            </div>
          </div>
        ),
      },
      "linear-gradient": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div
              className="p-4 rounded text-white text-center"
              style={{
                background: "linear-gradient(to right, #ff6b6b, #4ecdc4)",
              }}
            >
              左から右へのグラデーション
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div
              className="p-4 rounded text-white text-center"
              style={{
                background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
              }}
            >
              45度斜めグラデーション
            </div>
          </div>
        ),
        2: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div
              className="p-4 rounded text-white text-center relative"
              style={{
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ff6b6b" fill-opacity="0.4"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
              }}
            >
              <div
                className="absolute inset-0 rounded"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.8) 100%)",
                }}
              ></div>
              <div className="relative">オーバーレイ効果</div>
            </div>
          </div>
        ),
      },
      "radial-gradient": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div
              className="p-4 rounded text-white text-center"
              style={{
                background: "radial-gradient(circle, #ff6b6b, #4ecdc4)",
              }}
            >
              中央から外側への円形グラデーション
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div
              className="p-4 rounded text-white text-center"
              style={{
                background:
                  "radial-gradient(ellipse at top left, #667eea, transparent)",
              }}
            >
              左上を中心とした楕円グラデーション
            </div>
          </div>
        ),
        2: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="p-4 rounded text-white text-center relative bg-gray-800">
              <div
                className="absolute inset-0 rounded"
                style={{
                  background:
                    "radial-gradient(circle at 30% 70%, rgba(255,107,107,0.3), transparent 50%)",
                }}
              ></div>
              <div className="relative">部分的なグラデーション</div>
            </div>
          </div>
        ),
      },
      padding: {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div
              className="bg-blue-500 text-white rounded inline-block"
              style={{ padding: "16px" }}
            >
              16pxの内側余白
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div
              className="bg-green-500 text-white rounded inline-block"
              style={{ padding: "12px 24px" }}
            >
              上下12px、左右24px
            </div>
          </div>
        ),
        2: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div
              className="bg-purple-500 text-white rounded inline-block"
              style={{ padding: "8px 16px 12px 20px" }}
            >
              個別指定の余白
            </div>
          </div>
        ),
      },
      margin: {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="bg-blue-500 text-white px-4 py-2 rounded mx-auto w-fit">
              中央寄せ（margin: 0 auto）
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div
              className="bg-green-500 text-white px-4 py-2 rounded"
              style={{ margin: "24px" }}
            >
              24pxの外側余白
            </div>
          </div>
        ),
      },
      "box-sizing": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="space-y-2">
              <div
                className="bg-blue-500 text-white p-2 rounded text-sm"
                style={{
                  width: "200px",
                  padding: "20px",
                  border: "2px solid #1e40af",
                  boxSizing: "border-box",
                }}
              >
                border-box (200px総幅)
              </div>
              <div
                className="bg-green-500 text-white p-2 rounded text-sm"
                style={{
                  width: "200px",
                  padding: "20px",
                  border: "2px solid #15803d",
                  boxSizing: "content-box",
                }}
              >
                content-box (244px総幅)
              </div>
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div
              className="bg-purple-500 text-white rounded text-sm"
              style={{
                width: "300px",
                padding: "20px",
                border: "2px solid #7c3aed",
                boxSizing: "border-box",
              }}
            >
              幅300pxにpadding・borderを含める
            </div>
          </div>
        ),
      },
      border: {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div
              className="p-4 rounded"
              style={{ border: "1px solid #e5e7eb" }}
            >
              1pxの実線でグレーのボーダー
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div
              className="p-4 rounded"
              style={{ border: "2px dashed #3b82f6" }}
            >
              2pxの破線で青いボーダー
            </div>
          </div>
        ),
      },
      "border-radius": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              8pxの角丸
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="bg-green-500 text-white w-16 h-16 rounded-full flex items-center justify-center">
              円形
            </div>
          </div>
        ),
      },
      "box-shadow": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border flex items-center justify-center">
            <div
              className="w-20 h-12 rounded bg-white"
              style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
            />
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border flex items-center justify-center">
            <div
              className="w-20 h-12 rounded bg-white"
              style={{ boxShadow: "0 0 0 3px rgba(59,130,246,0.5)" }}
            />
          </div>
        ),
      },
      opacity: {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="bg-blue-500 text-white px-4 py-2 rounded opacity-50">
              50%の透明度
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="bg-green-500 text-white px-4 py-2 rounded opacity-0">
              完全に透明（領域は確保）
            </div>
          </div>
        ),
      },
      transition: {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="bg-blue-500 text-white px-4 py-2 rounded transition-all duration-300 hover:bg-blue-600 hover:scale-105">
              ホバーでスムーズ変化
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="bg-green-500 text-white px-4 py-2 rounded transition-opacity duration-200 hover:opacity-50">
              透明度のみ変化
            </div>
          </div>
        ),
      },
      transform: {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="bg-blue-500 text-white px-4 py-2 rounded transform -translate-y-1">
              Y軸方向に上に移動
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="bg-green-500 text-white px-4 py-2 rounded transform scale-105">
              1.05倍に拡大
            </div>
          </div>
        ),
        2: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="bg-purple-500 text-white px-4 py-2 rounded transform rotate-12">
              12度回転
            </div>
          </div>
        ),
      },
      animation: {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                フェードインアニメーション
              </div>
              <div className="bg-white dark:bg-gray-800 border rounded p-3 flex justify-center">
                <div className="bg-blue-500 text-white px-4 py-2 rounded animate-pulse">
                  フェードイン効果
                </div>
              </div>
              <div className="text-xs text-gray-500 p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                💡 最も基本的なアニメーション。ページ読み込み時によく使用
              </div>
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                バウンスアニメーション
              </div>
              <div className="bg-white dark:bg-gray-800 border rounded p-3 flex justify-center">
                <div className="bg-green-500 text-white px-4 py-2 rounded animate-bounce">
                  バウンス効果
                </div>
              </div>
              <div className="text-xs text-gray-500 p-2 bg-green-50 dark:bg-green-900/20 rounded">
                💡 注意を引きたい要素に使用。無限ループで動作
              </div>
            </div>
          </div>
        ),
        2: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                回転ローディングスピナー
              </div>
              <div className="bg-white dark:bg-gray-800 border rounded p-3 flex justify-center">
                <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin"></div>
              </div>
              <div className="text-xs text-gray-500 p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
                💡 データ読み込み中の表示に最適。linear timingで滑らかな回転
              </div>
            </div>
          </div>
        ),
        3: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                シェイクアニメーション（エラー時）
              </div>
              <div className="bg-white dark:bg-gray-800 border rounded p-3 flex justify-center">
                <div
                  className="bg-red-500 text-white px-4 py-2 rounded border-2 border-red-600"
                  style={{
                    animation:
                      "shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite",
                  }}
                >
                  エラー発生！
                </div>
              </div>
              <div className="text-xs text-gray-500 p-2 bg-red-50 dark:bg-red-900/20 rounded">
                💡 フォーム検証エラーやシステムエラーのフィードバックに使用
              </div>
              <style>{`
                @keyframes shake {
                  0%, 100% { transform: translateX(0); }
                  10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
                  20%, 40%, 60%, 80% { transform: translateX(10px); }
                }
              `}</style>
            </div>
          </div>
        ),
        4: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                浮遊アニメーション
              </div>
              <div className="bg-white dark:bg-gray-800 border rounded p-3 flex justify-center">
                <div
                  className="bg-indigo-500 text-white px-4 py-2 rounded"
                  style={{
                    animation: "float 3s ease-in-out infinite",
                  }}
                >
                  浮遊する要素
                </div>
              </div>
              <div className="text-xs text-gray-500 p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded">
                💡 アイコンやイラストに動きを付けて親しみやすさを演出
              </div>
              <style>{`
                @keyframes float {
                  0%, 100% { transform: translateY(0px); }
                  50% { transform: translateY(-20px); }
                }
              `}</style>
            </div>
          </div>
        ),
        5: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                シェイクアニメーション（エラー時）
              </div>
              <div className="bg-white dark:bg-gray-800 border rounded p-3 flex justify-center">
                <div
                  className="bg-red-500 text-white px-4 py-2 rounded border-2 border-red-600"
                  style={{
                    animation:
                      "shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite",
                  }}
                >
                  エラー発生！
                </div>
              </div>
              <div className="text-xs text-gray-500 p-2 bg-red-50 dark:bg-red-900/20 rounded">
                💡 フォーム検証エラーやシステムエラーのフィードバックに使用
              </div>
              <style>{`
                @keyframes shake {
                  0%, 100% { transform: translateX(0); }
                  10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
                  20%, 40%, 60%, 80% { transform: translateX(10px); }
                }
              `}</style>
            </div>
          </div>
        ),

        6: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                浮遊アニメーション（遅延付き）
              </div>
              <div className="bg-white dark:bg-gray-800 border rounded p-3 flex justify-center">
                <div
                  className="bg-teal-500 text-white px-4 py-2 rounded"
                  style={{
                    animation: "floatDelayed 3s ease-in-out infinite",
                    animationDelay: "0.5s",
                    animationFillMode: "both",
                  }}
                >
                  遅延浮遊要素
                </div>
              </div>
              <div className="text-xs text-gray-500 p-2 bg-teal-50 dark:bg-teal-900/20 rounded">
                💡 animation-delay: 0.5s + animation-fill-mode: both
                で開始前の状態を制御
              </div>
              <style>{`
                @keyframes floatDelayed {
                  0%, 100% { transform: translateY(0px); opacity: 1; }
                  50% { transform: translateY(-20px); opacity: 0.8; }
                }
              `}</style>
            </div>
          </div>
        ),
        7: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                3Dフリップインアニメーション
              </div>
              <div className="bg-white dark:bg-gray-800 border rounded p-3 flex justify-center">
                <div
                  className="bg-gradient-to-r from-pink-500 to-violet-500 text-white px-4 py-2 rounded"
                  style={{
                    animation: "flipIn 2s ease-in-out infinite",
                    transformStyle: "preserve-3d",
                  }}
                >
                  3D フリップ
                </div>
              </div>
              <div className="text-xs text-gray-500 p-2 bg-pink-50 dark:bg-pink-900/20 rounded">
                💡 perspective()とrotateY()で立体的なフリップ効果を実現
              </div>
              <style>{`
                @keyframes flipIn {
                  0% {
                    transform: perspective(400px) rotateY(-90deg);
                    opacity: 0;
                  }
                  40% {
                    transform: perspective(400px) rotateY(-10deg);
                    opacity: 0.8;
                  }
                  70% {
                    transform: perspective(400px) rotateY(10deg);
                    opacity: 0.9;
                  }
                  100% {
                    transform: perspective(400px) rotateY(0deg);
                    opacity: 1;
                  }
                }
              `}</style>
            </div>
          </div>
        ),
        8: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                複数アニメーションの同時実行
              </div>
              <div className="bg-white dark:bg-gray-800 border rounded p-3 flex justify-center">
                <div
                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded"
                  style={{
                    animation:
                      "fadeInMulti 1s ease-out, slideInMulti 1s ease-out, pulseMulti 2s infinite 1s",
                  }}
                >
                  複数アニメーション
                </div>
              </div>
              <div className="text-xs text-gray-500 p-2 bg-amber-50 dark:bg-amber-900/20 rounded">
                💡
                カンマ区切りで複数のアニメーションを同時実行。それぞれ異なるタイミング設定可能
              </div>
              <style>{`
                @keyframes fadeInMulti {
                  from { opacity: 0; }
                  to { opacity: 1; }
                }
                @keyframes slideInMulti {
                  from { transform: translateX(-50px); }
                  to { transform: translateX(0); }
                }
                @keyframes pulseMulti {
                  0%, 100% { transform: scale(1); }
                  50% { transform: scale(1.05); }
                }
              `}</style>
            </div>
          </div>
        ),
      },
      keyframes: {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border overflow-hidden">
            <div
              className="bg-blue-500 text-white px-4 py-2 rounded"
              style={{
                animation: "slideInLeft 2s ease-out infinite",
                width: 120,
                position: "relative",
                left: 0,
              }}
            >
              左からスライドイン
            </div>
            <style>{`
              @keyframes slideInLeft {
                0% { left: -140px; opacity: 0; }
                25% { left: 0; opacity: 1; }
                75% { left: 0; opacity: 1; }
                100% { left: -140px; opacity: 0; }
              }
            `}</style>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border overflow-hidden">
            <div
              className="bg-purple-500 text-white px-4 py-2 rounded"
              style={{
                animation: "pulseDemo 1.2s infinite",
                display: "inline-block",
                minWidth: 120,
                textAlign: "center",
              }}
            >
              脈動アニメーション
            </div>
            <style>{`
              @keyframes pulseDemo {
                0%, 100% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.15); opacity: 0.7; }
              }
            `}</style>
          </div>
        ),
      },
      cursor: {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <button className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600">
              クリック可能（pointer）
            </button>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <button
              className="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed"
              disabled
            >
              無効な要素（not-allowed）
            </button>
          </div>
        ),
      },
      overflow: {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div
              className="bg-white border w-52 h-20"
              style={{ overflow: "visible" }}
            >
              <div className="bg-blue-500 text-white p-2 w-80">
                visible: はみ出した内容もそのまま表示されます
              </div>
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div
              className="bg-white border w-52 h-20"
              style={{ overflow: "hidden" }}
            >
              <div className="bg-green-500 text-white p-2 w-80">
                hidden: はみ出した部分は非表示です
              </div>
            </div>
          </div>
        ),
        2: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div
              className="bg-white border w-52 h-20"
              style={{ overflow: "scroll" }}
            >
              <div className="bg-purple-500 text-white p-2 w-80">
                scroll: 常にスクロールバーが表示されます
              </div>
            </div>
          </div>
        ),
        3: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div
              className="bg-white border w-52 h-20"
              style={{ overflow: "auto" }}
            >
              <div className="bg-orange-500 text-white p-2 w-80">
                auto: はみ出した時だけスクロールバーが出ます
              </div>
            </div>
          </div>
        ),
      },
      visibility: {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              visibility: visible / hidden の基本的な使い方
            </div>
            <div className="space-y-3">
              <div className="bg-green-500 text-white px-4 py-2 rounded text-center">
                表示されている要素 (visibility: visible)
              </div>
              <div
                className="bg-blue-500 text-white px-4 py-2 rounded text-center"
                style={{ visibility: "hidden" }}
              >
                非表示の要素 (visibility: hidden)
              </div>
              <div className="bg-purple-500 text-white px-4 py-2 rounded text-center">
                この要素は表示されている
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              非表示の要素も領域を確保しているため、レイアウトが保たれる
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              display: none との違い
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                  visibility: hidden（領域確保）
                </div>
                <div className="space-y-2">
                  <div className="bg-green-500 text-white px-4 py-2 rounded text-center">
                    要素1
                  </div>
                  <div
                    className="bg-blue-500 text-white px-4 py-2 rounded text-center"
                    style={{ visibility: "hidden" }}
                  >
                    要素2（非表示）
                  </div>
                  <div className="bg-purple-500 text-white px-4 py-2 rounded text-center">
                    要素3
                  </div>
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                  display: none（領域削除）
                </div>
                <div className="space-y-2">
                  <div className="bg-green-500 text-white px-4 py-2 rounded text-center">
                    要素1
                  </div>
                  <div
                    className="bg-blue-500 text-white px-4 py-2 rounded text-center"
                    style={{ display: "none" }}
                  >
                    要素2（非表示）
                  </div>
                  <div className="bg-purple-500 text-white px-4 py-2 rounded text-center">
                    要素3
                  </div>
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              visibility: hiddenは要素2の領域が残るが、display:
              noneは完全に除去される
            </div>
          </div>
        ),
        2: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              opacityと組み合わせたスムーズなアニメーション
            </div>
            <div className="bg-white dark:bg-gray-800 rounded border p-4">
              <div className="space-y-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                  onClick={(e) => {
                    const target = e.currentTarget
                      .nextElementSibling as HTMLElement;
                    if (target.style.visibility === "hidden") {
                      target.style.visibility = "visible";
                      target.style.opacity = "1";
                      target.textContent = "表示中（クリックで非表示）";
                    } else {
                      target.style.visibility = "hidden";
                      target.style.opacity = "0";
                      target.textContent = "非表示中（クリックで表示）";
                    }
                  }}
                >
                  フェード切り替え
                </button>
                <div
                  className="bg-green-500 text-white px-4 py-2 rounded text-center transition-all duration-300"
                  style={{
                    visibility: "visible",
                    opacity: 1,
                  }}
                >
                  表示中（クリックで非表示）
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              visibilityとopacityを組み合わせてスムーズなフェード効果を実現
            </div>
          </div>
        ),
        3: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              実用的なツールチップの表示制御
            </div>
            <div className="bg-white dark:bg-gray-800 rounded border p-4 flex justify-center">
              <div className="relative inline-block">
                <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors group">
                  ホバーしてください
                  <div
                    className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 text-white px-3 py-2 rounded text-sm whitespace-nowrap transition-all duration-200 pointer-events-none"
                    style={{
                      visibility: "hidden",
                      opacity: 0,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.visibility = "visible";
                      e.currentTarget.style.opacity = "1";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.visibility = "hidden";
                      e.currentTarget.style.opacity = "0";
                    }}
                  >
                    これはツールチップです
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800"></div>
                  </div>
                </button>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              ホバー時にツールチップが滑らかに表示される
            </div>
          </div>
        ),
        4: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              レスポンシブでの表示制御
            </div>
            <div className="bg-white dark:bg-gray-800 rounded border p-4">
              <div className="space-y-3">
                <div className="bg-blue-500 text-white px-4 py-2 rounded text-center">
                  常に表示される要素
                </div>
                <div className="bg-orange-500 text-white px-4 py-2 rounded text-center md:visible hidden">
                  デスクトップのみ表示（768px以上）
                </div>
                <div className="bg-green-500 text-white px-4 py-2 rounded text-center">
                  常に表示される要素
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              画面幅768px以下では中央の要素が非表示になる（領域は確保）
            </div>
          </div>
        ),
        5: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              モーダルオーバーレイの表示制御
            </div>
            <div className="bg-white dark:bg-gray-800 rounded border p-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                onClick={(e) => {
                  const overlay = e.currentTarget
                    .nextElementSibling as HTMLElement;
                  if (overlay.style.visibility === "hidden") {
                    overlay.style.visibility = "visible";
                    overlay.style.opacity = "1";
                  } else {
                    overlay.style.visibility = "hidden";
                    overlay.style.opacity = "0";
                  }
                }}
              >
                モーダルを開く
              </button>
              <div
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-all duration-300 z-50"
                style={{
                  visibility: "hidden",
                  opacity: 0,
                }}
                onClick={(e) => {
                  if (e.target === e.currentTarget) {
                    e.currentTarget.style.visibility = "hidden";
                    e.currentTarget.style.opacity = "0";
                  }
                }}
              >
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                    モーダルダイアログ
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    これはモーダルダイアログの例です。visibilityとopacityを使ってスムーズに表示されます。
                  </p>
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                    onClick={(e) => {
                      const overlay = e.currentTarget.closest(
                        '[style*="visibility"]'
                      ) as HTMLElement;
                      overlay.style.visibility = "hidden";
                      overlay.style.opacity = "0";
                    }}
                  >
                    閉じる
                  </button>
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              モーダルの表示・非表示をvisibilityで制御し、スムーズなアニメーションを実現
            </div>
          </div>
        ),
      },
      "white-space": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div
              className="bg-white p-2 rounded w-32"
              style={{ whiteSpace: "nowrap" }}
            >
              この長いテキストは改行されません
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div
              className="bg-white p-2 rounded"
              style={{ whiteSpace: "pre-wrap" }}
            >
              空白を保持しつつ 自動改行される
            </div>
          </div>
        ),
        2: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div
              className="bg-gray-800 text-green-400 p-2 rounded font-mono text-sm"
              style={{ whiteSpace: "pre" }}
            >
              {`function example() {
  return "コードブロック";
}`}
            </div>
          </div>
        ),
      },
      "text-overflow": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="bg-white p-2 rounded w-32 whitespace-nowrap overflow-hidden text-ellipsis">
              長いテキストが省略されます
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div
              className="bg-white p-2 rounded w-32 whitespace-nowrap overflow-hidden"
              style={{ textOverflow: "→" }}
            >
              カスタム文字で省略
            </div>
          </div>
        ),
      },
      "word-break": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div
              className="bg-white p-2 rounded w-32"
              style={{ wordBreak: "break-all" }}
            >
              verylongwordwithoutspaces
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div
              className="bg-white p-2 rounded w-32"
              style={{ wordBreak: "keep-all" }}
            >
              単語を分割せずに改行
            </div>
          </div>
        ),
        2: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div
              className="bg-white p-2 rounded w-32"
              style={{ wordBreak: "break-all", overflowWrap: "break-word" }}
            >
              https://very-long-url-example.com/path
            </div>
          </div>
        ),
      },
      "user-select": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div
              className="bg-white p-2 rounded"
              style={{ userSelect: "none" }}
            >
              このテキストは選択できません
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div
              className="bg-white p-2 rounded font-mono"
              style={{ userSelect: "all" }}
            >
              クリックで全選択: console.log('hello');
            </div>
          </div>
        ),
        2: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
              style={{ userSelect: "none" }}
            >
              ボタンテキスト選択防止
            </button>
          </div>
        ),
      },
      "pointer-events": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="relative">
              <div className="bg-blue-500 text-white p-2 rounded">背景要素</div>
              <div
                className="absolute inset-0 bg-red-500/20 rounded"
                style={{ pointerEvents: "none" }}
              >
                透明オーバーレイ（クリック不可）
              </div>
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div
              className="bg-gray-400 text-white px-4 py-2 rounded opacity-50"
              style={{ pointerEvents: "none" }}
            >
              無効化された要素
            </div>
          </div>
        ),
      },
      "will-change": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div
              className="bg-blue-500 text-white px-4 py-2 rounded transition-transform duration-300 hover:scale-110"
              style={{ willChange: "transform, opacity" }}
            >
              最適化されたアニメーション
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div
              className="bg-green-500 text-white px-4 py-2 rounded transition-transform duration-300 hover:scale-105"
              style={{ willChange: "transform" }}
            >
              ホバー時の最適化
            </div>
          </div>
        ),
        2: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div
              className="bg-purple-500 text-white px-4 py-2 rounded"
              style={{ willChange: "auto" }}
            >
              最適化解除済み
            </div>
          </div>
        ),
      },
      contain: {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div
              className="bg-white border p-2 rounded"
              style={{ contain: "layout style paint" }}
            >
              <div className="bg-blue-500 text-white p-2 rounded text-sm">
                ウィジェット（影響局所化）
              </div>
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div
              className="bg-white border p-2 rounded"
              style={{ contain: "layout" }}
            >
              <div className="bg-green-500 text-white p-2 rounded text-sm">
                レイアウト影響制限
              </div>
            </div>
          </div>
        ),
      },
      "content-visibility": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="space-y-2">
              <div
                className="bg-blue-500 text-white p-2 rounded text-sm"
                style={{
                  contentVisibility: "auto",
                  containIntrinsicSize: "100px",
                }}
              >
                自動最適化記事
              </div>
              <div className="text-xs text-gray-500">
                画面外でレンダリングスキップ
              </div>
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div
              className="bg-gray-500 text-white p-2 rounded text-sm"
              style={{ contentVisibility: "hidden" }}
            >
              レンダリングスキップ要素
            </div>
          </div>
        ),
      },
      "accent-color": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border flex items-center justify-center">
            <input
              type="checkbox"
              defaultChecked
              style={{ accentColor: "#f59e42", width: 32, height: 32 }}
            />
            <span className="ml-4 text-sm text-gray-700 dark:text-gray-200">
              accent-color: #f59e42;
            </span>
          </div>
        ),
      },
      "color-scheme": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div
              style={{ colorScheme: "light dark" }}
              className="bg-white dark:bg-gray-800 p-2 rounded border"
            >
              <div className="text-sm mb-2">ライト・ダークモード対応</div>
              <input
                type="text"
                placeholder="自動調整される入力欄"
                className="w-full p-1 border rounded"
              />
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div
              style={{ colorScheme: "light" }}
              className="bg-white p-2 rounded border"
            >
              <div className="text-sm">ライトモードのみ</div>
            </div>
          </div>
        ),
      },
      "prefers-color-scheme": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="bg-white dark:bg-gray-800 p-2 rounded border">
              <div className="text-gray-900 dark:text-gray-100 text-sm">
                システム設定に応じて自動切り替え
              </div>
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div
              style={
                {
                  "--bg-color": "#ffffff",
                  "--text-color": "#000000",
                } as React.CSSProperties
              }
              className="p-2 rounded border bg-white dark:bg-gray-800"
            >
              <div className="text-gray-900 dark:text-gray-100 text-sm">
                CSS変数でテーマ管理
              </div>
            </div>
          </div>
        ),
      },
      "prefers-reduced-motion": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="bg-blue-500 text-white px-4 py-2 rounded motion-safe:animate-pulse motion-reduce:animate-none">
              アクセシビリティ対応アニメーション
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <button className="bg-green-500 text-white px-4 py-2 rounded motion-safe:transition-transform motion-safe:hover:scale-105 motion-reduce:transition-none">
              条件付きアニメーション
            </button>
          </div>
        ),
      },
      "focus-visible": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <button className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none focus-visible:outline-2 focus-visible:outline-blue-400 focus-visible:outline-offset-2">
              キーボードフォーカス時のみアウトライン
            </button>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <input
              type="text"
              placeholder="フォーカススタイル"
              className="px-3 py-2 border rounded focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-200"
            />
          </div>
        ),
      },
      "logical-properties": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div
              className="bg-white border p-2 rounded"
              style={{
                marginInline: "auto",
                paddingBlock: "2rem",
                paddingInline: "1rem",
              }}
            >
              <div className="text-sm">書字方向対応レイアウト</div>
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="flex gap-4">
              <div
                className="bg-blue-500 text-white p-2 rounded text-sm"
                style={{
                  borderInlineEnd: "1px solid #ccc",
                  marginInlineEnd: "2rem",
                }}
              >
                サイドバー
              </div>
              <div className="bg-green-500 text-white p-2 rounded text-sm flex-1">
                メインコンテンツ
              </div>
            </div>
          </div>
        ),
      },
      inset: {
        0: (
          <div
            className="bg-gray-100 dark:bg-gray-700 p-4 rounded border relative"
            style={{ width: 220, height: 120 }}
          >
            <div
              className="absolute bg-blue-500/20 rounded flex items-center justify-center text-sm"
              style={{ inset: 0 }}
            >
              <div className="bg-blue-500 text-white rounded px-3 py-1">
                inset: 0
              </div>
            </div>
            <div className="absolute top-2 left-2 text-xs text-gray-500">
              親要素
            </div>
          </div>
        ),
        1: (
          <div
            className="bg-gray-100 dark:bg-gray-700 p-4 rounded border relative"
            style={{ width: 220, height: 120 }}
          >
            <div
              className="absolute bg-green-500/20 rounded flex items-center justify-center text-sm"
              style={{ inset: "16px" }}
            >
              <div className="bg-green-500 text-white rounded px-3 py-1">
                inset: 16px
              </div>
            </div>
            <div className="absolute top-2 left-2 text-xs text-gray-500">
              親要素
            </div>
          </div>
        ),
        2: (
          <div
            className="bg-gray-100 dark:bg-gray-700 p-4 rounded border relative"
            style={{ width: 220, height: 120 }}
          >
            <div
              className="absolute bg-purple-500/20 rounded flex items-center justify-center text-sm"
              style={{ inset: "10px 20px" }}
            >
              <div className="bg-purple-500 text-white rounded px-3 py-1">
                inset: 10px 20px
              </div>
            </div>
            <div className="absolute top-2 left-2 text-xs text-gray-500">
              親要素
            </div>
          </div>
        ),
      },
      ":nth-child": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <ul className="flex gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <li
                  key={i}
                  className={
                    `px-3 py-2 rounded text-sm font-semibold ` +
                    (i % 2 === 0
                      ? "bg-blue-500 text-white"
                      : "bg-green-200 text-green-900 dark:bg-green-600 dark:text-white")
                  }
                  style={{ minWidth: 40, textAlign: "center" }}
                >
                  {i + 1}
                </li>
              ))}
            </ul>
            <div className="text-xs text-gray-500 mt-2">
              <span className="font-mono">li:nth-child(odd)</span>：青色、
              <span className="font-mono">li:nth-child(even)</span>：緑色
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <ul className="divide-y divide-gray-300 dark:divide-gray-600">
              {Array.from({ length: 6 }).map((_, i) => (
                <li
                  key={i}
                  className={
                    `px-4 py-2 text-sm ` +
                    (i % 2 === 0
                      ? "bg-blue-50 dark:bg-blue-900/40"
                      : "bg-green-50 dark:bg-green-900/40")
                  }
                >
                  行 {i + 1}
                </li>
              ))}
            </ul>
            <div className="text-xs text-gray-500 mt-2">
              <span className="font-mono">li:nth-child(odd)</span>：青背景、
              <span className="font-mono">li:nth-child(even)</span>：緑背景
            </div>
          </div>
        ),
      },
      min: {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div
              style={{
                width: "min(100%, 180px)",
                background: "#3b82f6",
                color: "white",
                padding: "8px",
                borderRadius: "6px",
                textAlign: "center",
              }}
            >
              min(100%, 180px) の幅
            </div>
            <div className="text-xs text-gray-500 mt-2">
              ウィンドウ幅が180px以上なら180px、未満なら100%
            </div>
          </div>
        ),
      },
      max: {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div
              style={{
                fontSize: "max(1rem, 2vw)",
                background: "#8b5cf6",
                color: "white",
                padding: "8px",
                borderRadius: "6px",
                textAlign: "center",
              }}
            >
              max(1rem, 2vw) のフォントサイズ
            </div>
            <div className="text-xs text-gray-500 mt-2">
              ウィンドウ幅が広いほど文字が大きくなります
            </div>
          </div>
        ),
      },
      calc: {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div
              style={{
                width: "calc(100% - 2rem)",
                background: "#10b981",
                color: "white",
                padding: "8px",
                borderRadius: "6px",
                textAlign: "center",
              }}
            >
              calc(100% - 2rem) の幅
            </div>
            <div className="text-xs text-gray-500 mt-2">
              親要素の幅から2rem引いた幅になります
            </div>
          </div>
        ),
      },
      width: {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border flex flex-col items-center">
            <div
              style={{
                width: 120,
                background: "#3b82f6",
                color: "white",
                padding: "8px",
                borderRadius: "6px",
                textAlign: "center",
              }}
            >
              width: 120px
            </div>
            <div className="text-xs text-gray-500 mt-2">固定幅（120px）</div>
          </div>
        ),
        1: (
          <div
            className="bg-gray-100 dark:bg-gray-700 p-4 rounded border flex flex-col items-center"
            style={{ width: 240 }}
          >
            <div
              style={{
                width: "50%",
                background: "#8b5cf6",
                color: "white",
                padding: "8px",
                borderRadius: "6px",
                textAlign: "center",
              }}
            >
              width: 50%
            </div>
            <div className="text-xs text-gray-500 mt-2">
              親要素の50%（親要素幅240px）
            </div>
          </div>
        ),
      },
      height: {
        0: (
          <div
            className="bg-gray-100 dark:bg-gray-700 p-4 rounded border flex flex-col items-center"
            style={{ height: 120 }}
          >
            <div
              style={{
                height: 60,
                background: "#10b981",
                color: "white",
                padding: "8px",
                borderRadius: "6px",
                textAlign: "center",
                width: 80,
              }}
            >
              height: 60px
            </div>
            <div className="text-xs text-gray-500 mt-2">固定高さ（60px）</div>
          </div>
        ),
        1: (
          <div
            className="bg-gray-100 dark:bg-gray-700 p-4 rounded border flex flex-col items-center"
            style={{ minHeight: 40 }}
          >
            <div
              style={{
                height: "auto",
                background: "#f59e42",
                color: "white",
                padding: "8px",
                borderRadius: "6px",
                textAlign: "center",
                width: 80,
              }}
            >
              height: auto（内容に応じて高さ可変）
              <br />
              テキストが増えると高さも増えます。
            </div>
            <div className="text-xs text-gray-500 mt-2">
              height: auto（デフォルト値、内容に応じて高さが決まる）
            </div>
          </div>
        ),
      },
      "max-width": {
        0: (
          <div
            className="bg-gray-100 dark:bg-gray-700 p-4 rounded border flex flex-col items-center"
            style={{ width: 300 }}
          >
            <div
              style={{
                maxWidth: 120,
                background: "#f43f5e",
                color: "white",
                padding: "8px",
                borderRadius: "6px",
                textAlign: "center",
                width: "100%",
              }}
            >
              max-width: 120px
            </div>
            <div className="text-xs text-gray-500 mt-2">
              最大幅120px（親要素幅300px）
            </div>
          </div>
        ),
        1: (
          <div
            className="bg-gray-100 dark:bg-gray-700 p-4 rounded border flex flex-col items-center"
            style={{ width: 300 }}
          >
            <div
              style={{
                maxWidth: "100%",
                background: "#3b82f6",
                color: "white",
                padding: "8px",
                borderRadius: "6px",
                textAlign: "center",
                width: 400,
              }}
            >
              max-width: 100%
              <br />
              width: 400px
            </div>
            <div className="text-xs text-gray-500 mt-2">
              親要素幅300pxを超えない（width:400pxでもmax-width:100%で制限）
            </div>
          </div>
        ),
      },
      "min-width": {
        0: (
          <div
            className="bg-gray-100 dark:bg-gray-700 p-4 rounded border flex flex-col items-center"
            style={{ width: 200 }}
          >
            <div
              style={{
                minWidth: 120,
                background: "#f59e42",
                color: "white",
                padding: "8px",
                borderRadius: "6px",
                textAlign: "center",
                width: "50%",
              }}
            >
              min-width: 120px
            </div>
            <div className="text-xs text-gray-500 mt-2">
              最小幅120px（親要素幅200px、width:50%指定）
            </div>
          </div>
        ),
        1: (
          <div
            className="bg-gray-100 dark:bg-gray-700 p-4 rounded border flex flex-col items-center"
            style={{ width: 200 }}
          >
            <div
              style={{
                minWidth: "50%",
                background: "#3b82f6",
                color: "white",
                padding: "8px",
                borderRadius: "6px",
                textAlign: "center",
                width: 20,
              }}
            >
              min-width: 50%
              <br />
              width: 20px
            </div>
            <div className="text-xs text-gray-500 mt-2">
              親要素幅200px・width:20pxでもmin-width:50%で100pxに保たれる
            </div>
          </div>
        ),
      },
      "list-style": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border flex items-center justify-center">
            <ul style={{ listStyle: "square inside" }} className="pl-4">
              <li>四角いマーカー</li>
              <li>内側表示</li>
            </ul>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border flex items-center justify-center">
            <ul style={{ listStyle: "none" }} className="pl-4">
              <li>マーカーなし</li>
              <li>テキストのみ</li>
            </ul>
          </div>
        ),
      },
      "clip-path": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border flex items-center justify-center">
            <div
              className="w-16 h-16 bg-blue-500"
              style={{ clipPath: "circle(50% at 50% 50%)" }}
            />
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border flex items-center justify-center">
            <div
              className="w-16 h-16 bg-green-500"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }}
            />
          </div>
        ),
      },
      "letter-spacing": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="text-lg" style={{ letterSpacing: "0.1em" }}>
              CSS Dictionary サンプルテキスト
            </div>
            <div className="text-xs text-gray-500 mt-2">
              letter-spacing: 0.1em
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="text-lg" style={{ letterSpacing: "-1px" }}>
              CSS Dictionary サンプルテキスト
            </div>
            <div className="text-xs text-gray-500 mt-2">
              letter-spacing: -1px
            </div>
          </div>
        ),
      },
      "pseudo-nth-child": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <ul className="divide-y divide-gray-200">
              {[...Array(6)].map((_, i) => (
                <li
                  key={i}
                  className={
                    (i % 2 === 1 ? "bg-blue-100 dark:bg-blue-900" : "") +
                    " px-4 py-2"
                  }
                >
                  リストアイテム {i + 1}
                </li>
              ))}
            </ul>
            <div className="text-xs text-gray-500 mt-2">
              li:nth-child(2n) &#x2192; 偶数行に背景色
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="grid grid-cols-3 gap-2">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className={
                    (i % 3 === 0
                      ? "border-l-4 border-blue-500"
                      : "border-l border-gray-300") +
                    " bg-white dark:bg-gray-800 p-2 rounded text-center"
                  }
                >
                  {i + 1}
                </div>
              ))}
            </div>
            <div className="text-xs text-gray-500 mt-2">
              .grid-item:nth-child(3n+1) &#x2192; 3の倍数+1番目に左枠線
            </div>
          </div>
        ),
      },
      "pseudo-hover": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border flex items-center justify-center">
            <button className="transition-colors px-6 py-2 rounded bg-blue-100 text-blue-800 hover:bg-blue-500 hover:text-white font-semibold shadow">
              ホバーしてみてください
            </button>
            <div className="text-xs text-gray-500 mt-4 ml-4">
              .btn:hover &#x2192; 背景・文字色変化
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border flex items-center justify-center">
            <span className="text-lg text-blue-700 hover:underline cursor-pointer transition-all">
              ホバーで下線が表示されます
            </span>
            <div className="text-xs text-gray-500 mt-4 ml-4">
              .text:hover &#x2192; 下線表示
            </div>
          </div>
        ),
      },
      "pseudo-first-child": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <ul className="divide-y divide-gray-200 dark:divide-gray-600">
              {[...Array(5)].map((_, i) => (
                <li
                  key={i}
                  className={
                    (i === 0
                      ? "border-t-2 border-blue-500 font-bold text-blue-800 dark:text-blue-300"
                      : "text-gray-700 dark:text-gray-300") + " px-4 py-2"
                  }
                >
                  リストアイテム {i + 1} {i === 0 && "← 最初の要素"}
                </li>
              ))}
            </ul>
            <div className="text-xs text-gray-500 mt-2">
              li:first-child → 最初の項目に上枠線と太字
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="flex gap-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={
                    (i === 0 ? "ml-0" : "ml-4") +
                    " bg-white dark:bg-gray-800 p-3 rounded shadow border"
                  }
                >
                  <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    カード {i + 1}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {i === 0 ? "左マージン: 0" : "左マージン: 1rem"}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-xs text-gray-500 mt-2">
              .card:first-child → 最初のカードの左マージンを削除
            </div>
          </div>
        ),
        2: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="bg-white dark:bg-gray-800 p-4 rounded border">
              <div className="space-y-3">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  p:first-child → 最初の段落の上マージンを削除
                </div>
                <p className="text-sm text-gray-800 dark:text-gray-200 mt-0">
                  最初の段落です。上マージンが削除されています。
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                  2番目の段落です。通常の上マージンがあります。
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                  3番目の段落です。通常の上マージンがあります。
                </p>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              コンテナ内の最初の段落の上マージンを削除してレイアウト調整
            </div>
          </div>
        ),
        3: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="bg-white dark:bg-gray-800 rounded overflow-hidden shadow">
              <div className="flex">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={
                      (i === 0
                        ? "rounded-l-lg"
                        : i === 3
                        ? "rounded-r-lg"
                        : "") +
                      " bg-blue-500 text-white px-4 py-2 text-sm font-medium"
                    }
                  >
                    ナビ {i + 1}
                  </div>
                ))}
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              .nav-item:first-child → 最初のナビゲーションアイテムに左側の角丸
            </div>
          </div>
        ),
      },
      "pseudo-nth-of-type": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                h2:nth-of-type(2n) → 偶数番目のh2要素が青色
              </div>
              <h1 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                見出し1 (h1)
              </h1>
              <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200">
                見出し2-1 (h2) ← 1番目
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                段落1 (p)
              </p>
              <h2 className="text-base font-semibold text-blue-600 dark:text-blue-400">
                見出し2-2 (h2) ← 2番目 (偶数)
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                段落2 (p)
              </p>
              <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200">
                見出し2-3 (h2) ← 3番目
              </h2>
              <h2 className="text-base font-semibold text-blue-600 dark:text-blue-400">
                見出し2-4 (h2) ← 4番目 (偶数)
              </h2>
            </div>
            <div className="text-xs text-gray-500 mt-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
              💡 h2要素のみをカウント。他の要素(h1, p)は無視される
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                p:nth-of-type(1) → 最初のp要素を太字＋上マージン削除
              </div>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                記事タイトル (h2)
              </h2>
              <p className="text-sm text-gray-800 dark:text-gray-200 font-bold">
                最初の段落です (p:nth-of-type(1)) ← 太字・上マージン0
              </p>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                画像 (img)
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                2番目の段落です (p:nth-of-type(2)) ← 通常スタイル
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                3番目の段落です (p:nth-of-type(3)) ← 通常スタイル
              </p>
            </div>
            <div className="text-xs text-gray-500 mt-3 p-2 bg-orange-50 dark:bg-orange-900/20 rounded">
              💡 p要素のみをカウント。h2やimgは除外される
            </div>
          </div>
        ),
        2: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                img:nth-of-type(3n) → 3の倍数番目の画像に枠線
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-gray-300 dark:bg-gray-600 h-16 rounded flex items-center justify-center text-xs">
                  img 1
                </div>
                <div className="bg-gray-300 dark:bg-gray-600 h-16 rounded flex items-center justify-center text-xs">
                  img 2
                </div>
                <div className="bg-gray-300 dark:bg-gray-600 h-16 rounded flex items-center justify-center text-xs border-2 border-orange-500">
                  img 3 ← 枠線
                </div>
                <div className="bg-gray-300 dark:bg-gray-600 h-16 rounded flex items-center justify-center text-xs">
                  img 4
                </div>
                <div className="bg-gray-300 dark:bg-gray-600 h-16 rounded flex items-center justify-center text-xs">
                  img 5
                </div>
                <div className="bg-gray-300 dark:bg-gray-600 h-16 rounded flex items-center justify-center text-xs border-2 border-orange-500">
                  img 6 ← 枠線
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-3 p-2 bg-green-50 dark:bg-green-900/20 rounded">
              💡 3, 6, 9...番目のimg要素に枠線が適用される
            </div>
          </div>
        ),
        3: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                article:nth-of-type(odd) → 奇数番目のarticle要素に背景色
              </div>
              <div className="space-y-2">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded border">
                  <div className="font-medium text-sm">
                    記事1 (article:nth-of-type(1)) ← 奇数
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    背景色付き
                  </div>
                </div>
                <div className="p-3 border rounded">
                  <div className="font-medium text-sm text-gray-700 dark:text-gray-300">
                    記事2 (article:nth-of-type(2))
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    通常背景
                  </div>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded border">
                  <div className="font-medium text-sm">
                    記事3 (article:nth-of-type(3)) ← 奇数
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    背景色付き
                  </div>
                </div>
                <div className="p-3 border rounded">
                  <div className="font-medium text-sm text-gray-700 dark:text-gray-300">
                    記事4 (article:nth-of-type(4))
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    通常背景
                  </div>
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-3 p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
              💡 odd = 奇数 (1, 3, 5...), even = 偶数 (2, 4, 6...)
            </div>
          </div>
        ),
      },
      "media-queries": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              @media (max-width: 768px) → モバイル対応
            </div>
            <div className="bg-white dark:bg-gray-800 rounded border overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-gray-600">
                <div className="text-xs text-gray-500 mb-2">
                  デスクトップ表示（768px超）
                </div>
                <div className="bg-blue-500 text-white p-4 rounded text-lg font-semibold">
                  Container
                </div>
              </div>
              <div className="p-2 bg-gray-50 dark:bg-gray-700">
                <div className="text-xs text-gray-500 mb-2">
                  モバイル表示（768px以下）
                </div>
                <div className="bg-blue-500 text-white p-2 rounded text-sm">
                  Container - 小さいパディング・フォント
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              画面幅に応じてパディングとフォントサイズが変化
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              @media (min-width: 769px) and (max-width: 1024px) → タブレット対応
            </div>
            <div className="bg-white dark:bg-gray-800 rounded border overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-gray-600">
                <div className="text-xs text-gray-500 mb-2">
                  デスクトップ（1025px以上）
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-green-500 text-white p-2 rounded text-xs text-center"
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700">
                <div className="text-xs text-gray-500 mb-2">
                  タブレット（769px〜1024px）
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-green-500 text-white p-2 rounded text-xs text-center"
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              タブレットでは2列、デスクトップでは4列のグリッド
            </div>
          </div>
        ),
        2: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              @media (min-width: 1025px) → デスクトップ対応
            </div>
            <div className="bg-white dark:bg-gray-800 rounded border overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-gray-600">
                <div className="text-xs text-gray-500 mb-2">
                  モバイル・タブレット（1024px以下）
                </div>
                <div className="bg-purple-500 text-white p-3 rounded">
                  <div className="text-sm font-medium">メインコンテンツ</div>
                  <div className="text-xs opacity-80">サイドバー非表示</div>
                </div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700">
                <div className="text-xs text-gray-500 mb-2">
                  デスクトップ（1025px以上）
                </div>
                <div className="flex gap-3">
                  <div className="w-16 bg-orange-500 text-white p-2 rounded text-xs">
                    <div className="font-medium">サイドバー</div>
                    <div className="text-xs opacity-80">表示</div>
                  </div>
                  <div className="flex-1 bg-purple-500 text-white p-3 rounded">
                    <div className="text-sm font-medium">メインコンテンツ</div>
                    <div className="text-xs opacity-80">左マージン付き</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              デスクトップでサイドバーが表示され、メインコンテンツに左マージンが付く
            </div>
          </div>
        ),
        3: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              @media (orientation: portrait/landscape) → デバイス向き対応
            </div>
            <div className="bg-white dark:bg-gray-800 rounded border overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-gray-600">
                <div className="text-xs text-gray-500 mb-2">
                  縦向き（Portrait）
                </div>
                <div
                  className="bg-teal-500 text-white rounded flex items-center justify-center"
                  style={{ height: "80px" }}
                >
                  <div className="text-center">
                    <div className="text-sm font-medium">Hero Section</div>
                    <div className="text-xs opacity-80">height: 50vh</div>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700">
                <div className="text-xs text-gray-500 mb-2">
                  横向き（Landscape）
                </div>
                <div
                  className="bg-teal-500 text-white rounded flex items-center justify-center"
                  style={{ height: "120px" }}
                >
                  <div className="text-center">
                    <div className="text-sm font-medium">Hero Section</div>
                    <div className="text-xs opacity-80">height: 100vh</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              デバイスの向きに応じてヒーローセクションの高さが変化
            </div>
          </div>
        ),
        4: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              @media print → 印刷対応
            </div>
            <div className="bg-white dark:bg-gray-800 rounded border overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-gray-600">
                <div className="text-xs text-gray-500 mb-2">画面表示</div>
                <div className="space-y-2">
                  <div className="bg-blue-500 text-white p-2 rounded text-sm">
                    重要なコンテンツ
                  </div>
                  <div className="bg-red-500 text-white p-2 rounded text-sm">
                    印刷不要な要素（広告など）
                  </div>
                  <div className="text-sm text-blue-600">カラーテキスト</div>
                </div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700">
                <div className="text-xs text-gray-500 mb-2">印刷時</div>
                <div className="space-y-2">
                  <div className="bg-white border border-gray-300 text-black p-2 rounded text-sm">
                    重要なコンテンツ
                  </div>
                  <div className="text-xs text-gray-400 italic">
                    [印刷不要な要素は非表示]
                  </div>
                  <div className="text-sm text-black">黒色テキスト (12pt)</div>
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              印刷時は不要な要素を非表示にし、フォントサイズと色を調整
            </div>
          </div>
        ),
        5: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              @media (prefers-color-scheme: dark) → ダークモード対応
            </div>
            <div className="bg-white dark:bg-gray-800 rounded border overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-gray-600">
                <div className="text-xs text-gray-500 mb-2">ライトモード</div>
                <div className="bg-white border border-gray-300 p-3 rounded">
                  <div className="text-black text-sm font-medium">
                    ページコンテンツ
                  </div>
                  <div className="text-gray-600 text-xs">
                    background: white, color: black
                  </div>
                </div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700">
                <div className="text-xs text-gray-500 mb-2">ダークモード</div>
                <div className="bg-gray-900 border border-gray-600 p-3 rounded">
                  <div className="text-white text-sm font-medium">
                    ページコンテンツ
                  </div>
                  <div className="text-gray-300 text-xs">
                    background: #1a1a1a, color: white
                  </div>
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              ユーザーのシステム設定に応じてダークモードを自動適用
            </div>
          </div>
        ),
      },
      "table-layout": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              table-layout: auto → セル内容に応じて幅を自動調整
            </div>
            <div className="bg-white dark:bg-gray-800 rounded border overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                      ID
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                      名前
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                      説明
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                  <tr>
                    <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
                      1
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
                      太郎
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
                      短い説明
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
                      2
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
                      花子
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
                      とても長い説明文がここに入ります。この列は内容に応じて幅が広くなります。
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
                      3
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
                      次郎
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
                      中程度の説明
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              内容の多い「説明」列が自動的に幅を広く取る
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              table-layout: fixed → 最初の行の幅設定に基づいて固定
            </div>
            <div className="bg-white dark:bg-gray-800 rounded border overflow-hidden">
              <table className="w-full table-fixed">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th
                      className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400"
                      style={{ width: "30%" }}
                    >
                      ID (30%)
                    </th>
                    <th
                      className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400"
                      style={{ width: "50%" }}
                    >
                      名前 (50%)
                    </th>
                    <th
                      className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400"
                      style={{ width: "20%" }}
                    >
                      説明 (20%)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                  <tr>
                    <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
                      1
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
                      太郎
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100 truncate">
                      短い説明
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
                      2
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
                      花子
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100 truncate">
                      とても長い説明文...
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
                      3
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
                      次郎
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100 truncate">
                      中程度の説明
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              指定した幅比率（30%:50%:20%）が固定される
            </div>
          </div>
        ),
        2: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              大量データテーブルでのパフォーマンス最適化
            </div>
            <div className="bg-white dark:bg-gray-800 rounded border overflow-hidden">
              <table className="w-full table-fixed">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th
                      className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400"
                      style={{ width: "10%" }}
                    >
                      ID
                    </th>
                    <th
                      className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400"
                      style={{ width: "40%" }}
                    >
                      名前
                    </th>
                    <th
                      className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400"
                      style={{ width: "35%" }}
                    >
                      メール
                    </th>
                    <th
                      className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400"
                      style={{ width: "15%" }}
                    >
                      状態
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                  {[...Array(5)].map((_, i) => (
                    <tr key={i}>
                      <td className="px-2 py-1 text-xs text-gray-900 dark:text-gray-100">
                        {i + 1}
                      </td>
                      <td className="px-2 py-1 text-xs text-gray-900 dark:text-gray-100 truncate">
                        ユーザー{i + 1}
                      </td>
                      <td className="px-2 py-1 text-xs text-gray-900 dark:text-gray-100 truncate">
                        user{i + 1}@example.com
                      </td>
                      <td className="px-2 py-1 text-xs">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            i % 2 === 0
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                          }`}
                        >
                          {i % 2 === 0 ? "有効" : "保留"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              固定レイアウトにより高速描画。列幅が予測可能で大量データに適している
            </div>
          </div>
        ),
        3: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              レスポンシブデザインでの使い分け
            </div>
            <div className="space-y-3">
              <div className="bg-white dark:bg-gray-800 rounded border overflow-hidden">
                <div className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-xs text-blue-700 dark:text-blue-300">
                  デスクトップ: table-layout: fixed
                </div>
                <table className="w-full table-fixed">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th
                        className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400"
                        style={{ width: "25%" }}
                      >
                        項目
                      </th>
                      <th
                        className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400"
                        style={{ width: "25%" }}
                      >
                        値1
                      </th>
                      <th
                        className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400"
                        style={{ width: "25%" }}
                      >
                        値2
                      </th>
                      <th
                        className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400"
                        style={{ width: "25%" }}
                      >
                        値3
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                    <tr>
                      <td className="px-3 py-2 text-xs text-gray-900 dark:text-gray-100">
                        売上
                      </td>
                      <td className="px-3 py-2 text-xs text-gray-900 dark:text-gray-100">
                        ¥100,000
                      </td>
                      <td className="px-3 py-2 text-xs text-gray-900 dark:text-gray-100">
                        ¥150,000
                      </td>
                      <td className="px-3 py-2 text-xs text-gray-900 dark:text-gray-100">
                        ¥200,000
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded border overflow-hidden">
                <div className="px-4 py-2 bg-orange-50 dark:bg-orange-900/20 text-xs text-orange-700 dark:text-orange-300">
                  モバイル: table-layout: auto（内容に応じて調整）
                </div>
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                        項目
                      </th>
                      <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                        値
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                    <tr>
                      <td className="px-2 py-2 text-xs text-gray-900 dark:text-gray-100">
                        売上
                      </td>
                      <td className="px-2 py-2 text-xs text-gray-900 dark:text-gray-100">
                        ¥100,000
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              画面サイズに応じてテーブルレイアウトを切り替え
            </div>
          </div>
        ),
        4: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              均等幅カラムでの整然としたレイアウト
            </div>
            <div className="bg-white dark:bg-gray-800 rounded border overflow-hidden">
              <table className="w-full table-fixed border-collapse">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-gray-600"
                      style={{ width: "25%" }}
                    >
                      Q1
                    </th>
                    <th
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-gray-600"
                      style={{ width: "25%" }}
                    >
                      Q2
                    </th>
                    <th
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-gray-600"
                      style={{ width: "25%" }}
                    >
                      Q3
                    </th>
                    <th
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-gray-600"
                      style={{ width: "25%" }}
                    >
                      Q4
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600">
                      ¥1,200,000
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600">
                      ¥1,450,000
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600">
                      ¥1,350,000
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600">
                      ¥1,600,000
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600">
                      ¥1,100,000
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600">
                      ¥1,250,000
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600">
                      ¥1,400,000
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600">
                      ¥1,500,000
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              各列が均等幅（25%ずつ）で整然とした表形式のレイアウト
            </div>
          </div>
        ),
      },
      "writing-mode": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              writing-mode: vertical-rl → 縦書き（右から左）
            </div>
            <div className="bg-white dark:bg-gray-800 rounded border p-4 flex justify-center">
              <div
                className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 p-4 text-gray-900 dark:text-gray-100"
                style={{
                  writingMode: "vertical-rl",
                  height: "200px",
                  width: "120px",
                  fontSize: "16px",
                  lineHeight: "1.8",
                }}
              >
                日本語の伝統的な縦書きです。右から左に文字が流れます。
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              日本語の伝統的な書字方向。小説や新聞などで使用される
            </div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              writing-mode: vertical-lr → 縦書き（左から右）
            </div>
            <div className="bg-white dark:bg-gray-800 rounded border p-4 flex justify-center">
              <div
                className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 p-4 text-gray-900 dark:text-gray-100"
                style={{
                  writingMode: "vertical-lr",
                  height: "200px",
                  width: "120px",
                  fontSize: "16px",
                  lineHeight: "1.8",
                }}
              >
                縦書きですが左から右に文字が流れます。モンゴル語などで使用。
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              モンゴル語やマンチュ語などで使用される書字方向
            </div>
          </div>
        ),
        2: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              writing-mode: horizontal-tb → 横書き（上から下）
            </div>
            <div className="bg-white dark:bg-gray-800 rounded border p-4">
              <div
                className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 p-4 text-gray-900 dark:text-gray-100"
                style={{
                  writingMode: "horizontal-tb",
                  fontSize: "16px",
                  lineHeight: "1.6",
                }}
              >
                これは通常の横書きテキストです。左から右に文字が流れ、行は上から下に進みます。これがデフォルトの書字方向です。
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              デフォルトの書字方向。ほとんどの言語で使用される
            </div>
          </div>
        ),
        3: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              サイドバーの縦書きタイトル
            </div>
            <div className="bg-white dark:bg-gray-800 rounded border p-4">
              <div className="flex gap-4">
                <div
                  className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 p-3 text-gray-900 dark:text-gray-100 font-medium"
                  style={{
                    writingMode: "vertical-rl",
                    height: "150px",
                    width: "50px",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  サイドバー
                </div>
                <div className="flex-1 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 p-4 text-gray-900 dark:text-gray-100">
                  <h3 className="font-bold mb-2">メインコンテンツ</h3>
                  <p className="text-sm">
                    サイドバーに縦書きのタイトルを配置したレイアウト例です。
                    Webデザインでのアクセントとして効果的に使用できます。
                  </p>
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Webデザインでのアクセント要素として縦書きを活用
            </div>
          </div>
        ),
        4: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              本の背表紙のような縦書きデザイン
            </div>
            <div className="bg-white dark:bg-gray-800 rounded border p-4 flex justify-center">
              <div className="flex gap-2">
                {["CSS辞書", "Web技術", "デザイン"].map((title, index) => (
                  <div
                    key={index}
                    className="bg-gray-800 dark:bg-gray-600 text-white border border-gray-600 dark:border-gray-500"
                    style={{
                      writingMode: "vertical-rl",
                      height: "180px",
                      width: "35px",
                      fontSize: "13px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {title}
                  </div>
                ))}
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              本棚の背表紙のようなデザイン効果。ナビゲーションやタブとしても活用可能
            </div>
          </div>
        ),
      },
    };

    return examples[propertyId]?.[exampleIndex] || null;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-40 px-4 py-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            戻る
          </button>
          <button
            onClick={() => onToggleFavorite(property.id)}
            className={`p-2 rounded-full transition-colors ${
              isFavorite
                ? "text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                : "text-gray-400 hover:text-red-500 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
          >
            <Heart className={`w-6 h-6 ${isFavorite ? "fill-current" : ""}`} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Title and Category */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {property.name}
            </h1>
            <span className="px-3 py-1 text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full">
              {property.category}
            </span>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            {property.description}
          </p>
        </div>

        {/* Syntax */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            構文
          </h2>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Syntax
              </span>
              <button
                onClick={() => copyToClipboard(property.syntax)}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                title="コピー"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <code className="text-gray-800 dark:text-gray-200 font-mono text-sm">
              {property.syntax}
            </code>
          </div>
        </section>

        {/* Examples */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            コード例
          </h2>
          <div className="space-y-6">
            {property.examples.map((example, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">
                    例 {index + 1}
                  </h3>
                  <button
                    onClick={() => copyToClipboard(example.code)}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                    title="コピー"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>

                {/* Code */}
                <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-4 mb-4 font-mono text-sm border">
                  <code className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                    {example.code}
                  </code>
                </div>

                {/* Visual Result */}
                {getVisualExample(property.id, index) && (
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Eye className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        実行結果
                      </span>
                    </div>
                    {getVisualExample(property.id, index)}
                  </div>
                )}

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {example.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Tips */}
        {property.tips && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              💡 TIPS
            </h2>
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <p className="text-green-800 dark:text-green-300">
                {property.tips}
              </p>
            </div>
          </section>
        )}

        {/* Common Mistakes */}
        {property.commonMistakes && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              ⚠️ よくある間違い
            </h2>
            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
              <p className="text-orange-800 dark:text-orange-300">
                {property.commonMistakes}
              </p>
            </div>
          </section>
        )}

        {/* Related Properties */}
        {property.relatedProperties.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              関連プロパティ
            </h2>
            <div className="flex flex-wrap gap-2">
              {property.relatedProperties.map((relatedId) => (
                <button
                  key={relatedId}
                  onClick={() => onNavigateToProperty(relatedId)}
                  className="inline-flex items-center gap-1 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                           rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  {relatedId}
                  <ExternalLink className="w-3 h-3" />
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Browser Support */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            ブラウザサポート
          </h2>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <p className="text-blue-800 dark:text-blue-300">
              {property.browserSupport}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
