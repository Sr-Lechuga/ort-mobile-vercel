const joi = require("joi");

// Esquema para marcar asistencia de una inscripción
const inscriptionAttendanceSchema = joi.object({
  assisted: joi.boolean().required().messages({
    "boolean.base": "El campo asistencia debe ser un valor booleano",
    "any.required": "El campo asistencia es requerido",
  }),
});

module.exports = {
  inscriptionAttendanceSchema,
};
