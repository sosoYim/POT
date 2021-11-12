const Joi = require('joi');

// Reigster Validation

const registerValidation = data => {
  const schema = Joi.object({
    account: Joi.string().min(4).required(),
    password: Joi.string().min(8).required(),
    summoner: Joi.string().min(1).required(),
    imageUrl: Joi.string().min(1).required(),
    encryptedId: Joi.string().min(1).required(),
  });

  return schema.validate(data);
};

const loginValidation = data => {
  const schema = Joi.object({
    account: Joi.string().min(4).required(),
    password: Joi.string().min(8).required(),
  });

  return schema.validate(data);
};

module.exports = { registerValidation, loginValidation };
