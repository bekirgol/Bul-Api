const validate = (schema) => (req, res, next) => {
  const { value, error } = schema.validate(req.body);
  if (error) {
    const errorMessage = error.details
      ?.map((detail) => detail.message)
      .join(", ");

    res.status(500).send(errorMessage);
    return;
  }

  Object.assign(req, value);
  return next();
};

module.exports = validate;
