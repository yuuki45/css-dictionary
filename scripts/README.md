# Scripts Directory

このディレクトリには、CSS Dictionaryプロジェクトのメンテナンス用スクリプトが格納されています。

## ディレクトリ構成

### 📊 audit/
プロパティデータとビジュアルデモの一貫性を監査するスクリプト

- `accurate-comprehensive-audit.js` - 全プロパティの包括的な監査（推奨）
- `comprehensive-audit.js` - 基本的な監査スクリプト
- `detailed-audit.js` - 詳細な監査（特定プロパティ向け）
- `audit-visual-demos.js` - ビジュアルデモの監査
- `extract-all-demos.js` - ビジュアルデモの一覧抽出
- `properties-with-demos.txt` - ビジュアルデモがあるプロパティのリスト

**使い方:**
```bash
node scripts/audit/accurate-comprehensive-audit.js
```

### 🔧 fix/
データの不一致を修正するスクリプト

- `add-categories.js` - プロパティにcategoryフィールドを追加
- `add-missing-examples.js` - ビジュアルデモがあるがJSON未登録のプロパティを追加
- `fix-all-demo-mismatches.js` - 全ての不一致を一括修正
- `fix-count-mismatches.js` - デモとコード例の数の不一致を修正
- `remove-duplicates.js` - 重複プロパティの削除

**個別プロパティ修正:**
- `fix-border-radius-examples.js`
- `fix-box-shadow-examples.js`
- `fix-box-shadow-whitespace.js`
- `fix-opacity-examples.js`
- `fix-pseudo-focus-visible.js`
- `fix-scroll-snap.js`
- `fix-text-align-examples.js`

**使い方:**
```bash
node scripts/fix/fix-all-demo-mismatches.js
```

### 🛠️ maintenance/
プロパティデータのメンテナンス・改善スクリプト

- `add-properties.js` - 新しいプロパティをJSONに追加
- `add-visual-demos.js` - ビジュアルデモを追加
- `improve-descriptions.js` - プロパティの説明文を充実化
- `improve-visual-demos.js` - ビジュアルデモの改善

**使い方:**
```bash
node scripts/maintenance/improve-descriptions.js
```

## 注意事項

⚠️ **重要:** これらのスクリプトは `src/data/cssProperties.json` と `public/data/cssProperties.json` の両方を更新します。

- スクリプト実行前にバックアップを取ることを推奨します
- Git管理下にあるため、変更内容は差分で確認できます
- 実行後は必ずブラウザで動作確認してください

## ワークフロー例

### 新しいプロパティを追加する場合

1. `scripts/maintenance/add-properties.js` を編集して新プロパティを追加
2. `node scripts/maintenance/add-properties.js` を実行
3. `scripts/maintenance/add-visual-demos.js` でビジュアルデモを実装
4. `node scripts/audit/accurate-comprehensive-audit.js` で一貫性を確認

### 既存データの改善

1. `node scripts/audit/accurate-comprehensive-audit.js` で現状確認
2. 必要に応じて `scripts/fix/` のスクリプトを実行
3. 再度監査スクリプトで確認

## 関連ドキュメント

- [最終監査レポート](../docs/reports/FINAL_AUDIT_REPORT.md)
- [開発ガイド](../docs/development-guide.md)
