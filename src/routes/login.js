const express = require('express');

const router = express.Router();

const tokenGen = require('../utils/tokenGen');

const HTTP_OK_STATUS = 200;

router.post('/', (req, res) => {
  try {
    const token = tokenGen();
    res.status(HTTP_OK_STATUS).json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;