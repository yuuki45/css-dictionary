'use client';

import React, { useState } from 'react';
import { FlaskConical, ChevronUp } from 'lucide-react';
import { Playground } from '@/components/Playground';
import { useAnalytics } from '@/hooks/useAnalytics';

interface ExamplePlaygroundProps {
  propertyId: string;
  code: string;
}

// 例のコードをプレイグラウンド用CSSに整える。
// セレクタを持たない裸の宣言（例: "opacity: 0.5;"）は .demo でラップする。
function seedCss(code: string): string {
  return code.includes('{') ? code : `.demo {\n  ${code}\n}`;
}

// CSSの最初のクラスセレクタに合わせた最低限のHTMLを用意する。
// あくまで編集の出発点で、コード例に合わせてユーザーが書き換える前提。
function seedHtml(css: string): string {
  const match = css.match(/\.([a-zA-Z][\w-]*)/);
  const className = match ? match[1] : 'demo';
  return [
    `<div class="${className}">`,
    '  <div>アイテム 1</div>',
    '  <div>アイテム 2</div>',
    '  <div>アイテム 3</div>',
    '</div>',
  ].join('\n');
}

/**
 * コード例ごとの「編集して試す」トグル。
 * 開いた時に初めてPlaygroundをマウントし（遅延）、一度開いたら編集内容を保持する。
 */
export function ExamplePlayground({ propertyId, code }: ExamplePlaygroundProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const analytics = useAnalytics();

  const handleToggle = () => {
    if (!open && !mounted) {
      setMounted(true);
      analytics.trackEvent('example_playground_open', { property_id: propertyId });
    }
    setOpen(!open);
  };

  const css = seedCss(code);

  return (
    <div className="mt-4">
      <button
        onClick={handleToggle}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium border transition-colors ${
          open
            ? 'border-vermillion-400 dark:border-gold-500 text-vermillion-600 dark:text-gold-300 bg-vermillion-50 dark:bg-gold-900/20'
            : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-vermillion-400 hover:text-vermillion-600 dark:hover:border-gold-500 dark:hover:text-gold-300'
        }`}
      >
        {open ? <ChevronUp className="w-4 h-4" /> : <FlaskConical className="w-4 h-4" />}
        {open ? 'プレイグラウンドを閉じる' : 'このコードを編集して試す'}
      </button>
      {mounted && (
        <div className="mt-3" hidden={!open}>
          <Playground initialHtml={seedHtml(css)} initialCss={css} />
        </div>
      )}
    </div>
  );
}
