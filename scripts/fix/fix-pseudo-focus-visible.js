const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'cssProperties.json');
const properties = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const pseudoFocusVisible = properties.find(p => p.id === 'pseudo-focus-visible');
if (pseudoFocusVisible) {
  pseudoFocusVisible.examples = [
    {
      "code": "button:focus-visible { outline: 2px solid #3b82f6; }",
      "description": "キーボードフォーカス時のみアウトラインを表示"
    },
    {
      "code": ".input:focus-visible { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.1); }",
      "description": "フォーム入力フィールドのキーボードフォーカス"
    }
  ];
  console.log('✓ pseudo-focus-visible: Updated to 2 examples matching demos');
}

fs.writeFileSync(filePath, JSON.stringify(properties, null, 2), 'utf8');
const publicPath = path.join(__dirname, 'public', 'data', 'cssProperties.json');
fs.writeFileSync(publicPath, JSON.stringify(properties, null, 2), 'utf8');

console.log('✓ Files updated');
