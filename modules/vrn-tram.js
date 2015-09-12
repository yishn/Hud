var request = require('request')
var settings = require('../settings')['vrn-tram']

var element

exports.init = function(el) {
    element = el.text('Loading tram information…')

    exports.update()
    setInterval(exports.update, settings.interval)
}

exports.update = function() {
    exports.request(function(data) {
        if (!data) return

        element.text(data.name).addClass('show')
    })
}

exports.request = function(callback) {
    request(settings.url, function(error, response, body) {
        if (error) {
            callback(null)
            return
        }

        var regexName = /<span id="header_1_3">[^<>]*?, ([^<>]*?)<\/span>/
        var regexItemTime = /<td id="content_1_1">([^<>]*?)<\/td>/g
        var regexItemCategory = /<td[^>]*?><img[^>]*?alt="([^"]*?)"/g
        var regexItemId = /<td id="content_1_2">([^<>]*?)<\/td>/g
        var regexItemDestination = /<td id="content_1_3">([^<>]*?)<\/td>/g
        var regexItemDelay = /<td id="content_1_4_\d">([^<>]*?)<\/td>/g

        var times = [], ids = [], categories = [], destinations = [], delays = []

        while ((result = regexItemTime.exec(body)) !== null) {
            times.push(result[1])
            ids.push(regexItemId.exec(body)[1])
            categories.push(regexItemCategory.exec(body)[1])
            destinations.push(regexItemDestination.exec(body)[1])
            delays.push(regexItemDelay.exec(body)[1])
        }

        callback({
            name: regexName.exec(body)[1],
            times: times,
            ids: ids,
            categories: categories,
            destinations: destinations,
            delays: delays
        })
    })
}
