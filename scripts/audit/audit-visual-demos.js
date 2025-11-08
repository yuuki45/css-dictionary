const fs = require('fs');
const path = require('path');

// Read PropertyDetail.tsx to extract visual demo property names
const propertyDetailPath = path.join(__dirname, 'src', 'components', 'PropertyDetail.tsx');
const propertyDetailContent = fs.readFileSync(propertyDetailPath, 'utf8');

// Read cssProperties.json
const cssPropertiesPath = path.join(__dirname, 'src', 'data', 'cssProperties.json');
const properties = JSON.parse(fs.readFileSync(cssPropertiesPath, 'utf8'));

// Extract all property names that have visual demos in PropertyDetail.tsx
// Look for pattern: "property-name": {
const demoPropertyRegex = /"([^"]+)":\s*{/g;
const examplesSection = propertyDetailContent.match(/const examples:.*?= {([\s\S]*?)^  };/m);

if (!examplesSection) {
  console.log('❌ Could not find examples section in PropertyDetail.tsx');
  process.exit(1);
}

const demoProperties = new Set();
let match;
while ((match = demoPropertyRegex.exec(examplesSection[1])) !== null) {
  demoProperties.add(match[1]);
}

console.log(`Found ${demoProperties.size} properties with visual demos\n`);

// For each property with a demo, check consistency
const issues = [];

demoProperties.forEach(propId => {
  const property = properties.find(p => p.id === propId);

  if (!property) {
    issues.push({
      property: propId,
      type: 'missing',
      message: `Property "${propId}" has visual demo but not found in cssProperties.json`
    });
    return;
  }

  // Extract demo code from PropertyDetail.tsx for this property
  const propDemoRegex = new RegExp(`"${propId}":\\s*{([\\s\\S]*?)^  },?\\n  ("[^"]+"|})`, 'm');
  const propDemoMatch = examplesSection[1].match(propDemoRegex);

  if (!propDemoMatch) {
    return;
  }

  const demoCode = propDemoMatch[1];

  // Extract CSS values from demo code
  // Look for patterns like: propertyName: "value"
  const cssValueRegex = new RegExp(`${propId.replace(/-/g, '[A-Z]?')}:\\s*["']([^"']+)["']`, 'gi');
  const demoValues = [];
  let cssMatch;
  while ((cssMatch = cssValueRegex.exec(demoCode)) !== null) {
    demoValues.push(cssMatch[1]);
  }

  // Also check for style={{ property: value }} pattern
  const styleRegex = /style=\{\{[\s\S]*?\}\}/g;
  const styleMatches = demoCode.match(styleRegex) || [];
  styleMatches.forEach(styleBlock => {
    const propRegex = new RegExp(`${propId.replace(/-([a-z])/g, (_, c) => c.toUpperCase())}:\\s*["']([^"']+)["']`, 'g');
    let propMatch;
    while ((propMatch = propRegex.exec(styleBlock)) !== null) {
      if (!demoValues.includes(propMatch[1])) {
        demoValues.push(propMatch[1]);
      }
    }
  });

  // Get examples from cssProperties.json
  const exampleValues = property.examples ? property.examples.map(ex => {
    // Extract value from code like "property: value;"
    const match = ex.code.match(/:\s*([^;]+)/);
    return match ? match[1].trim() : '';
  }).filter(v => v) : [];

  // Compare demo values with example values
  if (exampleValues.length > 0) {
    const missingInDemo = exampleValues.filter(val =>
      !demoValues.some(dv => dv.includes(val) || val.includes(dv))
    );

    const missingInExamples = demoValues.filter(val =>
      !exampleValues.some(ev => ev.includes(val) || val.includes(ev))
    );

    if (missingInDemo.length > 0) {
      issues.push({
        property: propId,
        type: 'value-mismatch',
        message: `Values in examples but not in demo: ${missingInDemo.join(', ')}`,
        exampleValues,
        demoValues
      });
    }

    if (missingInExamples.length > 0) {
      issues.push({
        property: propId,
        type: 'value-mismatch',
        message: `Values in demo but not in examples: ${missingInExamples.join(', ')}`,
        exampleValues,
        demoValues
      });
    }
  }

  // Check if number of demos matches number of examples
  const numDemos = (demoCode.match(/^\s+\d+:/gm) || []).length;
  const numExamples = property.examples ? property.examples.length : 0;

  if (numDemos !== numExamples && numExamples > 0) {
    issues.push({
      property: propId,
      type: 'count-mismatch',
      message: `Number of demos (${numDemos}) doesn't match examples (${numExamples})`,
      numDemos,
      numExamples
    });
  }
});

// Report issues
if (issues.length === 0) {
  console.log('✅ All visual demos are consistent with code examples!');
} else {
  console.log(`⚠️  Found ${issues.length} potential issues:\n`);

  issues.forEach((issue, index) => {
    console.log(`${index + 1}. ${issue.property}`);
    console.log(`   Type: ${issue.type}`);
    console.log(`   ${issue.message}`);
    if (issue.exampleValues) {
      console.log(`   Example values: [${issue.exampleValues.join(', ')}]`);
    }
    if (issue.demoValues) {
      console.log(`   Demo values: [${issue.demoValues.join(', ')}]`);
    }
    console.log('');
  });
}

console.log('\n--- Detailed Check of Specific Properties ---\n');

// Specific checks for properties mentioned in the fix scripts
const specificChecks = ['border-radius', 'opacity', 'box-shadow', 'text-align', 'object-position'];

specificChecks.forEach(propId => {
  const property = properties.find(p => p.id === propId);
  if (property && property.examples) {
    console.log(`${propId}:`);
    console.log(`  Examples from JSON:`);
    property.examples.forEach((ex, i) => {
      console.log(`    ${i}: ${ex.code} - ${ex.description}`);
    });
    console.log('');
  }
});
