//validations

const Joi = require("@hapi/joi");

//Register validation

const registerValidations = (data) => {
  const schema = {
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  };

  return Joi.validate(data, schema);
};

const loginValidations = (data) => {
  const schema = {
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  };

  return Joi.validate(data, schema);
};

module.exports.registerValidations = registerValidations;
module.exports.loginValidations = loginValidations;
