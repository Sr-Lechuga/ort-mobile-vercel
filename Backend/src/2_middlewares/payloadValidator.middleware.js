
const payloadValidator = (schema) => {
  return (req, res, next) => {
    const { body } = req
    const { error } = schema.validate(body)

    if (error) {
      let message = error.details?.[0]?.message ?? 'Datos incorrectos'
      res.status(400).json({ message })
      return
    }

    next()
  }
}

module.exports = payloadValidator