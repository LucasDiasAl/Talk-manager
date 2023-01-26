const tokenGenHalf = () => {
  const halfToken = Math.random().toString(36).slice(2, 10);
  return halfToken;
};

const tokenGen = () => {
  const token = tokenGenHalf() + tokenGenHalf();
  return token;
};

module.exports = tokenGen;