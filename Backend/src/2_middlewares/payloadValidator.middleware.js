/**
 * Middleware que valida el cuerpo de la petición usando un esquema de Joi.
 * Si la validación falla, propaga un error tipificado para el manejador global.
 * @param {import("joi").ObjectSchema} schema - Esquema de validación a aplicar
 * @returns {import("express").RequestHandler} Middleware de validación
 */
const payloadValidator = (schema) => {
  return (req, res, next) => {
    const { body } = req;
    const { error } = schema.validate(body);

    if (error) {
      error.placeOfError = "Joi schema";
      error.name = "JoiValidationError";
      return next(error);
    }

    next();
  };
};

module.exports = payloadValidator;
