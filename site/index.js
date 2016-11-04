/* globals $ */

function dedup(list) {
  return list.reduce((acc, item) => acc.includes(item) ? acc : acc.concat(item), [])
}

function messageComponent(selector) {
  return {
    render: function (state = {}) {
      $(selector).html(`
        <div>
          ${state.text}
        </div>
      `)
    }
  }
}

function tableComponent(selector) {
  return {
    render: function (state = {}) {
      const presets = Object.keys(state)
      const plugins = dedup([].concat(...presets.map(key => state[key]))).sort()
      $(selector).html(`
        <table>
          <tr>
            <th></th>
            ${presets.map(preset => `<th>${preset}</th>`).join('')}
          </tr>
          ${plugins.map(plugin => `
            <tr>
              <td>${plugin}</td>
              ${presets.map(preset => `<td>${state[preset].includes(plugin) ? 'X' : ''}</td>`).join('')}
            </tr>
          `).join('')}
        </table>
      `)
    }
  }
}

function contentComponent(selector) {
  return {
    render: function (state = {}) {
      if (state.loading) {
        messageComponent(selector).render({
          text: 'Generating table from npm registry data...'
        })
        return
      }
      if (state.data) {
        tableComponent(selector).render(state.data)
        return
      }
    }
  }
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
    $.getJSON(`${apiServer}/parse?presets=${presets.join(',')}`, data => resolve({ data }))
  })
}

$(function () {
  const render = contentComponent('#content').render
  render({ loading: true })
  getPlugins().then(render)
})
