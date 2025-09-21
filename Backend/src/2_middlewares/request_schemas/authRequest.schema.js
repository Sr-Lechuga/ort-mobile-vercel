const joi = require('joi')
const { VOLUNTEER_GENRE } = require('../../utils/constants')

const volunteerLoginRequestSchema = joi.object({
  username: joi.string().min(3).max(30).required()
    .messages({
      'any.required': 'El Nombre de usuario es requerido',
      'string.empty': 'El Nombre de usuario es requerido',
      'string.min': 'El Nombre de usuario debe contener al menos 3 caracteres',
      'string.max': 'El Nombre de usuario puede contener hasta 30 caracteres'
    }),
  password: joi.string().min(6).max(30).required()
    .messages({
      'any.required': 'La Contraseña es requerida',
      'string.empty': 'La Contraseña es requerida',
      'string.min': 'La Contraseña debe contener al menos 6 caracteres',
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
  email: joi.string().pattern(/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,6}$/).max(70).required()
    .messages({
      'any.required': 'El Email es requerida',
      'string.empty': 'El Email es requerida',
      'string.max': 'El Email puede contener hasta 70 caracteres',
      'string.pattern.base': 'Formato de Email incorrecto'
    }),
  password: joi.string().min(6).max(30).required()
    .messages({
      'any.required': 'La Contraseña es requerida',
      'string.empty': 'La Contraseña es requerida',
      'string.min': 'La Contraseña debe contener al menos 6 caracteres',
      'string.max': 'La Contraseña puede contener hasta 30 caracteres'
    }),
  name: joi.string().min(3).max(30).required()
    .messages({
      'any.required': 'El Nombre es requerido',
      'string.empty': 'El Nombre es requerido',
      'string.min': 'El Nombre debe contener al menos 3 caracteres',
      'string.max': 'El Nombre puede contener hasta 30 caracteres'
    }),
  lastname: joi.string().min(3).max(30).required()
    .messages({
      'any.required': 'El Apellido es requerido',
      'string.empty': 'El Apellido es requerido',
      'string.min': 'El Apellido debe contener al menos 3 caracteres',
      'string.max': 'El Apellido puede contener hasta 30 caracteres'
    }),
  age: joi.number().min(18).max(110).required()
    .messages({
      'any.required': 'La Edad es requerida',
      'number.base': 'La Edad no es válida',
      'number.min': 'Se debe ser mayor de edad para registrarse',
      'number.max': 'La Edad no es válida'
    }),
  genre: joi.string().valid(...VOLUNTEER_GENRE)
    .messages({
      'any.only': 'El género ingresado no es correcto'
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
  email: joi.string().pattern(/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,6}$/).max(70).required()
    .messages({
      'any.required': 'El Email es requerida',
      'string.empty': 'El Email es requerida',
      'string.max': 'El Email puede contener hasta 70 caracteres',
      'string.pattern.base': 'Formato de Email incorrecto'
    }),
  contactEmail: joi.string().pattern(/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,6}$/).max(70)
    .messages({
      'string.max': 'El Email de Contacto puede contener hasta 70 caracteres',
      'string.pattern.base': 'Formato de Email de Contacto incorrecto'
    }),
  password: joi.string().min(6).max(30).required()
    .messages({
      'any.required': 'La Contraseña es requerida',
      'string.empty': 'La Contraseña es requerida',
      'string.min': 'La Contraseña debe contener al menos 6 caracteres',
      'string.max': 'La Contraseña puede contener hasta 30 caracteres'
    }),
  name: joi.string().min(3).max(30).required()
    .messages({
      'any.required': 'El Nombre es requerido',
      'string.empty': 'El Nombre es requerido',
      'string.min': 'El Nombre debe contener al menos 3 caracteres',
      'string.max': 'El Nombre puede contener hasta 30 caracteres'
    }),
  telephone: joi.string().max(25)
    .messages({
      'string.max': 'El Teléfono puede contener hasta 25 caracteres'
    }),
  instagram: joi.string().max(25),
  facebook: joi.string().max(25),
  linkedIn: joi.string().max(25),
  personal: joi.string().max(120),
  country: joi.string().max(25),
  city: joi.string().max(25),
  street: joi.string().max(120),
  lat: joi.number(),
  lgn: joi.number(),
})

module.exports = {
  volunteerLoginRequestSchema,
  volunteerSignUpRequestSchema,
  organizerLoginRequestSchema,
  organizerSignUpRequestSchema
}