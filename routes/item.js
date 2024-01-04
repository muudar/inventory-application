const express = require("express");
const router = express.Router();

const item_controller = require("../controllers/itemController");

router.get("/add", item_controller.item_create_get);

module.exports = router;
