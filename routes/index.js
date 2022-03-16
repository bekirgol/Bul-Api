const express = require("express");
const router = express.Router();
const controller = require("../Controller/index_controller");

router.get("/", controller.getIndex);

module.exports = router;
