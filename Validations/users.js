const joi = require("joi");

const createValidation = joi.object({
  name: joi.string().required().min(3),
  lastName: joi.string().required().min(3),
  mail: joi.string().required().email({ minDomainSegments: 2 }),
  password: joi.string().required().min(6),
});

const loginValidation = joi.object({
  mail: joi.string().required().email({ minDomainSegments: 2 }),
  password: joi.string().required().min(6),
});

module.exports = {
  createValidation,
  loginValidation,
};
