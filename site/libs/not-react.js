(function (global) {
  global.notReactDOM = {
    render: function (component, element) {
      element.innerHTML = component()
    }
  }
})(this)
