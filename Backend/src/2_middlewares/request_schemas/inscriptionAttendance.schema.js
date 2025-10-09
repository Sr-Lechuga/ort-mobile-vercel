const joi = require("joi");

const inscriptionAttendanceSchema = {
  type: "object",
  properties: {
    assisted: { type: "boolean" },
  },
  required: ["assisted"],
  additionalProperties: false,
};

module.exports = {
  inscriptionAttendanceSchema,
};
