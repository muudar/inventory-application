const express = require("express");
const router = express.Router();

const category_controller = require("../controllers/categoryController");

router.get("/add", category_controller.category_create_get);

module.exports = router;
