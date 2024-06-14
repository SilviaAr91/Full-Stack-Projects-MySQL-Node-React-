
const jwt = require("jsonwebtoken");
require("dotenv").config();
const tokenVerify_recovery = (req, res, next) => {
  let {token } = req.body
  if (!token) {
    return res.status(401).json("Error 401: Autenticación fallida.");
  }
  jwt.verify(token, process.env.TOKEN_SECRET, (err) => {
    if (err) {
      return res.status(401).json("Error 401: Autenticación fallida.");
    }
    next();
  });
};
module.exports = tokenVerify_recovery;
