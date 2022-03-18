const express = require("express");
const router = express.Router();
const controller = require("../Controller/index_controller");
const authendicate = require("../Middleware/authendicate");

router.get("/", controller.getIndex);

module.exports = router;
