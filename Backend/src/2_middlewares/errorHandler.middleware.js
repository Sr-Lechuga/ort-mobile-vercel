const { logError, parseMongooseSchemaErrorMessages, parseMongoDBErrorMessages } = require("./helpers/errorHandler.helper")

const errorHandler = (err, req, res, next) => {
  logError(err)
  // Error de validacion de Joi Schema
  if (err.name == 'JoiValidationError') {
    const message = err.details?.[0]?.message ?? 'Datos incorrectos'
    res.status(400).json({ message })
    return
  }

  // Error de validacion de Mongoose Schema
  if (err.name == 'ValidationError') {
    const messages = parseMongooseSchemaErrorMessages(err)
    res.status(400).json({ message: messages[0] || 'Datos incorrectos' })
    return
  }

  // Error de base de datos MongoDD [ej. campos duplicados]
  if (err.name == 'MongoServerError') {
    const message = parseMongoDBErrorMessages(err) || 'Datos incorrectos'
    res.status(409).json({ message })
    return
  }

  // Para loguear errores que no se estén controlando
  //logError(err)
  res.status(500).json({ message: 'Algo no salió incorrectamente. Por favor intente nuevamente' })
}

module.exports = errorHandler