const config = require('config')
const cors = require('cors')
const express = require('express')

const logger = require('./lib/logger')
const parse = require('./lib/parse-babel-preset')
const promiseAll = require('./lib/promise-all')

const app = express()
app.use(cors())

app.get('/parse', function (req, res) {
  const { presets } = req.query

  if (!presets) {
    logger.warn('No presets found in request')
    res.status(422).end()
    return
  }

  const list = presets.split(',')
  logger.info(`Processing presets: ${list.join(', ')}`)

  const parsed = {}
  list.forEach(function (preset) {
    parsed[preset] = parse(preset)
  })
  promiseAll(parsed).then(function (plugins) {
    logger.info('Processing done')
    res.send(plugins)
  })
})

app.listen(config.port, function () {
  logger.info(`Server started on port ${config.port}`)
})
