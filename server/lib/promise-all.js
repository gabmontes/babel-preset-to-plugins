module.exports = function (obj) {
  if (Array.isArray(obj)) {
    return Promise.all(obj)
  }

  const keys = Object.keys(obj)
  return Promise.all(keys.map(key => Promise.resolve(obj[key])))
    .then(values => keys.reduce(function (results, key) {
      results[key] = values.shift()
      return results
    }, {}))
}
