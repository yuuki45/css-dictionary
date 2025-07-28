import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        <meta name="version" content="0.1.1" />
        <meta name="build-time" content={Date.now().toString()} />
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
      <body className={inter.className}>{children}</body>
    </html>
  );
}