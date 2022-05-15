var express = require("express");
var router = express.Router();
const controller = require("../Controller/user_controller");
const validate = require("../Middleware/validate");
const schemas = require("../Validations/users");

router
  .route("/register")
  .post(validate(schemas.createValidation), controller.register);

router
  .route("/login")
  .post(validate(schemas.loginValidation), controller.login);

router.delete("/delete/:user_id", controller.deleteUserFindById);

module.exports = router;
