const argon2 = require("argon2");
const hashPassword = (req, res, next) => {
  // hash the password using argon2 then call next()
};
module.exports = {
  hashPassword,
};