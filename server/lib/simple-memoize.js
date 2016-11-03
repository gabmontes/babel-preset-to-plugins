module.exports = function (fn, maxAge) {
  const cache = {}

  return function (...args) {
    const key = JSON.stringify(args)
    const now = Date.now()

    if (!cache[key] || now > cache[key].expires) {
      cache[key] = { value: fn(...args), expires: now + maxAge }
    }

    return cache[key].value
  }
}
