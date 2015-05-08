function noop() { }

var PouchDB = require('pouchdb');
var ThaliAclDb = require('thali-acl-db');
var ThaliMiddleware = require('../.');

var express = require('express');
var app = express();

// Create and populate the ACL database
var acl = new ThaliAclDb('acl', { db: require('memdown')});

acl.addRole('/db/foo')
  .then(function () {
    return acl.addUserToRole('joed', '/db/foo')
  })
  .then(noop);

// Create the middleware component
var component = new ThaliMiddleware(acl, 3);

// Override the current user ID
middleware._getUserId = function () {
  return 'joed';
};

var InMemPouchDB = PouchDB.defaults({db: require('memdown')});

app.use(component.middleware());
app.use('/db', require('express-pouchdb')(InMemPouchDB));

var myPouch = new InMemPouchDB('foo');

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
