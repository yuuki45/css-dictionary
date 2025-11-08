const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'cssProperties.json');
const properties = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// border-radiusのexamplesを修正
const borderRadiusProperty = properties.find(p => p.id === 'border-radius');
if (borderRadiusProperty) {
  borderRadiusProperty.examples = [
    {
      "code": "border-radius: 0px;",
      "description": "角の丸みなし（デフォルト）"
    },
    {
      "code": "border-radius: 16px;",
      "description": "中程度の丸み"
    },
    {
      "code": "border-radius: 50%;",
      "description": "完全な円形（正方形の場合）"
    }
  ];
  console.log('✓ border-radiusのexamplesを更新しました');
}

// 保存
fs.writeFileSync(filePath, JSON.stringify(properties, null, 2), 'utf8');

// public/dataにもコピー
const publicPath = path.join(__dirname, 'public', 'data', 'cssProperties.json');
fs.writeFileSync(publicPath, JSON.stringify(properties, null, 2), 'utf8');
console.log('✓ public/data/cssProperties.jsonも更新しました');
