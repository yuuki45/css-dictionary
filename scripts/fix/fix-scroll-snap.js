const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'cssProperties.json');
const properties = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const scrollSnap = properties.find(p => p.id === 'scroll-snap');
if (scrollSnap) {
  scrollSnap.examples = [
    {
      "code": "scroll-snap-type: x mandatory; scroll-snap-align: start;",
      "description": "水平方向に必須スナップ、各要素を開始位置に配置"
    }
  ];
  console.log('✓ scroll-snap: Updated to 1 example matching demo');
}

fs.writeFileSync(filePath, JSON.stringify(properties, null, 2), 'utf8');
const publicPath = path.join(__dirname, 'public', 'data', 'cssProperties.json');
fs.writeFileSync(publicPath, JSON.stringify(properties, null, 2), 'utf8');

console.log('✓ Files updated');
