const joi = require("joi");

const commentCreateSchema = joi
  .object({
    comment: joi.string().trim().min(1).max(1000).required().messages({
      "string.base": "El comentario debe ser una cadena de texto",
      "string.empty": "El comentario no puede estar vacío",
      "string.min": "El comentario debe tener al menos 1 caracter",
      "string.max": "El comentario no puede superar los 1000 caracteres",
      "any.required": "El comentario es obligatorio",
    }),
    rating: joi.number().integer().min(1).max(5).required().messages({
      "number.base": "La calificación debe ser un número",
      "number.integer": "La calificación debe ser un número entero",
      "number.min": "La calificación mínima permitida es 1",
      "number.max": "La calificación máxima permitida es 5",
      "any.required": "La calificación es obligatoria",
    }),
  })
  .required();

module.exports = {
  commentCreateSchema,
};
