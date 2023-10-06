const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const expenseController = require("../controllers/expenseController");
const router = express.Router();

router.get("/getUser", userController.get);
router.post("/createUser", userController.create);
router.put("/updateUser", userController.update);
router.delete("/deleteUser", userController.delete);

// router.post("/register", authController.register);
// router.post("/login", authController.login);

router.get("/getExpense", expenseController.get);
router.post("/createExpense", expenseController.create);
router.put("/updateExpense", expenseController.update);
router.delete("/deleteExpense", expenseController.delete);

module.exports = router;
