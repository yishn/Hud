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

        console.log(data)
    })
}

exports.request = function(callback) {
    var data = []
    var counter = 0

    var listener = function(error, response, body) {
        if (error) {
            callback(null)
            return
        }

        var d = new Date()

        var response = parseICS(body).filter(function(x) {
            return x.type == 'VEVENT'
                && ((d - x.startDate > 0 && x.endDate - d > 0)
                || (x.startDate - d > 0 && x.startDate - d < 1000 * 60 * 60 * 12))
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
