import Joi from 'joi';

export function userSignUpValidate(req, res, next) {
  const userSignUp = Joi.object({
    name: Joi.string().min(4).required(),
    email: Joi.string().min(8).required().email()
      .trim(),
    password: Joi.string().min(6).required()
      .trim(),
    confirmPassword: Joi.string().min(6).required().trim()

  });
  const result = userSignUp.validate(req.body);
  if (result.error) return res.status(400).json({ Message: result.error.details[0].message });
  next();
}