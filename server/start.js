const { resolve } = require('path')
const r = path => resolve(__dirname, path)
require('babel-core/register')({
  'presets': [
    'stage-3',
    'latest-node'
  ],
  'plugins': [
    'transform-decorators-legacy',

  ]
})

require('babel-polyfill')
require('./bin/www')
