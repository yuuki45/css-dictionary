/** @type {import('tailwindcss').Config} */

// 「モダンな紙の辞書」デザイントークン
// ライト: クリーム紙×墨×朱 / ダーク: 漆黒×金茶
// 既存コンポーネントの gray/blue/green/orange/purple/red クラスが
// そのまま和紙トーンに乗るよう、標準パレットを上書きしている。

const ink = {
  // 温かみのある墨のグレースケール（紙〜漆黒）
  50: '#f7f2e7',   // 紙（ページ背景）
  100: '#efe8d8',  // 淡い塗り
  200: '#e2d8c2',  // 罫線
  300: '#cec2a8',  // 強い罫線
  400: '#9d9077',  // 淡色アイコン
  500: '#7d7159',  // 補助テキスト
  600: '#5d5344',  // 二次テキスト
  700: '#453d31',  // 強めテキスト/ダーク罫線
  800: '#242019',  // ダークの紙（カード）
  900: '#1a1712',  // 漆黒（ダーク背景）/ ライトの墨文字
  950: '#12100c',
};

const ai = {
  // 藍（リンク・情報）
  50: '#eef2f6',
  100: '#dde5ee',
  200: '#c2d0e2',
  300: '#9db4d0',
  400: '#7291b8',
  500: '#51749f',
  600: '#3c5c88',
  700: '#31496d',
  800: '#2a3c58',
  900: '#243147',
};

const shu = {
  // 朱（アクセント）
  50: '#f9ece6',
  100: '#f2d7cb',
  200: '#e6b3a0',
  300: '#d98a71',
  400: '#cd654a',
  500: '#c2452f',
  600: '#a83a27',
  700: '#8a2f20',
  800: '#6d261a',
  900: '#571f16',
};

const kohaku = {
  // 琥珀（注意・limited）
  50: '#f9f1e4',
  100: '#f1e0c5',
  200: '#e4c795',
  300: '#d3a75f',
  400: '#c08f3d',
  500: '#a97a2f',
  600: '#8c6427',
  700: '#705021',
  800: '#593f1c',
  900: '#483318',
};

const matsuba = {
  // 松葉（成功・widely）
  50: '#eef4ee',
  100: '#dce8dd',
  200: '#bdd3bf',
  300: '#93b89b',
  400: '#6f9c7a',
  500: '#527f5e',
  600: '#41684c',
  700: '#35533e',
  800: '#2b4233',
  900: '#233629',
};

const murasaki = {
  // 江戸紫（AI関連）
  50: '#f2eef6',
  100: '#e3dcec',
  200: '#c9bcd9',
  300: '#a996c2',
  400: '#8b73aa',
  500: '#715792',
  600: '#5c4679',
  700: '#4a3961',
  800: '#3b2e4e',
  900: '#302640',
};

const hi = {
  // 緋（エラー・お気に入り）
  50: '#fbeceb',
  100: '#f5d6d3',
  200: '#e9aca6',
  300: '#db7f76',
  400: '#cd584d',
  500: '#bd3a2e',
  600: '#a03024',
  700: '#83281e',
  800: '#672018',
  900: '#521a14',
};

module.exports = {
  // src全体をスキャンする（utils/のカテゴリ色クラス等もパージ対象に含めるため）
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        white: '#fdfaf3',       // 紙白（カード面）
        gray: ink,
        blue: ai,
        primary: ai,
        green: matsuba,
        orange: kohaku,
        amber: kohaku,
        purple: murasaki,
        red: hi,
        vermillion: shu,
        gold: {
          // 金茶（ダークのアクセント）
          50: '#f8f1e2',
          100: '#efe2c6',
          200: '#e2cd9e',
          300: '#d0b271',
          400: '#bd9a4e',
          500: '#a98338',
          600: '#8f6c2e',
          700: '#735626',
          800: '#5b441f',
          900: '#4a3719',
        },
      },
      fontFamily: {
        sans: ['var(--font-gothic)', 'sans-serif'],
        serif: ['var(--font-mincho)', 'serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'fade-up': 'fadeUp 0.5s ease-out both',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeUp: {
          '0%': { transform: 'translateY(12px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
