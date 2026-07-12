'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Copy, CheckCircle, RotateCcw } from 'lucide-react';

interface PlaygroundProps {
  initialHtml: string;
  initialCss: string;
  /** コピー時に呼ばれる（アナリティクス用） */
  onCopy?: (type: 'html' | 'css') => void;
  /** 最初に編集された時に一度だけ呼ばれる（アナリティクス用） */
  onFirstEdit?: () => void;
}

// サンドボックスiframe用のドキュメントを組み立てる。
// sandbox=""（スクリプト実行なし）なので、ユーザー入力はこのiframe内に閉じる。
function buildSrcDoc(html: string, css: string): string {
  return [
    '<!doctype html><html><head><meta charset="utf-8">',
    '<style>body{margin:16px;background:#fdfaf3;color:#1a1712;font-family:-apple-system,BlinkMacSystemFont,"Hiragino Kaku Gothic ProN","Noto Sans JP",sans-serif;}</style>',
    `<style>${css}</style>`,
    '</head><body>',
    html,
    '</body></html>',
  ].join('\n');
}

interface EditorPaneProps {
  label: 'HTML' | 'CSS';
  value: string;
  onChange: (value: string) => void;
  onCopy: () => void;
  copied: boolean;
}

function EditorPane({ label, value, onChange, onCopy, copied }: EditorPaneProps) {
  // Tabキーでスペース2つを挿入（フォーカスを奪わない）
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== 'Tab') return;
    e.preventDefault();
    const el = e.currentTarget;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    onChange(value.slice(0, start) + '  ' + value.slice(end));
    requestAnimationFrame(() => {
      el.selectionStart = el.selectionEnd = start + 2;
    });
  };

  return (
    <div className="flex flex-col min-w-0">
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-gray-500 dark:text-gray-400">
          {label}
        </span>
        <button
          onClick={onCopy}
          className="flex items-center gap-1 px-2 py-1 text-xs text-gray-500 dark:text-gray-400 hover:text-vermillion-600 dark:hover:text-gold-300 transition-colors"
          title={`${label}をコピー`}
        >
          {copied ? (
            <>
              <CheckCircle className="w-3.5 h-3.5" />
              コピー済み
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              コピー
            </>
          )}
        </button>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        autoCapitalize="off"
        autoCorrect="off"
        aria-label={`${label}エディタ`}
        className="flex-1 min-h-[220px] w-full resize-y rounded-sm border border-gray-300 dark:border-gray-600
                 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200
                 font-mono text-[13px] leading-relaxed p-3
                 focus:outline-none focus:border-vermillion-500 dark:focus:border-gold-400 transition-colors"
      />
    </div>
  );
}

/**
 * 編集可能プレイグラウンド。
 * HTML/CSSを書き換えるとサンドボックスiframeのプレビューに即時反映される。
 * 依存ライブラリなし・変更はページ内に閉じる。
 */
export function Playground({ initialHtml, initialCss, onCopy, onFirstEdit }: PlaygroundProps) {
  const [html, setHtml] = useState(initialHtml);
  const [css, setCss] = useState(initialCss);
  const [srcDoc, setSrcDoc] = useState(() => buildSrcDoc(initialHtml, initialCss));
  const [copiedType, setCopiedType] = useState<'html' | 'css' | null>(null);
  const editedRef = useRef(false);

  // 入力が止まってから300msでプレビューを更新
  useEffect(() => {
    const timer = setTimeout(() => setSrcDoc(buildSrcDoc(html, css)), 300);
    return () => clearTimeout(timer);
  }, [html, css]);

  const isPristine = html === initialHtml && css === initialCss;

  const handleChange = (type: 'html' | 'css') => (value: string) => {
    if (!editedRef.current) {
      editedRef.current = true;
      onFirstEdit?.();
    }
    if (type === 'html') setHtml(value);
    else setCss(value);
  };

  const handleCopy = async (type: 'html' | 'css') => {
    try {
      await navigator.clipboard.writeText(type === 'html' ? html : css);
      setCopiedType(type);
      onCopy?.(type);
      setTimeout(() => setCopiedType(null), 2000);
    } catch {
      // クリップボードが使えない環境では何もしない
    }
  };

  const handleReset = () => {
    setHtml(initialHtml);
    setCss(initialCss);
  };

  return (
    <div className="space-y-4">
      {/* プレビュー */}
      <div className="bg-white dark:bg-gray-800 rounded-md p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <span className="entry-marker" aria-hidden="true" />
            <h2 className="font-serif text-xl font-semibold text-gray-900 dark:text-gray-100">
              プレビュー
            </h2>
            <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-gray-400 dark:text-gray-500 ml-1">
              Live
            </span>
          </div>
          <button
            onClick={handleReset}
            disabled={isPristine}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm border transition-colors ${
              isPristine
                ? 'border-gray-200 dark:border-gray-700 text-gray-300 dark:text-gray-600 cursor-not-allowed'
                : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-vermillion-400 hover:text-vermillion-600 dark:hover:border-gold-500 dark:hover:text-gold-300'
            }`}
            title="編集前のコードに戻す"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            リセット
          </button>
        </div>
        {/* 下端をドラッグして高さ変更できる（resize: vertical） */}
        <div className="resize-y overflow-hidden rounded-sm border border-gray-300 dark:border-gray-600 h-[320px] min-h-[160px]">
          <iframe
            srcDoc={srcDoc}
            sandbox=""
            title="プレビュー"
            className="w-full h-full bg-[#fdfaf3]"
          />
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          プレビュー枠は右下をドラッグすると高さを変えられます
        </p>
      </div>

      {/* エディタ */}
      <div className="bg-white dark:bg-gray-800 rounded-md p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2.5 mb-1">
          <span className="entry-marker" aria-hidden="true" />
          <h2 className="font-serif text-xl font-semibold text-gray-900 dark:text-gray-100">
            コードを編集して試す
          </h2>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          書き換えるとプレビューに即反映されます。変更はこのページ内だけで、リロードすると元に戻ります。
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <EditorPane
            label="HTML"
            value={html}
            onChange={handleChange('html')}
            onCopy={() => handleCopy('html')}
            copied={copiedType === 'html'}
          />
          <EditorPane
            label="CSS"
            value={css}
            onChange={handleChange('css')}
            onCopy={() => handleCopy('css')}
            copied={copiedType === 'css'}
          />
        </div>
      </div>
    </div>
  );
}
