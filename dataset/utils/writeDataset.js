const fs = require('fs-extra');


// content should be json string
async function writeDataset(content) {
    const dirPath = "./data";
    const filePath = "./data/students.json";

    try{
        const newItem = JSON.parse(content);
    } catch (err) {
        console.error('Invalid JSON input:', err);
    }
    await fs.ensureDir(dirPath);


    try {
    // Ensure file exists and has valid JSON
    const list = await fs.readJson(filePath).catch(() => []);

    // Add new item
    list.push(newItem);

    // Write updated list back to file
    await fs.writeJson(filePath, list, { spaces: 2 });

    console.log('✅ Item added to list');
  } catch (err) {
    console.error('❌ Failed to update file:', err);
  }

}

module.exports = { writeDataset };