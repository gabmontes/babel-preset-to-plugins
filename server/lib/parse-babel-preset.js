const npmPackage = require('./npm-package')
const dedup = require('./simple-dedup')

module.exports = function parsePreset(name) {
  return npmPackage(name)
    .get('dependencies')
    .then(function (dependencies) {
      const dependencyNames = Object.keys(dependencies)
      const plugins = dependencyNames
        .filter(d => d.startsWith('babel-plugin-'))
      return Promise.all(dependencyNames
        .filter(d => d.startsWith('babel-preset-'))
        .map(parsePreset)
      ).then(subPlugins => dedup(plugins.concat(...subPlugins)).sort())
    })
    .catch(function () {
      return 404
    })
}
