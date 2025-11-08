# アイコンファイル

このフォルダには、ブラウザ拡張機能で使用するアイコン画像を配置します。

## 必要なファイル

以下の3つのサイズのアイコンが必要です：

- **icon16.png** - 16×16ピクセル（ツールバーアイコン用）
- **icon48.png** - 48×48ピクセル（拡張機能管理ページ用）
- **icon128.png** - 128×128ピクセル（Chrome Web Store用）

## アイコンデザインガイドライン

### デザインコンセプト
- CSS Dictionaryをイメージさせる本や辞書のアイコン
- 色: 紫系のグラデーション（#667eea → #764ba2）を推奨
- シンプルで認識しやすいデザイン

### 推奨ツール
- **Figma** - https://figma.com
- **Canva** - https://canva.com
- **Adobe Illustrator**
- **GIMP** - 無料のフォトエディタ

### 作成方法

#### 1. Figmaを使用する場合

1. 128×128pxのフレームを作成
2. 本のアイコンをデザイン（📖をベースに）
3. グラデーション（#667eea → #764ba2）を適用
4. Export時に以下の設定：
   - icon128.png: 128×128px, PNG
   - icon48.png: 48×48px, PNG
   - icon16.png: 16×16px, PNG

#### 2. オンラインツールを使用

**Favicon Generator** を使用して簡単に作成できます：
- https://realfavicongenerator.net/
- ベース画像をアップロードすると、複数サイズを自動生成

#### 3. 絵文字を使用する（開発用）

開発段階では、絵文字から簡易的にアイコンを作成できます：

```bash
# ImageMagickがインストールされている場合
convert -size 128x128 -background transparent -fill "#667eea" \
  -font "Apple Color Emoji" -pointsize 100 -gravity center \
  label:"📖" icon128.png

# 他のサイズも同様に作成
convert -resize 48x48 icon128.png icon48.png
convert -resize 16x16 icon128.png icon16.png
```

## 暫定対応

開発中でアイコンが未作成の場合、Chromeは自動的にプレースホルダーを表示します。
ただし、Chrome Web Storeに公開する際は、必ず適切なアイコンが必要です。

## アイコンの確認

アイコンを配置した後、以下の手順で確認できます：

1. `chrome://extensions/` を開く
2. 拡張機能のアイコンがツールバーに表示される
3. 拡張機能の詳細ページでもアイコンが表示される

## ライセンス

作成したアイコンのライセンスは、本プロジェクトと同じMITライセンスとします。
