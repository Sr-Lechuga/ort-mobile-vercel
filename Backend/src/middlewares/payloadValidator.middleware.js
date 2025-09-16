const payloadValidator = (schema) => {
  return (req, res, next) => {
    const { body } = req;
    const { error } = schema.validate(body);

    if (error) {
      console.log(error.details[0].message);
      res.status(400).json({
        message: 'fghghg',
      });
      return;
    }
    next();
  };
};

module.exports = {
  payloadValidator
}