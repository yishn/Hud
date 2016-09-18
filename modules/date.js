const days = ['Sunday', 'Monday', 'Tuesday',
    'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December']

let cache = ''

exports.init = function(el, settings) {
    exports.element = el
    exports.settings = settings

    exports.update()
}

exports.update = function() {
    let date = new Date()
    let day = date.getDate()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()
    let th = 'th'

    if (day < 10 || day >= 20) {
        th = day % 10 == 1 ? 'st' : (day % 10 == 2 ? 'nd' : (day % 10 == 3 ? 'rd' : 'th'))
    }

    let text = days[date.getDay()] + ', ' + day + th + ' ' + months[date.getMonth()]
    if (text == cache) setTimeout(exports.update, 1000)
    else setTimeout(exports.update, (24 * 60 * 60 - hours * 60 * 60 - minutes * 60 - seconds) * 1000)

    exports.element.text(text)
    cache = text
}
