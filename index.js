var HttpError = require('./lib/httperror');
var NotImplementedError = require('./lib/notimplementederror');

function notImplemented(method) {
  throw new NotImplementedError(method + ' must be implemented.');
}

function ThaliMiddleware(acl, numberOfComponents) {
  this._acl = acl;
  this._numberOfComponents = numberOfComponents;
}

ThaliMiddleware.prototype.middleware = function () {
  var self = this;
  return function (req, res, next) {
    var url, user, resource;

    user = self._getUserId(req, res);

    if (user == null) {
      return next(new HttpError(401, 'User is unauthorized'));
    }

    url = req.url.split('?')[0];
    if (!self._numPathComponents) {
      resource = url;
    } else {
      resource = url.split('/').slice(0,self._numPathComponents+1).join('/');
    }

    self._acl.isAllowed(userId, resource).then(
      function (result) {
        if (!result) {
          next(new HttpError(403, 'User has insufficient permissions'));
        } else {
          next();
        }
      },
      function (err) {
        next(new Error('Error checking permission to resource'));
      }
    );
  };
};

/**
 * Gets the user for the request.  Can be overridden with custom logic.
 * @param {Request} req The incoming request
 * @param {Response} res The outgoing response
 * @returns {String} the user name.
 */
ThaliMiddleware.prototype._getUserId(req, res) {
  return req.session && req.session.userId != null ?
    req.session.userId :
    null;
};

module.exports = ThaliMiddleware;
