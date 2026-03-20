const Joi = require('joi');

exports.createNoteSchema = Joi.object({
  userId: Joi.number().integer().positive().required(),
  title: Joi.string().min(1).required(),
  completed: Joi.boolean().default(false)
});

exports.updateNoteSchema = Joi.object({
  userId: Joi.number().integer().positive(),
  title: Joi.string().min(1),
  completed: Joi.boolean()
}).min(1);

exports.idParamSchema = Joi.object({
  id: Joi.number().integer().positive().required()
});
