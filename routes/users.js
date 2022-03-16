var express = require("express");
var router = express.Router();
const controller = require("../Controller/user_controller");

// Routes
router.get("/users", controller.getUsers);

router.post("/register", controller.register);

router.post("/login", controller.login);

router.delete("/delete/:user_id", controller.deleteUserFindById);

module.exports = router;
