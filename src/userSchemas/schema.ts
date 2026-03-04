import Joi from "joi";

export const validateStudent = (input: unknown) => {
  const schema = Joi.object({
    regNo: Joi.string().min(5).required(),
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phone: Joi.string().pattern(/^[0-9+]+$/).required(),
    createdAt: Joi.date().optional(),
    updatedAt: Joi.date().optional()
  });

  return schema.validate(input, { abortEarly: false });
};