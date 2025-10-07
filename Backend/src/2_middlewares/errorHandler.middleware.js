const { logError, parseMongooseSchemaErrorMessages, parseMongoDBErrorMessages } = require("./helpers/errorHandler.helper")

const errorHandler = (err, req, res, next) => {
  logError(err)
  // Error de validacion de Joi Schema
  if (err.name == 'JoiValidationError') {
    const message = err.details?.[0]?.message ?? "Datos incorrectos"
    res.status(400).json({ message })
    return
  }

  // Error de validacion de Mongoose Schema
  if (err.name == "ValidationError") {
    const messages = parseMongooseSchemaErrorMessages(err)
    res.status(400).json({ message: messages[0] || "Datos incorrectos" })
    return
  }

  // Error de base de datos MongoDD [ej. campos duplicados]
  if (err.name == "MongoServerError") {
    const message = parseMongoDBErrorMessages(err) || "Datos incorrectos"
    res.status(409).json({ message })
    return
  }

  // Error personalizado para cuando no se encuentre un recurso
  if (err.message.startsWith("ERROR 001")) {
    const message = err.message.split(", ")[1]
    res.status(404).json({ message })
    return
  }

  // Error personalizado para cuando la Instancia no acepta Inscripciones
  if (err.message.startsWith("ERROR 010")) {
    const message = err.message.split(", ")[1]
    res.status(409).json({ message })
    return
  }

  // Error personalizado para cuando el Voluntario intenta borrar una Inscripcion que no le pertenece
  if (err.message.startsWith("ERROR 011")) {
    const message = err.message.split(", ")[1]
    res.status(409).json({ message })
    return
  }

  // Para loguear errores que no se estén controlando
  //logError(err)
  res.status(500).json({ message: "Algo no salió incorrectamente. Por favor intente nuevamente" })
}

module.exports = errorHandler