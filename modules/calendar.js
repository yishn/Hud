var settings = require('../settings').calendar

var element

exports.init = function(el) {
    element = el

    exports.update()
    setInterval(exports.update, 1000)
}

exports.update = function() {
    var date = new Date()
    var hours = date.getHours()
    var minutes = date.getMinutes()
    minutes = minutes < 10 ? '0' + minutes : minutes

    element.text(hours + ':' + minutes)
}
