const fs = require('fs');
const path = require('path');

// パスの定義
const srcPath = path.join(__dirname, '../../src/data/cssProperties.json');
const publicPath = path.join(__dirname, '../../public/data/cssProperties.json');

// インタラクティブデモの設定
const interactiveConfigs = {
  // 数値系プロパティ（スライダー）
  'opacity': {
    enabled: true,
    type: 'number',
    controls: [
      {
        name: 'opacity',
        type: 'slider',
        label: '不透明度',
        min: 0,
        max: 1,
        step: 0.1,
        unit: '',
        defaultValue: 1
      }
    ],
    preview: {
      template: 'box',
      content: 'テキスト',
      className: ''
    }
  },
  'padding': {
    enabled: true,
    type: 'number',
    controls: [
      {
        name: 'padding',
        type: 'slider',
        label: '内側の余白',
        min: 0,
        max: 100,
        step: 4,
        unit: 'px',
        defaultValue: 16
      }
    ],
    preview: {
      template: 'box',
      content: 'コンテンツ',
      className: 'border-2 border-blue-500'
    }
  },
  'margin': {
    enabled: true,
    type: 'number',
    controls: [
      {
        name: 'margin',
        type: 'slider',
        label: '外側の余白',
        min: 0,
        max: 100,
        step: 4,
        unit: 'px',
        defaultValue: 16
      }
    ],
    preview: {
      template: 'box',
      content: '',
      className: 'bg-blue-500'
    }
  },
  'font-size': {
    enabled: true,
    type: 'number',
    controls: [
      {
        name: 'font-size',
        type: 'slider',
        label: 'フォントサイズ',
        min: 8,
        max: 72,
        step: 2,
        unit: 'px',
        defaultValue: 16
      }
    ],
    preview: {
      template: 'text',
      content: 'サンプルテキスト',
      className: ''
    }
  },
  'width': {
    enabled: true,
    type: 'number',
    controls: [
      {
        name: 'width',
        type: 'slider',
        label: '幅',
        min: 50,
        max: 500,
        step: 10,
        unit: 'px',
        defaultValue: 200
      }
    ],
    preview: {
      template: 'box',
      content: '',
      className: 'h-32'
    }
  },
  'height': {
    enabled: true,
    type: 'number',
    controls: [
      {
        name: 'height',
        type: 'slider',
        label: '高さ',
        min: 50,
        max: 500,
        step: 10,
        unit: 'px',
        defaultValue: 128
      }
    ],
    preview: {
      template: 'box',
      content: '',
      className: 'w-32'
    }
  },

  // カラー系プロパティ
  'color': {
    enabled: true,
    type: 'color',
    controls: [
      {
        name: 'color',
        type: 'color',
        label: '文字色',
        defaultValue: '#000000'
      }
    ],
    preview: {
      template: 'text',
      content: 'サンプルテキスト',
      className: 'text-2xl font-bold'
    }
  },
  'background-color': {
    enabled: true,
    type: 'color',
    controls: [
      {
        name: 'background-color',
        type: 'color',
        label: '背景色',
        defaultValue: '#3b82f6'
      }
    ],
    preview: {
      template: 'box',
      content: 'コンテンツ',
      className: 'text-white'
    }
  },
  'border-color': {
    enabled: true,
    type: 'color',
    controls: [
      {
        name: 'border-color',
        type: 'color',
        label: 'ボーダー色',
        defaultValue: '#3b82f6'
      }
    ],
    preview: {
      template: 'box',
      content: '',
      className: 'border-4'
    }
  },

  // 選択系プロパティ
  'display': {
    enabled: true,
    type: 'select',
    controls: [
      {
        name: 'display',
        type: 'select',
        label: '表示タイプ',
        options: ['block', 'inline', 'inline-block', 'flex', 'grid', 'none'],
        defaultValue: 'block'
      }
    ],
    preview: {
      template: 'box',
      content: '要素',
      className: ''
    }
  },
  'position': {
    enabled: true,
    type: 'multi',
    controls: [
      {
        name: 'position',
        type: 'select',
        label: '配置方法',
        options: ['static', 'relative', 'absolute'],
        defaultValue: 'relative'
      },
      {
        name: 'top',
        type: 'slider',
        label: '上からの距離',
        min: 0,
        max: 200,
        step: 10,
        unit: 'px',
        defaultValue: 0
      },
      {
        name: 'left',
        type: 'slider',
        label: '左からの距離',
        min: 0,
        max: 200,
        step: 10,
        unit: 'px',
        defaultValue: 0
      }
    ],
    preview: {
      template: 'layout',
      content: '',
      className: 'relative h-64 bg-gray-100 dark:bg-gray-800'
    }
  },
  'text-align': {
    enabled: true,
    type: 'select',
    controls: [
      {
        name: 'text-align',
        type: 'select',
        label: 'テキスト配置',
        options: ['left', 'center', 'right', 'justify'],
        defaultValue: 'left'
      }
    ],
    preview: {
      template: 'text',
      content: 'テキストの配置を変更できます。左寄せ、中央寄せ、右寄せ、両端揃えが選択できます。',
      className: 'w-full'
    }
  },

  // Transform系
  'transform': {
    enabled: true,
    type: 'multi',
    controls: [
      {
        name: 'rotate',
        type: 'slider',
        label: '回転',
        min: 0,
        max: 360,
        step: 1,
        unit: 'deg',
        defaultValue: 0
      },
      {
        name: 'scale',
        type: 'slider',
        label: '拡大率',
        min: 0.1,
        max: 3,
        step: 0.1,
        unit: '',
        defaultValue: 1
      }
    ],
    preview: {
      template: 'box',
      content: '🎯',
      className: 'text-4xl'
    }
  },

  // Flexbox系
  'flex-direction': {
    enabled: true,
    type: 'select',
    controls: [
      {
        name: 'flex-direction',
        type: 'select',
        label: '並び方向',
        options: ['row', 'column', 'row-reverse', 'column-reverse'],
        defaultValue: 'row'
      }
    ],
    preview: {
      template: 'layout',
      content: '',
      className: 'flex gap-2'
    }
  },
  'justify-content': {
    enabled: true,
    type: 'select',
    controls: [
      {
        name: 'justify-content',
        type: 'select',
        label: '主軸方向の配置',
        options: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'],
        defaultValue: 'flex-start'
      }
    ],
    preview: {
      template: 'layout',
      content: '',
      className: 'flex h-32'
    }
  },
  'align-items': {
    enabled: true,
    type: 'select',
    controls: [
      {
        name: 'align-items',
        type: 'select',
        label: '交差軸方向の配置',
        options: ['flex-start', 'center', 'flex-end', 'stretch', 'baseline'],
        defaultValue: 'stretch'
      }
    ],
    preview: {
      template: 'layout',
      content: '',
      className: 'flex h-32'
    }
  },
  'gap': {
    enabled: true,
    type: 'number',
    controls: [
      {
        name: 'gap',
        type: 'slider',
        label: '要素間の間隔',
        min: 0,
        max: 100,
        step: 4,
        unit: 'px',
        defaultValue: 16
      }
    ],
    preview: {
      template: 'layout',
      content: '',
      className: 'flex'
    }
  },

  // テキスト系
  'line-height': {
    enabled: true,
    type: 'number',
    controls: [
      {
        name: 'line-height',
        type: 'slider',
        label: '行の高さ',
        min: 1,
        max: 3,
        step: 0.1,
        unit: '',
        defaultValue: 1.5
      }
    ],
    preview: {
      template: 'text',
      content: 'これは複数行のテキストです。\n行の高さを変更すると、\n行間が変化します。',
      className: 'whitespace-pre-line'
    }
  },
  'letter-spacing': {
    enabled: true,
    type: 'number',
    controls: [
      {
        name: 'letter-spacing',
        type: 'slider',
        label: '文字間隔',
        min: -2,
        max: 10,
        step: 0.5,
        unit: 'px',
        defaultValue: 0
      }
    ],
    preview: {
      template: 'text',
      content: 'サンプルテキスト',
      className: 'text-xl'
    }
  },
  'font-weight': {
    enabled: true,
    type: 'select',
    controls: [
      {
        name: 'font-weight',
        type: 'select',
        label: 'フォントの太さ',
        options: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
        defaultValue: '400'
      }
    ],
    preview: {
      template: 'text',
      content: 'サンプルテキスト',
      className: 'text-2xl'
    }
  },

  // ボーダー系
  'border-width': {
    enabled: true,
    type: 'number',
    controls: [
      {
        name: 'border-width',
        type: 'slider',
        label: 'ボーダーの太さ',
        min: 0,
        max: 20,
        step: 1,
        unit: 'px',
        defaultValue: 1
      }
    ],
    preview: {
      template: 'box',
      content: '',
      className: 'border-solid border-blue-500'
    }
  },
  'border': {
    enabled: true,
    type: 'multi',
    controls: [
      {
        name: 'border-width',
        type: 'slider',
        label: 'ボーダーの太さ',
        min: 0,
        max: 20,
        step: 1,
        unit: 'px',
        defaultValue: 2
      },
      {
        name: 'border-style',
        type: 'select',
        label: 'ボーダースタイル',
        options: ['solid', 'dashed', 'dotted', 'double', 'groove', 'ridge'],
        defaultValue: 'solid'
      },
      {
        name: 'border-color',
        type: 'color',
        label: 'ボーダー色',
        defaultValue: '#3b82f6'
      }
    ],
    preview: {
      template: 'box',
      content: '',
      className: ''
    }
  },

  // その他レイアウト
  'overflow': {
    enabled: true,
    type: 'select',
    controls: [
      {
        name: 'overflow',
        type: 'select',
        label: 'はみ出し処理',
        options: ['visible', 'hidden', 'scroll', 'auto'],
        defaultValue: 'visible'
      }
    ],
    preview: {
      template: 'box',
      content: 'これは長いテキストです。オーバーフローの動作を確認できます。スクロールバーが表示されるか、隠れるか、はみ出すかを選択できます。',
      className: 'h-24 w-48'
    }
  },
  'z-index': {
    enabled: true,
    type: 'number',
    controls: [
      {
        name: 'z-index',
        type: 'slider',
        label: '重ね順',
        min: 0,
        max: 100,
        step: 1,
        unit: '',
        defaultValue: 1
      }
    ],
    preview: {
      template: 'box',
      content: 'z-index',
      className: 'relative'
    }
  },

  // アニメーション
  'transition-duration': {
    enabled: true,
    type: 'number',
    controls: [
      {
        name: 'transition-duration',
        type: 'slider',
        label: 'アニメーション時間',
        min: 0,
        max: 3,
        step: 0.1,
        unit: 's',
        defaultValue: 0.3
      }
    ],
    preview: {
      template: 'box',
      content: 'hover me',
      className: 'hover:bg-blue-600 hover:scale-110'
    }
  },

  // カーソル
  'cursor': {
    enabled: true,
    type: 'select',
    controls: [
      {
        name: 'cursor',
        type: 'select',
        label: 'カーソル形状',
        options: ['default', 'pointer', 'text', 'move', 'not-allowed', 'grab', 'grabbing', 'wait', 'help'],
        defaultValue: 'default'
      }
    ],
    preview: {
      template: 'box',
      content: 'カーソルを重ねてください',
      className: ''
    }
  },

  // 複数コントロール
  'box-shadow': {
    enabled: true,
    type: 'multi',
    controls: [
      {
        name: 'box-shadow-x',
        type: 'slider',
        label: '水平オフセット',
        min: -50,
        max: 50,
        step: 1,
        unit: 'px',
        defaultValue: 0
      },
      {
        name: 'box-shadow-y',
        type: 'slider',
        label: '垂直オフセット',
        min: -50,
        max: 50,
        step: 1,
        unit: 'px',
        defaultValue: 4
      },
      {
        name: 'box-shadow-blur',
        type: 'slider',
        label: 'ぼかし',
        min: 0,
        max: 50,
        step: 1,
        unit: 'px',
        defaultValue: 6
      },
      {
        name: 'box-shadow-spread',
        type: 'slider',
        label: '広がり',
        min: -20,
        max: 20,
        step: 1,
        unit: 'px',
        defaultValue: 0
      },
      {
        name: 'box-shadow-color',
        type: 'color',
        label: '影の色',
        defaultValue: '#000000'
      }
    ],
    preview: {
      template: 'box',
      content: '',
      className: 'bg-white'
    }
  }
};

function addAllInteractiveDemos() {
  const properties = JSON.parse(fs.readFileSync(srcPath, 'utf8'));

  let addedCount = 0;

  Object.entries(interactiveConfigs).forEach(([propertyId, config]) => {
    const property = properties.find(p => p.id === propertyId);

    if (property) {
      property.interactive = config;
      addedCount++;
      console.log(`✅ Added interactive demo to: ${propertyId}`);
    } else {
      console.log(`⚠️  Property not found: ${propertyId}`);
    }
  });

  // 両方のファイルに書き込み
  fs.writeFileSync(srcPath, JSON.stringify(properties, null, 2), 'utf8');
  fs.writeFileSync(publicPath, JSON.stringify(properties, null, 2), 'utf8');

  console.log(`\n🎉 Successfully added ${addedCount} interactive demos!`);
  console.log('📝 Updated files:');
  console.log('   - src/data/cssProperties.json');
  console.log('   - public/data/cssProperties.json');
}

// 実行
addAllInteractiveDemos();
