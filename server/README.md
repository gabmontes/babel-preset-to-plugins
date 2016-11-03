# Babel preset-to-plugins API server

This server provides a route to parse a [Babel presets](http://babeljs.io/docs/plugins/) and obtain all the plugins used.

It queries the `npm` registry to find out what presets and plugins uses the given presets. Compiles and dedups the results and returns it back as the response to the request

## API

### `GET /parse?plugins=<list>`

* `list` is a comma-separated string of Babel presets.

Response is a JSON object containing the name of the presets as keys and the values are arrays containing the names of the plugins.
