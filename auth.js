const argon2 = require("argon2");
const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};
const hashPassword = async (req, res, next) => {
  const pwd = req.body.password;
  // hash the password using argon2 then call next()
  argon2
    .hash(pwd, hashingOptions)
    .then((hashedPassword) => {
      // do something with hashedPassword
      req.body.hashedPassword = hashedPassword;
      delete req.body.password;
      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
module.exports = {
  hashPassword,
};
