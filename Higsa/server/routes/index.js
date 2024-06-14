var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connection = require("../config/db");
const { body, validationResult } = require("express-validator");
const indexController = require("../controllers/indexController");


// Ruta para otras acciones, como el home page
router.get('/getIcons', indexController.getIcons)


module.exports = router;