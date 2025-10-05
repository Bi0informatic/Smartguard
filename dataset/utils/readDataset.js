const fs = require('fs-extra');
const path = require('path');

async function readDataset(room) {
  const filePath = path.resolve(__dirname, 'data', 'students.json');

  try {
    const data = await fs.readJson(filePath);
    const filtered = data.filter(entry => entry.classRoom === room);
    console.log(`📖 Found ${filtered.length} entries for room "${room}"`);
    return filtered;
  } catch (err) {
    console.error('❌ Failed to read dataset:', err);
    return [];
  }
}

module.exports = { readDataset };