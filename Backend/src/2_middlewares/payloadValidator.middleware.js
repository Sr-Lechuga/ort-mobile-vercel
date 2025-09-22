
const payloadValidator = (schema) => {
  return (req, res, next) => {
    const { body } = req
    const { error } = schema.validate(body)

    if (error) {
      error.placeOfError = 'Joi schema'
      error.name = 'JoiValidationError'
      return next(error)
    }

    next()
  }
}

module.exports = payloadValidator