// サンドボックスiframe（sandbox="" + srcdoc）用のドキュメントを組み立てる共通ユーティリティ。
// Playground（編集可能）とアニメーションギャラリーのプレビューで共用する。
// jsを渡した場合はiframe側で sandbox="allow-scripts" を指定すること（allow-same-originは付けない）。
export function buildSrcDoc(html: string, css: string, js?: string): string {
  return [
    '<!doctype html><html><head><meta charset="utf-8">',
    '<style>body{margin:16px;background:#fdfaf3;color:#1a1712;font-family:-apple-system,BlinkMacSystemFont,"Hiragino Kaku Gothic ProN","Noto Sans JP",sans-serif;}</style>',
    `<style>${css}</style>`,
    '</head><body>',
    html,
    ...(js ? [`<script>${js}</script>`] : []),
    '</body></html>',
  ].join('\n');
}
