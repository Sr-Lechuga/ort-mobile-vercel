const joi = require('joi')

const loginRequestSchema = joi.object({
  username: joi.string().max(30).required()
    .messages({
      'any.required': 'El Nombre de usuario es requerido',
      'string.empty': 'El Nombre de usuario es requerido',
      'string.max': 'El Nombre de usuario puede contener hasta 30 caracteres'
    }),
  password: joi.string().max(30).required()
    .messages({
      'any.required': 'La Contraseña es requerida',
      'string.empty': 'La Contraseña es requerida',
      'string.max': 'La Contraseña puede contener hasta 30 caracteres'
    })
})

module.exports = {
  loginRequestSchema
}