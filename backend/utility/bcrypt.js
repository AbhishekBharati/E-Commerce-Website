const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const hashPassword = await bcrypt.hash(password, 5);
  return hashPassword;
}

const verifyPassword = async (plainPassword, hashedPassword) => {
  const bool = await bcrypt.compare(plainPassword, hashedPassword);
  return bool;
}

module.exports = {
  hashPassword,
  verifyPassword
}
