var express = require("express");
var router = express.Router();
var menuController = require("../controllers/menuController");

router.post("/createMenu", menuController.createMenu);
router.put("/editWeek", menuController.editWeek);
router.post("/addDishes", menuController.addDishes);
router.get("/:user_id", menuController.getAllMenusAdmin);
router.get("/:user_id/:menu_id", menuController.getOneMenu);
router.get("/:user_id/:menu_id/getPlanning", menuController.getPlanning);
router.put("/:user_id/:menu_id/addWeek", menuController.addWeek);
router.delete("/:user_id/:menu_id/delete", menuController.deleteMenu);
router.put("/:user_id/:menu_id/:week_id/deleteWeek", menuController.deleteWeek);
router.put("/:user_id/:menu_id/edit", menuController.editMenu);
router.post(
  "/:user_id/:menu_id/:week_id/duplicateWeek",
  menuController.duplicarMenu
);
//router.put("/duplicar/:user_id/:menu_id/", menuController.duplicarMenu);
router.put("/duplicar/:user_id/:menu_id", menuController.duplicateMenu);
router.put("/generatexls/:user_id/:menu_id", menuController.getExcel);

module.exports = router;
