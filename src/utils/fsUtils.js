const fs = require('fs').promises;

const path = require('path');

const readTalkers = async () => {
  try {
    const talkers = await fs.readFile(path.resolve(__dirname, '../talker.json'));

    return JSON.parse(talkers);
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  readTalkers,
};