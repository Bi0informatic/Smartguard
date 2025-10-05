const fs = require('fs-extra');

async function readDataset() {
  const filePath = "./data/students.json";

  try {
    const data = await fs.readJson(filePath);
    return data;
  } catch (err) {
    console.error('❌ Failed to read dataset:', err);
    return [];
  }
}

module.exports = { readDataset };