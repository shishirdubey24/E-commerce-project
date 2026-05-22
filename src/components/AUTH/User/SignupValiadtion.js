import Joi from "joi";
export const signupSchema = Joi.object({
  username: Joi.string().min(3).required().messages({
    "string.empty": "Username is required",
    "string.min": "Username must be at least 3 characters",
    "any.required": "Username is required",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email address is required",
      "string.email": "Please enter a valid email address",
      "any.required": "Email address is required",
    }),
  phone: Joi.string()
    .pattern(/^[6-9][0-9]{9}$/)
    .required()
    .messages({
      "string.empty": "Phone number is required",
      "string.pattern.base": "Enter a valid 10 digit phone number",
      "any.required": "Phone number is required",
    }),
  password: Joi.string().min(4).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 8 characters",
    "any.required": "Password is required",
  }),
});
