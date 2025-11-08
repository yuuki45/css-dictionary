const fs = require('fs');
const path = require('path');

// Read files
const propertyDetailPath = path.join(__dirname, 'src', 'components', 'PropertyDetail.tsx');
const propertyDetailContent = fs.readFileSync(propertyDetailPath, 'utf8');
const cssPropertiesPath = path.join(__dirname, 'src', 'data', 'cssProperties.json');
const properties = JSON.parse(fs.readFileSync(cssPropertiesPath, 'utf8'));

console.log('=== Comprehensive Visual Demo Audit ===');
console.log(`Total properties in JSON: ${properties.length}\n`);

// Extract examples section from PropertyDetail.tsx
const examplesMatch = propertyDetailContent.match(/const examples:.*?= {([\s\S]*?)^  };/m);
if (!examplesMatch) {
  console.log('❌ Could not find examples section in PropertyDetail.tsx');
  process.exit(1);
}

const examplesSection = examplesMatch[1];

// Get all property IDs that have visual demos
const demoPropertyRegex = /"([^"]+)":\s*{/g;
const demoProperties = new Set();
let match;
while ((match = demoPropertyRegex.exec(examplesSection)) !== null) {
  demoProperties.add(match[1]);
}

console.log(`Properties with visual demos: ${demoProperties.size}\n`);

const issues = [];
const consistent = [];
const noDemo = [];
const noExamples = [];

// Check all properties
properties.forEach(property => {
  const propId = property.id;
  const hasDemo = demoProperties.has(propId);
  const hasExamples = property.examples && property.examples.length > 0;

  if (!hasDemo && hasExamples) {
    noDemo.push(propId);
    return;
  }

  if (!hasExamples && hasDemo) {
    noExamples.push(propId);
    return;
  }

  if (!hasDemo && !hasExamples) {
    // Both missing - this is fine
    return;
  }

  // Both exist - check consistency
  const propSectionRegex = new RegExp(`"${propId}":\\s*\\{([\\s\\S]*?)^\\s{6}\\}(?:,|\\s*$)`, 'm');
  const propSection = examplesSection.match(propSectionRegex);

  if (!propSection) {
    issues.push({
      property: propId,
      issue: 'Could not parse demo section'
    });
    return;
  }

  // Count demo variants (0:, 1:, 2:, etc.)
  const demoMatches = propSection[1].match(/^\s+(\d+):/gm);
  const numDemos = demoMatches ? demoMatches.length : 0;
  const numExamples = property.examples.length;

  if (numDemos !== numExamples) {
    issues.push({
      property: propId,
      issue: `Demo count mismatch: ${numDemos} demos vs ${numExamples} examples`,
      numDemos,
      numExamples
    });
  } else {
    consistent.push(propId);
  }
});

// Report results
console.log('=== Results ===\n');

console.log(`✅ Consistent (${consistent.length}):`);
if (consistent.length > 0) {
  console.log(`   ${consistent.join(', ')}`);
}
console.log('');

if (noDemo.length > 0) {
  console.log(`⚠️  Has examples but no visual demo (${noDemo.length}):`);
  noDemo.forEach(prop => {
    const property = properties.find(p => p.id === prop);
    console.log(`   - ${prop} (${property.examples.length} examples)`);
  });
  console.log('');
}

if (noExamples.length > 0) {
  console.log(`⚠️  Has visual demo but no examples in JSON (${noExamples.length}):`);
  console.log(`   ${noExamples.join(', ')}`);
  console.log('');
}

if (issues.length > 0) {
  console.log(`❌ Issues found (${issues.length}):`);
  issues.forEach(issue => {
    console.log(`   - ${issue.property}: ${issue.issue}`);
  });
  console.log('');
}

console.log('\n=== Summary ===');
console.log(`Total properties: ${properties.length}`);
console.log(`With visual demos: ${demoProperties.size}`);
console.log(`Consistent: ${consistent.length}`);
console.log(`Has examples but no demo: ${noDemo.length}`);
console.log(`Has demo but no examples: ${noExamples.length}`);
console.log(`Count mismatches: ${issues.length}`);

if (noDemo.length === 0 && noExamples.length === 0 && issues.length === 0) {
  console.log('\n🎉 Perfect! All properties are consistent!');
} else {
  console.log(`\n⚠️  Total issues to fix: ${noDemo.length + noExamples.length + issues.length}`);
}
