const express = require('express');

const { readTalkers } = require('../utils/fsUtils');

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

module.exports = router;
