const global = require('./global')
const settings = require('./settings')
const network = require('./network')

module.exports = Object.assign({}, global, settings, network)
