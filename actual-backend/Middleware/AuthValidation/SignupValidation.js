import Joi from "joi";
export const SignupValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(404).json({ message: "cant register user ", error });
  }
  next();
};
