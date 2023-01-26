const errosMessages = {
  tokUnd: 'Token não encontrado',
  tokInv: 'Token inválido',
  nameUnd: 'O campo "name" é obrigatório',
  nameInv: 'O "name" deve ter pelo menos 3 caracteres',
  ageUnd: 'O campo "age" é obrigatório',
  ageInv: 'A pessoa palestrante deve ser maior de idade',
  talkUnd: 'O campo "talk" é obrigatório',
  watchedAtUnd: 'O campo "watchedAt" é obrigatório',
  watchedAtInv: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
  rateUnd: 'O campo "rate" é obrigatório',
  rateInv: 'O campo "rate" deve ser um inteiro de 1 à 5',
};

const emailValidation = (email = undefined) => {
  const regex = (/[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);
  if (email === undefined) return 'O campo "email" é obrigatório';
  if (!regex.test(email)) return 'O "email" deve ter o formato "email@email.com"';
  return true;
};

const passwordValidation = (password = undefined) => {
  if (password === undefined) return 'O campo "password" é obrigatório';
  if (password.length < 6) return 'O "password" deve ter pelo menos 6 caracteres';
  return true;
};

const objValidation = (obj) => {
  const valKeys = ['name', 'age', 'talk', 'watchedAt', 'rate'];
  if (!obj.talk) return 'talkUnd';
  const objKey = [...Object.keys(obj), ...Object.keys(obj.talk)];
  const missing = valKeys.filter((curr) => objKey.includes(curr) === false);
  return missing.length === 0 ? true : `${missing}Und`;
};

const tokenValidation = (tok = undefined) => {
  if (!tok) return 'tokUnd';
  if (tok.length < 16) return 'tokInv';
  return true;
};

const talkerValid = ({ name = undefined, age = undefined }) => {
  if (name === undefined) return 'nameUnd';
  if (name.length < 3) return 'nameInv';
  if (age < 18) return 'ageInv';
  return true;
};

const watchedAtValidation = ({ talk = { watchedAt: '' } }) => {
  const { watchedAt } = talk;
  const regex = /(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d/;
  if (!regex.test(watchedAt)) return 'watchedAtInv';
  return true;
};

const rateKeyValidation = ({ talk = { rate: '' } }) => {
  const { rate } = talk;
  if (rate < 1 || rate > 5 || !(Number.isInteger(rate))) return 'rateInv';
  return true;
};

const fullTalkerValidation = (obj, token) => {
  const valResults = [tokenValidation(token), objValidation(obj), talkerValid(obj),
  watchedAtValidation(obj), rateKeyValidation(obj)];
  const anyInv = valResults.filter((curr) => curr !== true);
  if (anyInv.length === 0) return true;
  return errosMessages[anyInv[0]];
};

const test = () => {
  console.log(tokenValidation());
};
test();

module.exports = {
  emailValidation,
  passwordValidation,
  fullTalkerValidation,
};