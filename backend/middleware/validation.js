const { celebrate, Joi } = require("celebrate");
const validator = require("validator");

// Validate user creation
const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
});

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

// Validate card creation
const validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().custom(validateURL),
  }),
});

// Validate MongoDB user ID in params
const validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(), // ObjectId do MongoDB
  }),
});

// Validate headers
const validateAuth = celebrate({
  headers: Joi.object()
    .keys({
      authorization: Joi.string().required(),
    })
    .unknown(true), // Permite outros headers
});

module.exports = {
  validateCreateUser,
  validateCreateCard,
  validateUserId,
  validateAuth,
};
