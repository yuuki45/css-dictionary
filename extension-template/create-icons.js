// Simple icon generator for development
// Creates placeholder PNG icons using Canvas

const fs = require('fs');
const path = require('path');

// SVG template for CSS Dictionary icon
const createSVG = (size) => `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="url(#grad)"/>

  <!-- Book icon -->
  <g transform="translate(${size * 0.2}, ${size * 0.25})">
    <rect x="0" y="0" width="${size * 0.6}" height="${size * 0.5}" rx="2" fill="white" opacity="0.9"/>
    <line x1="${size * 0.3}" y1="0" x2="${size * 0.3}" y2="${size * 0.5}" stroke="#667eea" stroke-width="2"/>
    <text x="${size * 0.15}" y="${size * 0.25}" font-family="Arial" font-size="${size * 0.2}" fill="#667eea" text-anchor="middle">C</text>
    <text x="${size * 0.45}" y="${size * 0.25}" font-family="Arial" font-size="${size * 0.2}" fill="#764ba2" text-anchor="middle">S</text>
  </g>
</svg>
`;

// Create icons directory
const iconsDir = path.join(__dirname, 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Generate SVG files
const sizes = [16, 48, 128];
sizes.forEach(size => {
  const svg = createSVG(size);
  const filename = path.join(iconsDir, `icon${size}.svg`);
  fs.writeFileSync(filename, svg.trim());
  console.log(`Created ${filename}`);
});

console.log('\nSVG icons created successfully!');
console.log('\nTo convert to PNG, you can:');
console.log('1. Use an online converter: https://cloudconvert.com/svg-to-png');
console.log('2. Install ImageMagick and run:');
console.log('   brew install imagemagick');
console.log('   cd icons && for i in *.svg; do convert "$i" "${i%.svg}.png"; done');
console.log('3. Or use the Chrome extension as-is - it will show placeholder icons\n');
