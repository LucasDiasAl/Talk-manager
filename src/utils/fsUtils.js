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

const updateTalkers = async (idTalker, newData) => {
  try {
    const talker = await readTalkers();
    const newTalker = { id: idTalker, ...newData };
    const talkerToUpdate = talker.filter((curr) => curr.id === idTalker)[0];
    const index = talker.indexOf(talkerToUpdate);
    if (index === -1) throw new Error('Não há ninguem com esse id');
    talker.splice(index, 1, newTalker);
    await fs.writeFile(path.resolve(__dirname, FILE_PATH_TALKER), JSON.stringify(talker));
    return talker.filter((curr) => curr.id === idTalker);
  } catch (err) {
    console.error(`error: ${err.message}`);
  }
};

module.exports = {
  readTalkers,
  writeTalkers,
  updateTalkers,
};