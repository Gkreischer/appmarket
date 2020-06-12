// Copyright IBM Corp. 2014,2016. All Rights Reserved.
// Node module: loopback-example-ssl
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

const loopback = require('loopback');
const boot = require('loopback-boot');

const http = require('http');
const https = require('https');
const sslConfig = require('./ssl-config');

const app = module.exports = loopback();

const SSL = false;

if (SSL) {
  // boot scripts mount components like REST API
  boot(app, __dirname);

  app.start = function (httpOnly) {
    if (httpOnly === undefined) {
      httpOnly = process.env.HTTP;
    }
    let server = null;
    if (!httpOnly) {
      const options = {
        key: sslConfig.privateKey,
        cert: sslConfig.certificate,
      };
      server = https.createServer(options, app);
    } else {
      server = http.createServer(app);
    }
    server.listen(app.get('port'), function () {
      const baseUrl = (httpOnly ? 'http://' : 'https://') + app.get('host') + ':' + app.get('port');
      app.emit('started', baseUrl);
      console.log('LoopBack server listening @ %s%s', baseUrl, '/');
      if (app.get('loopback-component-explorer')) {
        const explorerPath = app.get('loopback-component-explorer').mountPath;
        console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
      }
    });
    return server;
  };

  // start the server if `$ node server.js`
  if (require.main === module) {
    app.start();
  }
} else {
  app.start = function() {
    // start the web server
    return app.listen(function() {
      app.emit('started');
      var baseUrl = app.get('url').replace(/\/$/, '');
      console.log('Web server listening at: %s', baseUrl);
      if (app.get('loopback-component-explorer')) {
        var explorerPath = app.get('loopback-component-explorer').mountPath;
        console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
      }
    });
  };
  // Bootstrap the application, configure models, datasources and middleware.
  // Sub-apps like REST API are mounted via boot scripts.
  boot(app, __dirname, function(err) {
    if (err) throw err;
    // start the server if `$ node server.js`
    if (require.main === module)
      app.start();
  });
}