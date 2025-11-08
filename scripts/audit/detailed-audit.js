const fs = require('fs');
const path = require('path');

// Read files
const propertyDetailPath = path.join(__dirname, 'src', 'components', 'PropertyDetail.tsx');
const propertyDetailContent = fs.readFileSync(propertyDetailPath, 'utf8');
const cssPropertiesPath = path.join(__dirname, 'src', 'data', 'cssProperties.json');
const properties = JSON.parse(fs.readFileSync(cssPropertiesPath, 'utf8'));

// Properties to check in detail based on previous fixes
const propertiesToCheck = [
  'border-radius',
  'opacity',
  'box-shadow',
  'text-align',
  'object-position',
  'align-self',
  'justify-self',
  'grid-column',
  'grid-row',
  'resize',
  'mix-blend-mode',
  'background-blend-mode',
  'inset'
];

console.log('=== Detailed Visual Demo Audit ===\n');

const issues = [];

propertiesToCheck.forEach(propId => {
  const property = properties.find(p => p.id === propId);

  if (!property) {
    console.log(`❌ ${propId}: Not found in cssProperties.json`);
    return;
  }

  // Count demos in PropertyDetail.tsx
  const propSectionRegex = new RegExp(`"${propId}":\\s*\\{([\\s\\S]*?)^\\s{6}\\}(?:,|\\s*$)`, 'm');
  const propSection = propertyDetailContent.match(propSectionRegex);

  if (!propSection) {
    console.log(`⚠️  ${propId}: Has examples in JSON but no visual demo in PropertyDetail.tsx`);
    issues.push({ property: propId, issue: 'No visual demo' });
    return;
  }

  // Count demo variants (0:, 1:, 2:, etc.)
  const demoMatches = propSection[1].match(/^\s+(\d+):/gm);
  const numDemos = demoMatches ? demoMatches.length : 0;
  const numExamples = property.examples ? property.examples.length : 0;

  console.log(`\n${propId}:`);
  console.log(`  Visual demos: ${numDemos}`);
  console.log(`  JSON examples: ${numExamples}`);

  if (property.examples) {
    console.log(`  Examples in JSON:`);
    property.examples.forEach((ex, i) => {
      console.log(`    ${i}: ${ex.code}`);
    });
  }

  // Extract actual CSS values from demos
  const demoContent = propSection[1];

  // Convert property-name to camelCase for JavaScript
  const camelProp = propId.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

  // Look for style={{ property: "value" }} patterns
  const styleRegex = new RegExp(`${camelProp}:\\s*["']([^"']+)["']`, 'g');
  const demoValues = [];
  let match;
  while ((match = styleRegex.exec(demoContent)) !== null) {
    if (!demoValues.includes(match[1])) {
      demoValues.push(match[1]);
    }
  }

  if (demoValues.length > 0) {
    console.log(`  Values used in demos: [${demoValues.join(', ')}]`);
  }

  // Check for mismatch
  if (numDemos !== numExamples) {
    console.log(`  ⚠️  MISMATCH: ${numDemos} demos but ${numExamples} examples`);
    issues.push({
      property: propId,
      issue: `Demo count mismatch: ${numDemos} demos vs ${numExamples} examples`
    });
  }

  // Check if example values match demo values
  if (property.examples && demoValues.length > 0) {
    const exampleValues = property.examples.map(ex => {
      const match = ex.code.match(/:\s*([^;]+)/);
      return match ? match[1].trim() : '';
    }).filter(v => v);

    const mismatches = [];
    exampleValues.forEach(exVal => {
      const found = demoValues.some(dv =>
        dv === exVal ||
        dv.includes(exVal) ||
        exVal.includes(dv)
      );
      if (!found) {
        mismatches.push(exVal);
      }
    });

    if (mismatches.length > 0) {
      console.log(`  ⚠️  VALUES MISMATCH: Examples have [${mismatches.join(', ')}] but not found in demos`);
      issues.push({
        property: propId,
        issue: `Value mismatch: ${mismatches.join(', ')}`
      });
    }
  }
});

console.log('\n\n=== Summary ===');
if (issues.length === 0) {
  console.log('✅ All checked properties are consistent!');
} else {
  console.log(`⚠️  Found ${issues.length} issues:`);
  issues.forEach(issue => {
    console.log(`  - ${issue.property}: ${issue.issue}`);
  });
}
