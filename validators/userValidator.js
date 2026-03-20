const Joi = require('joi');

exports.createUserSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

exports.updateUserSchema = Joi.object({
  name: Joi.string().min(2),
  email: Joi.string().email(),
  password: Joi.string().min(6)
}).min(1);

exports.idParamSchema = Joi.object({
  id: Joi.number().integer().positive().required()
});
