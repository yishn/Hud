var element

exports.init = function(el) {
    element = el

    exports.update()
    setInterval(exports.update, 1000)
}

exports.update = function() {
    var date = new Date()
    element.text(date.getHours() + ':' + date.getMinutes())
}
