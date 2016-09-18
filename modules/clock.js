let cache = ''

exports.init = function(el, settings) {
    exports.element = el
    exports.settings = settings

    exports.update()
}

exports.update = function() {
    let date = new Date()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()
    minutes = minutes < 10 ? '0' + minutes : minutes

    let text = hours + ':' + minutes

    if (text == cache) setTimeout(exports.update, 1000)
    else setTimeout(exports.update, (60 - seconds) * 1000)

    exports.element.text(text)
    cache = text
}
