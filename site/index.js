/* globals $, notReactDOM */

function dedup(list) {
  return list.reduce((acc, item) => acc.includes(item) ? acc : acc.concat(item), [])
}

function map(array, fn) {
  return array.map(fn).join('')
}

function messageComponent({ text }) {
  return `
    <div>
      ${text}
    </div>
  `
}

function tableComponent({ data }) {
  const presets = Object.keys(data)
  const plugins = dedup([].concat(...presets.map(key => data[key]))).sort()
  return `
    <table class="table">
      <tr class="table-header">
        <th></th>
        ${map(presets, preset => `<th class="preset-head">${preset.substr(13)}</th>`)}
      </tr>
      ${map(plugins, plugin => `
        <tr>
          <td class="plugin-title">${plugin.substr(13)}</td>
          ${map(presets, preset => `<td class="plugin-mark">${data[preset].includes(plugin) ? 'X' : ''}</td>`)}
        </tr>
      `)}
    </table>
  `
}

function contentComponent({ loading, data }) {
  if (loading) {
    const text = 'Generating table from npm registry data...'
    return messageComponent({ text })
  }
  if (data) {
    return tableComponent({ data })
  }
}

function render(state) {
  notReactDOM.render(() => contentComponent(state), document.getElementById('content'))
}

function getPlugins() {
  return new Promise(function (resolve) {
    const presets = [
      'babel-preset-es2015',
      'babel-preset-es2016',
      'babel-preset-es2017',
      'babel-preset-latest',
      'babel-preset-stage-3',
      'babel-preset-stage-2',
      'babel-preset-stage-1',
      'babel-preset-stage-0'
    ]
    const apiServer = 'https://babel-preset-to-plugins-server-gizonfkwzx.now.sh'
    $.getJSON(`${apiServer}/parse?presets=${presets.join(',')}`, resolve)
  })
}

$(function () {
  render({ loading: true })
  getPlugins().then(function (data) {
    render({ data })
  })
})
