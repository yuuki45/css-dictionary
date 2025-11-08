const sharp = require('sharp');
const path = require('path');

async function convertSVGtoPNG() {
  const sizes = [16, 48, 128];

  for (const size of sizes) {
    const svgPath = path.join(__dirname, 'icons', `icon${size}.svg`);
    const pngPath = path.join(__dirname, 'icons', `icon${size}.png`);

    try {
      await sharp(svgPath)
        .resize(size, size)
        .png()
        .toFile(pngPath);

      console.log(`✓ Created icon${size}.png`);
    } catch (error) {
      console.error(`✗ Failed to create icon${size}.png:`, error.message);
    }
  }

  console.log('\nAll icons converted successfully!');
}

convertSVGtoPNG();
