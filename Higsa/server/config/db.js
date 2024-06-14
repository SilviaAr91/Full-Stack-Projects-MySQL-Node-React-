let mysql = require("mysql2");
require("dotenv").config();

let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  dateStrings: true,
});

connection.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("Conexión correcta a la BD");
  }
});

module.exports = connection;
