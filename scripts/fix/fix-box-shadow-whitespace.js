const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'cssProperties.json');
const properties = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Fix box-shadow whitespace in rgba values
const boxShadow = properties.find(p => p.id === 'box-shadow');
if (boxShadow) {
  boxShadow.examples = [
    { "code": "box-shadow: none;", "description": "影なし（デフォルト）" },
    { "code": "box-shadow: 0 2px 4px rgba(0,0,0,0.1);", "description": "軽い影（ぼかし4px）" },
    { "code": "box-shadow: 0 4px 12px rgba(0,0,0,0.15);", "description": "中程度の影（ぼかし12px）" },
    { "code": "box-shadow: 0 10px 30px rgba(0,0,0,0.3);", "description": "強い影（ぼかし30px）" }
  ];
  console.log('✓ box-shadow: Fixed rgba whitespace to match demos');
}

// Save to both locations
fs.writeFileSync(filePath, JSON.stringify(properties, null, 2), 'utf8');
console.log('✓ src/data/cssProperties.json updated');

const publicPath = path.join(__dirname, 'public', 'data', 'cssProperties.json');
fs.writeFileSync(publicPath, JSON.stringify(properties, null, 2), 'utf8');
console.log('✓ public/data/cssProperties.json updated');

console.log('\n✅ All whitespace issues fixed!');
