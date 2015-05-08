# thali-pouchdb-express Thali ACL Middleware for Express-PouchDB #

This project is to provide middleware for [express-pouchdb](https://github.com/pouchdb/express-pouchdb) to enforce ACLs using the [thali-acl](https://github.com/thaliproject/thali-acl) database.

# Installation #

```bash
$ npm install thali-pouchdb-express
```

# Usage #

```js
var PouchDB = require('pouchdb');
var ThaliAclDb = require('thali-acl-db');
var ThaliMiddleware = require('thali-pouchdb-express');

var express = require('express');
var app = express();

// Create and populate the ACL database
var acl = new ThaliAclDb('acl');

// Create the middleware component
var component = new ThaliMiddleware(acl);

app.use(component.middleware());
app.use('/db', require('express-pouchdb')(PouchDB));

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
```


# LICENSE #

The MIT License (MIT)

Copyright (c) 2015 Microsoft Corporation

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
