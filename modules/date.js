var days = ['Sunday', 'Monday', 'Tuesday',
    'Wednesday', 'Thursday', 'Friday', 'Saturday']
var months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'November', 'December']

exports.init = function(el, settings) {
    exports.element = el
    exports.settings = settings

    exports.update()
    setInterval(exports.update, 1000)
}

exports.update = function() {
    var date = new Date()
    var day = date.getDate()
    var th = 'th'

    if (day < 10 || day >= 20) {
        th = day % 10 == 1 ? 'st' : (day % 10 == 2 ? 'nd' : (day % 10 == 3 ? 'rd' : 'th'))
    }

    exports.element.text(days[date.getDay()] + ', ' + day + th + ' ' + months[date.getMonth()])
}
