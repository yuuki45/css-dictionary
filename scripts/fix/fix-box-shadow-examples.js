const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'cssProperties.json');
const properties = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// box-shadowのexamplesを修正
const boxShadowProperty = properties.find(p => p.id === 'box-shadow');
if (boxShadowProperty) {
  boxShadowProperty.examples = [
    {
      "code": "box-shadow: none;",
      "description": "影なし（デフォルト）"
    },
    {
      "code": "box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);",
      "description": "軽い影（ぼかし4px）"
    },
    {
      "code": "box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);",
      "description": "中程度の影（ぼかし12px）"
    },
    {
      "code": "box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);",
      "description": "強い影（ぼかし30px）"
    }
  ];
  console.log('✓ box-shadowのexamplesを更新しました');
}

// 保存
fs.writeFileSync(filePath, JSON.stringify(properties, null, 2), 'utf8');

// public/dataにもコピー
const publicPath = path.join(__dirname, 'public', 'data', 'cssProperties.json');
fs.writeFileSync(publicPath, JSON.stringify(properties, null, 2), 'utf8');
console.log('✓ public/data/cssProperties.jsonも更新しました');
