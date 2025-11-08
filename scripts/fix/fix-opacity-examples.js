const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'cssProperties.json');
const properties = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// opacityのexamplesを修正
const opacityProperty = properties.find(p => p.id === 'opacity');
if (opacityProperty) {
  opacityProperty.examples = [
    {
      "code": "opacity: 1;",
      "description": "完全に不透明（デフォルト）"
    },
    {
      "code": "opacity: 0.5;",
      "description": "半透明（背景が透けて見える）"
    },
    {
      "code": "opacity: 0.1;",
      "description": "ほぼ透明（うっすらと見える）"
    }
  ];
  console.log('✓ opacityのexamplesを更新しました');
}

// 保存
fs.writeFileSync(filePath, JSON.stringify(properties, null, 2), 'utf8');

// public/dataにもコピー
const publicPath = path.join(__dirname, 'public', 'data', 'cssProperties.json');
fs.writeFileSync(publicPath, JSON.stringify(properties, null, 2), 'utf8');
console.log('✓ public/data/cssProperties.jsonも更新しました');
