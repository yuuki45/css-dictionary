const fs = require('fs');
const path = require('path');

const propertyDetailPath = path.join(__dirname, 'src', 'components', 'PropertyDetail.tsx');
const content = fs.readFileSync(propertyDetailPath, 'utf8');

// Extract examples section
const match = content.match(/const examples:.*?= {([\s\S]*?)^  };/m);

if (!match) {
  console.log('Could not find examples section');
  process.exit(1);
}

const examplesSection = match[1];

// Extract all property names
const propertyRegex = /^\s+"([^"]+)":\s*{/gm;
const properties = [];
let propMatch;

while ((propMatch = propertyRegex.exec(examplesSection)) !== null) {
  properties.push(propMatch[1]);
}

console.log(`Total properties with visual demos: ${properties.length}\n`);
console.log('All properties with visual demos:');
console.log(properties.sort().join(', '));

// Also save to file for comparison
fs.writeFileSync(
  path.join(__dirname, 'properties-with-demos.txt'),
  properties.sort().join('\n'),
  'utf8'
);

console.log('\n\n✓ List saved to properties-with-demos.txt');
