import Joi from "joi";

import { name, email, password } from "../constants/regExp.js";

import {
  fieldRequired,
  nameInvalid,
  emailInvalid,
  passwordInvalid,
} from "../constants/validMessage.js";

const loginSchema = Joi.object({
  email: Joi.string()
    .pattern(email)
    .required()
    .messages({
      "any.required": fieldRequired("email"),
      "string.pattern.base": emailInvalid,
    }),
  password: Joi.string()
    .min(8)
    .max(64)
    .pattern(password)
    .required()
    .messages({
      "any.required": fieldRequired("password"),
      "string.pattern.base": passwordInvalid,
    }),
});

const registerSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(32)
    .pattern(name)
    .required()
    .messages({
      "any.required": fieldRequired("name"),
      "string.pattern.base": nameInvalid,
    }),
  email: Joi.string()
    .pattern(email)
    .required()
    .messages({
      "any.required": fieldRequired("email"),
      "string.pattern.base": emailInvalid,
    }),
  password: Joi.string()
    .min(8)
    .max(64)
    .pattern(password)
    .required()
    .messages({
      "any.required": fieldRequired("password"),
      "string.pattern.base": passwordInvalid,
    }),
});

const updateSchema = Joi.object({
  name: Joi.string().min(2).max(32).pattern(name).messages({
    "string.pattern.base": nameInvalid,
  }),
  email: Joi.string().min(2).max(32).pattern(email).messages({
    "string.pattern.base": emailInvalid,
  }),
  password: Joi.string().min(2).max(32).pattern(password).allow(null).messages({
    "string.pattern.base": passwordInvalid,
  }),
});

const updateTheme = Joi.object({
  // write the code here
});

const authSchemas = { loginSchema, registerSchema, updateSchema, updateTheme };

export default authSchemas;