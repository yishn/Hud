exports.init = function(el, settings) {
    exports.element = el
    exports.settings = settings

    exports.update()
    setInterval(exports.update, 1000)
}

exports.update = function() {
    let date = new Date()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    minutes = minutes < 10 ? '0' + minutes : minutes

    exports.element.text(hours + ':' + minutes)
}
