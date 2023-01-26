const fs = require('fs').promises;

const path = require('path');

const FILE_PATH_TALKER = '../talker.json';

const readTalkers = async () => {
  try {
    const talkers = await fs.readFile(path.resolve(__dirname, FILE_PATH_TALKER));

    return JSON.parse(talkers);
  } catch (err) {
    console.error(err.message);
  }
};

const writeTalkers = async (Talker) => {
  try {
    const talkers = await readTalkers();
    const talkerAdd = JSON.parse(JSON.stringify({ id: talkers.length + 1, ...Talker }));
    const newTalkers = JSON.stringify([...talkers, talkerAdd]);
    await fs.writeFile(path.resolve(__dirname, FILE_PATH_TALKER), newTalkers);
    return talkerAdd;
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  readTalkers,
  writeTalkers,
};