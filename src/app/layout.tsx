import type { Metadata } from "next";
import { Shippori_Mincho, Zen_Kaku_Gothic_New, IBM_Plex_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import "./globals.css";

// 見出し: しっぽり明朝（辞書らしい端正な明朝体）
const mincho = Shippori_Mincho({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  preload: false,
  display: "swap",
  variable: "--font-mincho",
});

// 本文: Zen角ゴシックNew（すっきりした現代的ゴシック）
const gothic = Zen_Kaku_Gothic_New({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  preload: false,
  display: "swap",
  variable: "--font-gothic",
});

// コード: IBM Plex Mono
const mono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "CSS辞書 - CSSプロパティ完全ガイド",
  description: "すべてのCSSプロパティを日本語で解説。実用的なサンプルコード、逆引き検索、最新テクニック集を収録。初心者から上級者まで使えるCSS学習の決定版ツール。",
  keywords: ["CSS", "辞書", "プロパティ", "日本語", "学習", "フロントエンド", "Web開発"],
  authors: [{ name: "CSS辞書" }],
  creator: "CSS辞書",
  publisher: "CSS辞書",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.css-dictionary.com'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/css_dictionary_icon_192x192.png',
  },
  openGraph: {
    title: "CSS辞書 - CSSプロパティ完全ガイド",
    description: "すべてのCSSプロパティを日本語で解説。実用的なサンプルコード、逆引き検索、最新テクニック集を収録。",
    url: 'https://www.css-dictionary.com',
    siteName: 'CSS辞書',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: '/css_dictionary_icon_512x512.png',
        width: 512,
        height: 512,
        alt: 'CSS辞書アイコン',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "CSS辞書 - CSSプロパティ完全ガイド",
    description: "すべてのCSSプロパティを日本語で解説。実用的なサンプルコード、逆引き検索、最新テクニック集を収録。",
    images: ['/css_dictionary_icon_512x512.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'ZCastaObRG6NadrWmow1BDCi1Y9XzIztalUTr8NRIoc',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // ダークモードのフラッシュ防止（描画前にテーマを適用）
              (function () {
                try {
                  var stored = localStorage.getItem('css-dictionary-theme');
                  var theme = stored ? JSON.parse(stored) : null;
                  var dark = theme === 'dark' ||
                    (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  if (dark) document.documentElement.classList.add('dark');
                } catch (e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "CSS辞書",
              "url": "https://www.css-dictionary.com",
              "description": "すべてのCSSプロパティを日本語で解説。実用的なサンプルコード、逆引き検索、最新テクニック集を収録。",
              "applicationCategory": "EducationalApplication",
              "operatingSystem": "Any",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "JPY"
              },
              "author": {
                "@type": "Organization",
                "name": "CSS辞書"
              },
              "inLanguage": "ja"
            })
          }}
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-5JHPBNY2J3"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-5JHPBNY2J3');
            `,
          }}
        />
      </head>
      <body
        className={`${gothic.variable} ${mincho.variable} ${mono.variable} font-sans`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}