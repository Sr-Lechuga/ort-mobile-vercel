const joi = require("joi");
const { ACTIVITY_INSTANCE_STATUS } = require("../../utils/constants");

const activityInstancePostRequestSchema = joi.object({
  activity: joi
    .string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.pattern.base":
        "El ID de la actividad debe ser un ObjectId válido",
      "any.required": "El ID de la actividad es requerido",
    }),

  startDate: joi.date().iso().min("now").required().messages({
    "date.base": "La fecha de inicio debe ser una fecha válida en formato ISO",
    "date.format":
      "La fecha de inicio debe estar en formato ISO: YYYY-MM-DDTHH:mm:ss",
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

  location: joi.string().trim().min(3).max(255).required().messages({
    "string.base": "La ubicación debe ser un texto",
    "string.empty": "La ubicación no puede estar vacía",
    "string.min": "La ubicación debe tener al menos 3 caracteres",
    "string.max": "La ubicación debe tener menos de 255 caracteres",
    "any.required": "La ubicación es requerida",
  }),

  location_coordinates: joi
    .object({
      type: joi.string().valid("Point").required().messages({
        "any.only": 'El tipo de coordenadas debe ser "Point"',
        "any.required": "El tipo de coordenadas es requerido",
      }),
      coordinates: joi
        .array()
        .items(joi.number())
        .length(2)
        .required()
        .messages({
          "array.base": "Las coordenadas deben ser un array",
          "array.length":
            "Las coordenadas deben tener exactamente 2 elementos [longitud, latitud]",
          "any.required": "Las coordenadas son requeridas",
        }),
    })
    .required()
    .messages({
      "object.base": "Las coordenadas de ubicación deben ser un objeto",
      "any.required": "Las coordenadas de ubicación son requeridas",
    }),

  status: joi
    .string()
    .valid(...ACTIVITY_INSTANCE_STATUS)
    .required()
    .messages({
      "any.only":
        "El estado debe ser uno de: " + ACTIVITY_INSTANCE_STATUS.join(", "),
      "any.required": "El estado es requerido",
    }),

  inscriptionsAmount: joi.number().integer().min(0).default(0).messages({
    "number.base": "La cantidad de inscriptos debe ser un número",
    "number.integer": "La cantidad de inscriptos debe ser un número entero",
    "number.min": "La cantidad de inscriptos no puede ser negativa",
  }),
});

// Esquema para actualizar una instancia de actividad
const activityInstancePutRequestSchema = joi.object({
  startDate: joi.date().iso().min("now").messages({
    "date.base": "La fecha de inicio debe ser una fecha válida en formato ISO",
    "date.format":
      "La fecha de inicio debe estar en formato ISO: YYYY-MM-DDTHH:mm:ss",
    "date.min": "La fecha de inicio debe ser actual o futura",
  }),

  duration: joi.number().integer().min(1).max(1440).messages({
    "number.base": "La duración debe ser un número",
    "number.integer": "La duración debe ser un número entero",
    "number.min": "La duración mínima es 1 minuto",
    "number.max": "La duración máxima es 1440 minutos (24 horas)",
  }),

  location: joi.string().trim().min(3).max(255).messages({
    "string.base": "La ubicación debe ser un texto",
    "string.empty": "La ubicación no puede estar vacía",
    "string.min": "La ubicación debe tener al menos 3 caracteres",
    "string.max": "La ubicación debe tener menos de 255 caracteres",
  }),

  location_coordinates: joi
    .object({
      type: joi.string().valid("Point").messages({
        "any.only": 'El tipo de coordenadas debe ser "Point"',
      }),
      coordinates: joi.array().items(joi.number()).length(2).messages({
        "array.base": "Las coordenadas deben ser un array",
        "array.length":
          "Las coordenadas deben tener exactamente 2 elementos [longitud, latitud]",
      }),
    })
    .messages({
      "object.base": "Las coordenadas de ubicación deben ser un objeto",
    }),

  status: joi
    .string()
    .valid(...ACTIVITY_INSTANCE_STATUS)
    .messages({
      "any.only":
        "El estado debe ser uno de: " + ACTIVITY_INSTANCE_STATUS.join(", "),
    }),

  inscriptionsAmount: joi.number().integer().min(0).messages({
    "number.base": "La cantidad de inscriptos debe ser un número",
    "number.integer": "La cantidad de inscriptos debe ser un número entero",
    "number.min": "La cantidad de inscriptos no puede ser negativa",
  }),
});

module.exports = {
  activityInstancePostRequestSchema,
  activityInstancePutRequestSchema,
};
