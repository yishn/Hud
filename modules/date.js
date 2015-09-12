var element
var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December']

exports.init = function(el) {
    element = el

    exports.update()
    setInterval(exports.update, 1000)
}

exports.update = function() {
    var date = new Date()
    var day = date.getDate()
    var th = day >= 10 && day < 20 ? 'th' :
        (day % 10 == 1 ? 'st' : (day % 10 == 2 ? 'nd' : (day % 10 == 3 ? 'rd' : 'th')))

    element.text(days[date.getDay()] + ', ' + day + th + ' ' + months[date.getMonth()])
}
