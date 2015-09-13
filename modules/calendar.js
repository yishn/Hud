var parseICS = require('ics-parser')
var request = require('request')
var settings = require('../settings').calendar

var element

exports.init = function(el) {
    element = el

    exports.update()
    setInterval(exports.update, settings.interval)
}

exports.update = function() {
    exports.request(function(data) {
        if (!data) return

        var item = data[0]
        var startDate = item.startDate
        var time = ''

        if (startDate.getHours() != 0 || startDate.getMinutes() != 0)
            time = startDate.getHours() + ':' + (startDate.getMinutes() < 10 ? '0' : '') + startDate.getMinutes()

        element.text(item.name).prepend('<strong></strong>').find('strong').text(time + ' ')
    })
}

exports.request = function(callback) {
    if (settings.url.length == 0) return

    var data = []
    var counter = 0

    var listener = function(error, response, body) {
        if (error) {
            callback(null)
            return
        }

        var d = new Date(2015, 9, 13)

        var response = parseICS(body).filter(function(x) {
            return x.type == 'VEVENT'
            && (
                (d - x.startDate > 0 && x.endDate - d > 0)
                || (x.startDate - d > 0
                    && x.startDate.getFullYear() == d.getFullYear()
                    && x.startDate.getMonth() == d.getMonth()
                    && x.startDate.getDate() == d.getDate()
                )
            )
        })

        data = data.concat(response)

        if (++counter == settings.url.length) {
            data.sort(function(x, y) {
                return y.startDate - x.startDate
            })

            callback(data)
        }
    }

    settings.url.forEach(function(url) {
        request(url, listener)
    })
}
