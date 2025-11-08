const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'cssProperties.json');
const properties = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// text-alignのexamplesを修正
const textAlignProperty = properties.find(p => p.id === 'text-align');
if (textAlignProperty) {
  textAlignProperty.examples = [
    {
      "code": "text-align: center;",
      "description": "中央揃え"
    },
    {
      "code": "text-align: justify;",
      "description": "両端揃え"
    },
    {
      "code": "text-align: right;",
      "description": "右揃え"
    }
  ];
  console.log('✓ text-alignのexamplesを更新しました');
}

// 保存
fs.writeFileSync(filePath, JSON.stringify(properties, null, 2), 'utf8');

// public/dataにもコピー
const publicPath = path.join(__dirname, 'public', 'data', 'cssProperties.json');
fs.writeFileSync(publicPath, JSON.stringify(properties, null, 2), 'utf8');
console.log('✓ public/data/cssProperties.jsonも更新しました');
