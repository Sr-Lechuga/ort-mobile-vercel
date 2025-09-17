const joi = require('joi')

const volunteerLoginRequestSchema = joi.object({
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

const volunteerSignUpRequestSchema = joi.object({
  username: joi.string().min(3).max(30).required()
    .messages({
      'any.required': 'El Nombre de usuario es requerido',
      'string.empty': 'El Nombre de usuario es requerido',
      'string.min': 'El Nombre de usuario debe contener al menos 3 caracteres',
      'string.max': 'El Nombre de usuario puede contener hasta 30 caracteres'
    }),
  name: joi.string().min(3).max(30).required()
    .messages({
      'any.required': 'El Nombre es requerido',
      'string.empty': 'El Nombre es requerido',
      'string.min': 'El Nombre debe contener al menos 3 caracteres',
      'string.max': 'El Nombre puede contener hasta 30 caracteres'
    }),
  password: joi.string().min(3).max(30).required()
    .messages({
      'any.required': 'La Contraseña es requerida',
      'string.empty': 'La Contraseña es requerida',
      'string.min': 'La Contraseña debe contener al menos 3 caracteres',
      'string.max': 'La Contraseña puede contener hasta 30 caracteres'
    }),
  email: joi.string().pattern(/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,6}$/).max(70).required()
    .messages({
      'any.required': 'El Email es requerida',
      'string.empty': 'El Email es requerida',
      'string.max': 'El Email puede contener hasta 70 caracteres',
      'string.pattern.base': 'Formato de Email incorrecto'
    })
})

const organizerLoginRequestSchema = joi.object({
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

const organizerSignUpRequestSchema = joi.object({
  username: joi.string().min(3).max(30).required()
    .messages({
      'any.required': 'El Nombre de usuario es requerido',
      'string.empty': 'El Nombre de usuario es requerido',
      'string.min': 'El Nombre de usuario debe contener al menos 3 caracteres',
      'string.max': 'El Nombre de usuario puede contener hasta 30 caracteres'
    }),
  name: joi.string().min(3).max(30).required()
    .messages({
      'any.required': 'El Nombre es requerido',
      'string.empty': 'El Nombre es requerido',
      'string.min': 'El Nombre debe contener al menos 3 caracteres',
      'string.max': 'El Nombre puede contener hasta 30 caracteres'
    }),
  password: joi.string().min(3).max(30).required()
    .messages({
      'any.required': 'La Contraseña es requerida',
      'string.empty': 'La Contraseña es requerida',
      'string.min': 'La Contraseña debe contener al menos 3 caracteres',
      'string.max': 'La Contraseña puede contener hasta 30 caracteres'
    }),
  email: joi.string().pattern(/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,6}$/).max(70).required()
    .messages({
      'any.required': 'El Email es requerida',
      'string.empty': 'El Email es requerida',
      'string.max': 'El Email puede contener hasta 70 caracteres',
      'string.pattern.base': 'Formato de Email incorrecto'
    })
})

module.exports = {
  volunteerLoginRequestSchema,
  volunteerSignUpRequestSchema,
  organizerLoginRequestSchema,
  organizerSignUpRequestSchema
}