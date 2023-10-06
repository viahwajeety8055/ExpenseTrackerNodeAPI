const express = require("express");
const expenseController = require("../controllers/expenseController");
const router = express.Router();

router.get("/expense", expenseController.get);
router.post("/expense", expenseController.create);
router.put("/expense", expenseController.update);
router.delete("/expense", expenseController.delete);

module.exports = router;
