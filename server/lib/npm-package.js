const npmRegistry = require('./npm-registry')

const packageMethods = {
  fetch: function () {
    return npmRegistry.get(this.name)
  },
  get: function (property) {
    return this.fetch().then(function (data) {
      return data.versions[data['dist-tags'].latest][property]
    })
  }
}

module.exports = function (name) {
  return Object.assign(Object.create(packageMethods), { name })
}
