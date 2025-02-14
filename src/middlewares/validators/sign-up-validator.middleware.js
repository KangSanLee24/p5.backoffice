import Joi from "joi";
import { MESSAGES } from "../../constants/message.constant.js";
import { AUTH_CONSTANT } from "../../constants/auth.constant.js";

const schema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": MESSAGES.AUTH.COMMON.EMAIL.REQUIRED,
    "string.email": MESSAGES.AUTH.COMMON.EMAIL.INVALID_FORMAT,
  }),
  name: Joi.string().required().messages({
    "any.required": MESSAGES.AUTH.COMMON.NAME.REQURIED,
  }),
  password: Joi.string().min(AUTH_CONSTANT.PASSWORD_MIN_LENGTH).messages({
    "any.required": MESSAGES.AUTH.COMMON.PASSWORD.REQURIED,
    "string.min": MESSAGES.AUTH.COMMON.PASSWORD.MIN_LENGTH,
  }),
  passwordConfirm: Joi.string().valid(Joi.ref("password")).messages({
    "any.required": MESSAGES.AUTH.COMMON.PASSWORD_CONFIRM.REQURIED,
    "any.only": MESSAGES.AUTH.COMMON.PASSWORD_CONFIRM.NOT_MACHTED_WITH_PASSWORD,
  }),
  phone: Joi.string().messages({
    "any.required": MESSAGES.AUTH.COMMON.PHONE.REQURIED,
  }),
  address: Joi.string().messages({
    "any.required": MESSAGES.AUTH.COMMON.ADDRESS.REQURIED,
  }),
  verificationCode: Joi.number().required().messages({
    "any.required": MESSAGES.AUTH.SIGN_UP.VERIFICATION_CODE.REQUIRED,
  }),
});

export const signUpValidator = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
