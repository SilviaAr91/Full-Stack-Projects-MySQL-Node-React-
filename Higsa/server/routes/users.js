var express = require("express");
var router = express.Router();

const userController = require("../controllers/userController");
const validateUserRules = require("../middlewares/userValidator");
const connection = require("../config/db");
const tokenVerify_recovery = require("../middlewares/tokenVerify_recovery");

/* GET users listing. */

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
router.get("/check-email/:email", userController.checkEmail);
router.get("/verify/:token", userController.verifyToken);
router.put("/editUser", userController.editUser);
router.post("/home", userController.login);
router.post("/register", validateUserRules, userController.register);
router.get("/oneuser/:id", userController.oneUser);
router.put("/forgotPass/", userController.forgotPass);
router.put(
  "/passwordRecovery",
  tokenVerify_recovery,
  userController.passRecovery
);


router.get("/admin", userController.allCatering);
router.put("/disableUsers", userController.updateUsers);

//router.put("/oneuser/delete/:id", userController.logicalDelete); ruta para utilizar en el borrado lógico de un catering cuando este implementado

module.exports = router;
