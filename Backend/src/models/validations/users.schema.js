import joi from 'joi'

const volunteerSignUpSchema = Joi.object({
  username: joi
    .string()
    .min(3)
    .max(20)
    .required(),
  password: joi
    .string()
    .min(6)
    .max(30)
    .pattern(/\d/, 'number')
    .pattern(/[a-zA-Z]/, 'letter')
    .required()
    .messages({
      'string.pattern.number': 'Password requires at least 1 number and 1 letter',
      'string.pattern.letter': 'Password requires at least 1 number and 1 letter'
    }),
  name: joi
    .string()
    .min(3)
    .max(20)
    .required(),
  age: joi
    .number()
    .min(1)
    .max(110)
})

export {
  volunteerSignUpSchema
}