const express = require('express');

const { readTalkers, writeTalkers } = require('../utils/fsUtils');

const { fullTalkerValidation } = require('../utils/validations');

const HTTP_OK_STATUS = 200;

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const talkers = await readTalkers();
    res.status(HTTP_OK_STATUS).json([...talkers]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const talker = (await readTalkers()).filter(({ id }) => id === Number(req.params.id));
    if (talker.length === 0) {
      throw new Error('Pessoa palestrante não encontrada');
    }
    res.status(HTTP_OK_STATUS).json(...talker);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const talker = req.body;
    const token = req.headers.authorization;
    const validation = fullTalkerValidation(talker, token);
    console.log(validation, token);
    if (validation !== true) throw new Error(validation);
    const talkerAdded = await writeTalkers(talker);
    res.status(201).json({ ...talkerAdded });
  } catch (err) {
    const code = (/(token)/i).test(err.message) === true ? 401 : 400;
    res.status(code).json({ message: err.message });
  }
});

module.exports = router;
