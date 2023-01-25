const express = require('express');

const { readTalkers } = require('../utils/fsUtils');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const talkers = await readTalkers();
    res.status(200).json([...talkers]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// router.get('/:id', async (req, res) => {

// });

module.exports = router;
