const joi = require("joi");
const {
  ACTIVITY_CATEGORIES,
  ACTIVITY_STATUS,
} = require("../../utils/constants");

const activityPostRequestSchema = joi.object({
  title: joi.string().required().messages({
    "string.base": "El título debe ser un texto",
    "any.required": "El título es requerido",
  }),
  categories: joi.array()
    .items(
      joi.string().valid(...ACTIVITY_CATEGORIES)
        .messages({
          "any.only": "La categoría ingresada no es correcta",
          "string.base": "La categoría ingresada no es correcta",
        })
    )
    .min(1)
    .max(3)
    .required()
    .messages({
      "array.base": "La o las categorías ingresadas no son correctas",
      "array.min": "Debe ingresar al menos 1 categoría",
      "array.max": "Se pueden ingresar hasta 3 categorías",
      "any.required": "Las categorías son requeridas",
    }),
  description: joi.string()
    .messages({ "string.base": "La descripción debe ser un texto" }),
  /*   date: joi.date().iso().messages({
      "date.base":
        "La fecha ingresada no contiene el formato ISO correcto: YYYY-MM-DD o con hora YYYY-MM-DDTHH:mm:ss",
      "date.format":
        "La fecha ingresada no contiene el formato ISO correcto: YYYY-MM-DD o con hora YYYY-MM-DDTHH:mm:ss",
    }), */
  /*   status: joi.string().valid(...ACTIVITY_STATUS)
      .messages({
        "any.only": "El estado ingresado no es correcto",
        "string.base": "El estado debe ser un texto",
      }), */
  location: joi.object({
    country: joi.string().max(25).required().messages({
      "string.base": "El país debe ser un texto",
      "string.max": "El país no puede tener más de 25 caracteres",
      "any.required": "El país es requerido",
    }),
    city: joi.string().max(25).required().messages({
      "string.base": "La ciudad debe ser un texto",
      "string.max": "La ciudad no puede tener más de 25 caracteres",
      "any.required": "La ciudad es requerida",
    }),
    address: joi.string().max(255).required().messages({
      "string.base": "La dirección debe ser un texto",
      "string.max": "La dirección no puede tener más de 255 caracteres",
      "any.required": "La dirección es requerida",
    }),
  })
    .required()
    .messages({
      "object.base": "La ubicación debe ser un objeto",
      "any.required": "La ubicación es requerida",
    }),
  /*   locationCoordinates: joi
      .object({
        type: joi.string().valid("Point").required().messages({
          "any.only": 'El tipo de coordenadas debe ser "Point"',
          "any.required": "El tipo de coordenadas es requerido",
        }),
        coordinates: joi.array().items(joi.number()).length(2).required()
          .messages({
            "array.base": "Las coordenadas deben ser un array",
            "array.length": "Las coordenadas deben ser [longitud, latitud]",
            "any.required": "Las coordenadas son requeridas",
          }),
      })
      .required()
      .messages({
        "object.base": "Las coordenadas de ubicación deben ser un objeto",
        "any.required": "Las coordenadas de ubicación son requeridas",
      }), */
});

const activityPatchRequestSchema = joi.object({
  title: joi.string().required().messages({
    "string.base": "El título debe ser un texto",
    "any.required": "El título es requerido",
  }),
  categories: joi.array()
    .items(
      joi.string().valid(...ACTIVITY_CATEGORIES)
        .messages({
          "any.only": "La categoría ingresada no es correcta",
          "string.base": "La categoría ingresada no es correcta",
        })
    )
    .min(1)
    .max(3)
    .required()
    .messages({
      "array.base": "La o las categorías ingresadas no son correctas",
      "array.min": "Debe ingresar al menos 1 categoría",
      "array.max": "Se pueden ingresar hasta 3 categorías",
      "any.required": "Las categorías son requeridas",
    }),
  description: joi.string()
    .messages({ "string.base": "La descripción debe ser un texto" }),
  status: joi.string().valid(...ACTIVITY_STATUS)
    .messages({
      "any.only": "El estado ingresado no es correcto",
      "string.base": "El estado debe ser un texto",
    }),
  location: joi.object({
    country: joi.string().max(25).required().messages({
      "string.base": "El país debe ser un texto",
      "string.max": "El país no puede tener más de 25 caracteres",
      "any.required": "El país es requerido",
    }),
    city: joi.string().max(25).required().messages({
      "string.base": "La ciudad debe ser un texto",
      "string.max": "La ciudad no puede tener más de 25 caracteres",
      "any.required": "La ciudad es requerida",
    }),
    address: joi.string().max(255).required().messages({
      "string.base": "La dirección debe ser un texto",
      "string.max": "La dirección no puede tener más de 255 caracteres",
      "any.required": "La dirección es requerida",
    }),
  })
    .required()
    .messages({
      "object.base": "La ubicación debe ser un objeto",
      "any.required": "La ubicación es requerida",
    }),
  /*   locationCoordinates: joi.object({
      type: joi.string().valid("Point").required().messages({
        "any.only": 'El tipo de coordenadas debe ser "Point"',
        "any.required": "El tipo de coordenadas es requerido",
      }),
      coordinates: joi.array().items(joi.number()).length(2).required()
        .messages({
          "array.base": "Las coordenadas deben ser un array",
          "array.length": "Las coordenadas deben ser [longitud, latitud]",
          "any.required": "Las coordenadas son requeridas",
        }),
    })
      .required()
      .messages({
        "object.base": "Las coordenadas de ubicación deben ser un objeto",
        "any.required": "Las coordenadas de ubicación son requeridas",
      }), */
});

module.exports = {
  activityPostRequestSchema,
  activityPatchRequestSchema
};
