const secretKey = process.env.TOKEN_SECRET;
const jwt = require("jsonwebtoken");

const generateToken = (userId, email) => {
  return jwt.sign({ userId, email }, secretKey, {
    expiresIn: "1h",
  });
};

module.exports = { generateToken };
