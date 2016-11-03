const request = require('request-promise')
const memoize = require('./simple-memoize')

function get(name) {
  const options = {
    uri: `https://registry.npmjs.org/${name}`,
    json: true
  }
  return request(options)
}

module.exports = {
  get: memoize(get, 60 * 60 * 1000)
}
