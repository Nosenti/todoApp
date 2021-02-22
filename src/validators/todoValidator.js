import Joi from 'joi';

export function todoValidator(req, res, next) {
  const todoValidate = Joi.object({
    title: Joi.string().min(4).required().trim(),
    description: Joi.string().min(4).trim(),
    priority: Joi.string().required().trim()

  });
  const result = todoValidate.validate(req.body);
  if (result.error) return res.status(400).json({ Message: result.error.details[0].message });
  next();
}