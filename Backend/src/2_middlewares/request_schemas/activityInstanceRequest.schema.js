const joi = require("joi");
const { ACTIVITY_INSTANCE_STATUS } = require("../../utils/constants");

// Esquema para crear una instancia de actividad
const activityInstancePostRequestSchema = joi.object({
  date: joi.date().iso().min("now").required().messages({
    "date.base": "La fecha de inicio debe ser una fecha válida en formato ISO",
    "date.format": "La fecha de inicio debe estar en formato ISO: YYYY-MM-DDTHH:mm:ss",
    "date.min": "La fecha de inicio debe ser actual o futura",
    "any.required": "La fecha de inicio es requerida",
  }),

  duration: joi
    .number()
    .integer()
    .min(1)
    .max(1440) // 24 hours in minutes
    .required()
    .messages({
      "number.base": "La duración debe ser un número",
      "number.integer": "La duración debe ser un número entero",
      "number.min": "La duración mínima es 1 minuto",
      "number.max": "La duración máxima es 1440 minutos (24 horas)",
      "any.required": "La duración es requerida",
    }),

  quota: joi.number().integer().min(0).messages({
    "number.base": "La cuota debe ser un número",
    "number.integer": "La cuota debe ser un número entero",
    "number.min": "La cuota no puede ser negativa",
  }),

  status: joi
    .string()
    .valid(...ACTIVITY_INSTANCE_STATUS)
    .required()
    .messages({
      "any.only": "El estado debe ser uno de: " + ACTIVITY_INSTANCE_STATUS.join(", "),
      "any.required": "El estado es requerido",
    }),

  inscriptionsAmount: joi.number().integer().min(0).default(0).messages({
    "number.base": "La cantidad de inscriptos debe ser un número",
    "number.integer": "La cantidad de inscriptos debe ser un número entero",
    "number.min": "La cantidad de inscriptos no puede ser negativa",
  }),
});

// Esquema para actualizar una instancia de actividad
const activityInstancePatchRequestSchema = joi.object({
  date: joi.date().iso().min("now").messages({
    "date.base": "La fecha de inicio debe ser una fecha válida en formato ISO",
    "date.format": "La fecha de inicio debe estar en formato ISO: YYYY-MM-DDTHH:mm:ss",
    "date.min": "La fecha de inicio debe ser actual o futura",
  }),

  duration: joi.number().integer().min(1).max(1440).messages({
    "number.base": "La duración debe ser un número",
    "number.integer": "La duración debe ser un número entero",
    "number.min": "La duración mínima es 1 minuto",
    "number.max": "La duración máxima es 1440 minutos (24 horas)",
  }),

  quota: joi.number().integer().min(0).messages({
    "number.base": "La cuota debe ser un número",
    "number.integer": "La cuota debe ser un número entero",
    "number.min": "La cuota no puede ser negativa",
  }),

  status: joi
    .string()
    .valid(...ACTIVITY_INSTANCE_STATUS)
    .messages({
      "any.only": "El estado debe ser uno de: " + ACTIVITY_INSTANCE_STATUS.join(", "),
    }),

  inscriptionsAmount: joi.number().integer().min(0).messages({
    "number.base": "La cantidad de inscriptos debe ser un número",
    "number.integer": "La cantidad de inscriptos debe ser un número entero",
    "number.min": "La cantidad de inscriptos no puede ser negativa",
  }),
});

module.exports = {
  activityInstancePostRequestSchema,
  activityInstancePatchRequestSchema,
};
