'use strict'

var express = require('express')
var httpProxy = require('http-proxy')
var url = require('url')

var defaultOpts = { host: 'localhost', port: '8000', prefix: '/v1' }

function getAuth (req, opts) {
  if (typeof opts.auth === 'string') return opts.auth

  if (typeof req.session !== 'object' &&
      typeof opts.defaultUser === 'string' &&
      typeof opts.defaultPass === 'string') {
    return opts.defaultUser + ':' + opts.defaultPass
  }

  if (typeof req.session.user === 'object' &&
      typeof req.session.user.name === string &&
      typeof req.session.user.password === string) {
    return req.session.user.name + ':' + req.session.user.password
  }

  console.error('can\'t get auth')

  return null
}

function createProxy(options) {
  var opts = Object.assign({}, defaultOpts, options)

  var target = url.format({
    protocol: 'http',
    hostname: opts.host,
    port: opts.port,
    pathname: opts.prefix
  })

  var proxy = httpProxy.createProxyServer({ target: target })

  var router = express.Router()

  router.all('*', function (req, res) {
    proxy.web(req, res, { auth: getAuth(req, opts) }, function (e) {
      console.log(e)
      res.send(500)
    })
  })

  return router
}

module.exports = createProxy;
