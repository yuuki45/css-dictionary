/** セクション間で共有するクリップボードコピー（従来の挙動をそのまま維持） */
export function copyToClipboard(text: string): void {
  navigator.clipboard.writeText(text);
}
