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

module.exports = {
  emailValidation,
  passwordValidation,
};