const fs = require('fs');
const path = require('path');

// SVGアイコンを生成
function createSVGIcon(size) {
  const fontSize = size * 0.35;
  const strokeWidth = size * 0.08;
  const borderRadius = size * 0.2;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#7C3AED;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#5B21B6;stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Background rounded rectangle -->
  <rect width="${size}" height="${size}" rx="${borderRadius}" fill="url(#bg-gradient)" />

  <!-- CSS text -->
  <text x="${size * 0.5}" y="${size * 0.6}"
        font-family="Arial, sans-serif"
        font-size="${fontSize}"
        font-weight="bold"
        fill="white"
        text-anchor="middle">CSS</text>
</svg>`;
}

// アイコンディレクトリを作成
const iconsDir = path.join(__dirname, 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir);
}

// 各サイズのSVGを生成
const sizes = [16, 48, 128];
sizes.forEach(size => {
  const svg = createSVGIcon(size);
  const filename = `icon${size}.svg`;
  fs.writeFileSync(path.join(iconsDir, filename), svg);
  console.log(`Created ${filename}`);
});

console.log('\nSVG icons created successfully!');
console.log('\nTo convert to PNG, run:');
console.log('cd icons');
sizes.forEach(size => {
  console.log(`qlmanage -t -s ${size} -o . icon${size}.svg && mv icon${size}.svg.png icon${size}.png`);
});
