const fs = require('fs');
const path = require('path');

// パスの定義
const srcPath = path.join(__dirname, '../../src/data/cssProperties.json');
const publicPath = path.join(__dirname, '../../public/data/cssProperties.json');

function addInteractiveToBorderRadius() {
  // src/data/cssProperties.json を読み込み
  const properties = JSON.parse(fs.readFileSync(srcPath, 'utf8'));

  // border-radius を見つける
  const borderRadius = properties.find(p => p.id === 'border-radius');

  if (!borderRadius) {
    console.error('❌ border-radius property not found!');
    return;
  }

  // インタラクティブ設定を追加
  borderRadius.interactive = {
    enabled: true,
    type: 'number',
    controls: [
      {
        name: 'border-radius',
        type: 'slider',
        label: '角の丸み',
        min: 0,
        max: 100,
        step: 1,
        unit: 'px',
        defaultValue: 16
      }
    ],
    preview: {
      template: 'box',
      content: '',
      className: ''
    }
  };

  // 両方のファイルに書き込み
  fs.writeFileSync(srcPath, JSON.stringify(properties, null, 2), 'utf8');
  fs.writeFileSync(publicPath, JSON.stringify(properties, null, 2), 'utf8');

  console.log('✅ Successfully added interactive demo to border-radius');
  console.log('📝 Updated files:');
  console.log('   - src/data/cssProperties.json');
  console.log('   - public/data/cssProperties.json');
}

// 実行
addInteractiveToBorderRadius();
