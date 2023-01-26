const express = require('express');

const { readTalkers, writeTalkers, updateTalkers, deleteTalkers } = require('../utils/fsUtils');

const { fullTalkerValidation, tokenValidation } = require('../utils/validations');

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

router.get('/search', async (req, res) => {
  try {
    const searchParam = req.query.q;
    const token = req.headers.authorization;
    const validate = tokenValidation(token);
    if (validate !== true) {
      throw new Error(validate);
    }
    const talkers = await readTalkers();
    const regex = new RegExp(searchParam);
    const result = talkers.filter(({ name }) => regex.test(name));
    res.status(HTTP_OK_STATUS).json(result);
  } catch (err) {
    const messageError = err.message === 'tokUnd' ? 'Token não encontrado' : 'Token inválido';
    res.status(401).json({ message: messageError });
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
    if (validation !== true) throw new Error(validation);
    const talkerAdded = await writeTalkers(talker);
    res.status(201).json({ ...talkerAdded });
  } catch (err) {
    const code = (/(token)/i).test(err.message) === true ? 401 : 400;
    res.status(code).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const talker = req.body;
    const token = req.headers.authorization;
    const validation = fullTalkerValidation(talker, token);
    if (validation !== true) throw new Error(validation);
    const updatedTalker = await updateTalkers(Number(id), talker);
    res.status(200).json(...updatedTalker);
  } catch (err) {
    const code = (/(token)/i).test(err.message) === true ? 401 : 400;
    res.status(code).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization;
    const validate = tokenValidation(token);
    if (validate !== true) {
      throw new Error(validate);
    }
    await deleteTalkers(id);
    res.status(204).send();
  } catch (err) {
    const messageError = err.message === 'tokUnd' ? 'Token não encontrado' : 'Token inválido';
    res.status(401).json({ message: messageError });
  }
});
module.exports = router;
