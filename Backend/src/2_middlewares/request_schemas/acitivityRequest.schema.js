const joi = require('joi')
const { ACTIVITY_CATEGORIES } = require('../../utils/constants')

const activityPostRequestSchema = joi.object({
  title: joi.string().required(),
  categories: joi.array()
    .items(
      joi.string().valid(...ACTIVITY_CATEGORIES).min(1)
        .messages({
          'any.only': 'La categoría ingresada no es correcta',
          'string.base': 'La categoría ingresada no es correcta'
        })
    )
    .min(1)
    .max(3)
    .messages({
      'array.base': 'La o las categorías ingresadas no son correctas',
      'array.min': 'Debe ingresar al menos 1 categoría',
      'array.max': 'Se pueden ingresar hasta 3 categorías'
    }),
  description: joi.string()
    .messages({ 'string.base': 'La descripción debe ser un texto' }),
  date: joi.date().iso()
    .messages({
      'date.base': 'La fecha ingresada no contiene el formato ISO correcto: YYYY-MM-DD o con hora YYYY-MM-DDTHH:mm:ss',
      'date.format': 'La fecha ingresada no contiene el formato ISO correcto: YYYY-MM-DD o con hora YYYY-MM-DDTHH:mm:ss'
    }),
  open: joi.boolean()
    .messages({ 'boolean.base': 'El campo open debe ser un boolean' })
})

module.exports = {
  activityPostRequestSchema
}