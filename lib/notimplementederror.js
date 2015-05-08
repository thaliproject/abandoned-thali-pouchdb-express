var inherits = require('util').inherits;

inherits(NotImplementedError, Error);

function NotImplementedError(message) {
  this.message = message || 'This method has not been implemented';

  Error.captureStackTrace(this, arguments);
  Error.call(this);
}

module.exports = NotImplementedError;
