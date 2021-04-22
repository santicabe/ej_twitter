const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

module.exports = (pass) => {
  return bcrypt.hashSync(pass, salt);
};
