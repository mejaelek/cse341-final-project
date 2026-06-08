// middleware/validate.js
const { validationResult } = require('express-validator');

/**
 * Runs express-validator checks and returns 422 with all field errors if any fail.
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formatted = errors.array().map((err) => ({
      field: err.path,
      message: err.msg,
    }));
    return res.status(422).json({ errors: formatted });
  }
  next();
};

module.exports = validate;
