const express = require("express");
const router = express.Router();
const dishController = require("../controllers/dishControllers");

router.get("/alldishes", dishController.getAllDishes);
router.post("/", dishController.createDish);
router.get("/getCategories", dishController.getCategories);
router.get("/:user_id", dishController.getAllDishesFromUser);
router.put("/disableddish", dishController.updateDish);
router.put("/editdish/:id", dishController.editDish);

module.exports = router;
