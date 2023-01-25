const tokenGenHalf = () => {
  const halfToken = Math.random().toString(36).substr(2).slice(0, 8);
  return halfToken;
};

const tokenGen = () => {
  const token = tokenGenHalf() + tokenGenHalf();
  return token;
};

module.exports = tokenGen;