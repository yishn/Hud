var request = require('request')
var settings = require('../settings')['vrn-tram']

var element

exports.init = function(el) {
    element = el.text('Loading tram information…')

    exports.update()
    setInterval(exports.update, settings.interval)
}

exports.update = function() {
    request(settings.url, function(error, response, body) {
        if (error) return

        // element.text(body).addClass('show')
    })
}
