var inherits = require('util').inherits;

inherits(HttpError, Error);

function HttpError(code, message) {
  this.code = code;
  this.message = message;

  Error.captureStackTrace(this, arguments);
  Error.call(this);
}

module.exports = HttpError;
