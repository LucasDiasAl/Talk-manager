const express = require('express');

const router = express.Router();

const tokenGen = require('../utils/tokenGen');

const { emailValidation, passwordValidation } = require('../utils/validations');

const HTTP_OK_STATUS = 200;

router.post('/', (req, res) => {
  try {
    const { email, password } = req.body;
    const valEmail = emailValidation(email);
    const valPass = passwordValidation(password);
    if (valEmail !== true) throw new Error(valEmail);
    if (valPass !== true) throw new Error(valPass);
    const token = tokenGen();
    res.status(HTTP_OK_STATUS).json({ token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;