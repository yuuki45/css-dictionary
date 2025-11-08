const fs = require('fs');
const path = require('path');

// Read files
const propertyDetailPath = path.join(__dirname, 'src', 'components', 'PropertyDetail.tsx');
const propertyDetailContent = fs.readFileSync(propertyDetailPath, 'utf8');
const cssPropertiesPath = path.join(__dirname, 'src', 'data', 'cssProperties.json');
const properties = JSON.parse(fs.readFileSync(cssPropertiesPath, 'utf8'));

console.log('=== 正確な包括的監査 ===\n');

// Extract examples section
const examplesMatch = propertyDetailContent.match(/const examples:.*?= {([\s\S]*?)^  };/m);
if (!examplesMatch) {
  console.log('❌ examples セクションが見つかりません');
  process.exit(1);
}

const examplesSection = examplesMatch[1];

// Extract all property IDs with visual demos
const demoPropertyRegex = /^\s+"([^"]+)":\s*{/gm;
const demoProperties = new Set();
let match;
while ((match = demoPropertyRegex.exec(examplesSection)) !== null) {
  demoProperties.add(match[1]);
}

console.log(`ビジュアルデモがあるプロパティ: ${demoProperties.size}件`);
console.log(`JSONに登録されているプロパティ: ${properties.length}件\n`);

// Categorize all properties
const consistent = [];
const countMismatch = [];
const hasExamplesNoDemo = [];
const hasDemoNoExamples = [];
const noExamplesNoDemo = [];

properties.forEach(property => {
  const propId = property.id;
  const hasDemo = demoProperties.has(propId);
  const hasExamples = property.examples && property.examples.length > 0;

  if (!hasDemo && !hasExamples) {
    noExamplesNoDemo.push(propId);
    return;
  }

  if (!hasDemo && hasExamples) {
    hasExamplesNoDemo.push({ id: propId, exampleCount: property.examples.length });
    return;
  }

  if (hasDemo && !hasExamples) {
    hasDemoNoExamples.push(propId);
    return;
  }

  // Both exist - check count
  const propSectionRegex = new RegExp(`"${propId}":\\s*\\{([\\s\\S]*?)^\\s{6}\\}(?:,|\\s*$)`, 'm');
  const propSection = examplesSection.match(propSectionRegex);

  if (!propSection) {
    countMismatch.push({ id: propId, issue: 'デモセクションの解析失敗' });
    return;
  }

  const demoMatches = propSection[1].match(/^\s+(\d+):/gm);
  const numDemos = demoMatches ? demoMatches.length : 0;
  const numExamples = property.examples.length;

  if (numDemos !== numExamples) {
    countMismatch.push({
      id: propId,
      demos: numDemos,
      examples: numExamples,
      issue: `${numDemos}デモ vs ${numExamples}例`
    });
  } else {
    consistent.push(propId);
  }
});

// Also check for demos without JSON entries
const jsonPropertyIds = new Set(properties.map(p => p.id));
const demosWithoutJson = [];
demoProperties.forEach(demoId => {
  if (!jsonPropertyIds.has(demoId)) {
    demosWithoutJson.push(demoId);
  }
});

// Report
console.log('=== 結果 ===\n');

console.log(`✅ 完全一致 (${consistent.length}件):`);
console.log(`   ${consistent.join(', ')}\n`);

if (countMismatch.length > 0) {
  console.log(`⚠️  カウント不一致 (${countMismatch.length}件):`);
  countMismatch.forEach(item => {
    console.log(`   - ${item.id}: ${item.issue}`);
  });
  console.log('');
}

if (hasExamplesNoDemo.length > 0) {
  console.log(`📝 コード例あり、ビジュアルデモなし (${hasExamplesNoDemo.length}件):`);
  hasExamplesNoDemo.forEach(item => {
    console.log(`   - ${item.id} (${item.exampleCount}例)`);
  });
  console.log('');
}

if (hasDemoNoExamples.length > 0) {
  console.log(`🎨 ビジュアルデモあり、コード例なし (${hasDemoNoExamples.length}件):`);
  console.log(`   ${hasDemoNoExamples.join(', ')}\n`);
}

if (demosWithoutJson.length > 0) {
  console.log(`⚠️  デモはあるがJSON未登録 (${demosWithoutJson.length}件):`);
  console.log(`   ${demosWithoutJson.join(', ')}\n`);
}

if (noExamplesNoDemo.length > 0) {
  console.log(`ℹ️  コード例もデモもなし (${noExamplesNoDemo.length}件):`);
  console.log(`   ${noExamplesNoDemo.join(', ')}\n`);
}

console.log('=== サマリー ===');
console.log(`総プロパティ数: ${properties.length}`);
console.log(`ビジュアルデモ実装数: ${demoProperties.size}`);
console.log(`完全一致: ${consistent.length}`);
console.log(`カウント不一致: ${countMismatch.length}`);
console.log(`コード例のみ: ${hasExamplesNoDemo.length}`);
console.log(`デモのみ: ${hasDemoNoExamples.length}`);
console.log(`未実装: ${noExamplesNoDemo.length}`);

const totalIssues = countMismatch.length + hasExamplesNoDemo.length + hasDemoNoExamples.length + demosWithoutJson.length;

if (totalIssues === 0) {
  console.log('\n🎉 完璧！全プロパティが一貫しています！');
} else {
  console.log(`\n⚠️  要対応: ${totalIssues}件`);
}
