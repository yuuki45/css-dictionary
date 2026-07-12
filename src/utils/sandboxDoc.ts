// サンドボックスiframe（sandbox="" + srcdoc）用のドキュメントを組み立てる共通ユーティリティ。
// Playground（編集可能）とアニメーションギャラリーのプレビューで共用する。
export function buildSrcDoc(html: string, css: string): string {
  return [
    '<!doctype html><html><head><meta charset="utf-8">',
    '<style>body{margin:16px;background:#fdfaf3;color:#1a1712;font-family:-apple-system,BlinkMacSystemFont,"Hiragino Kaku Gothic ProN","Noto Sans JP",sans-serif;}</style>',
    `<style>${css}</style>`,
    '</head><body>',
    html,
    '</body></html>',
  ].join('\n');
}
