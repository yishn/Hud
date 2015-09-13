var $ = require('sprint-js')
var request = require('request')
var settings = require('../settings').db

var element

exports.init = function(el) {
    element = el.text('Loading information…')

    exports.update()
    setInterval(exports.update, settings.interval)
}

exports.update = function() {
    exports.request(function(data) {
        if (!data) return

        console.log(data)
        element.text(data.name).addClass('show')
    })
}

exports.request = function(callback) {
    var url = 'http://reiseauskunft.bahn.de/bin/bhftafel.exe/dn?ld=9646&rt=1&boardType=dep&time=actual&productsFilter=111111111&start=yes&input=' + encodeURIComponent(settings.station)

    request(url, function(error, response, body) {
        if (error) {
            callback(null)
            return
        }

        var dom = $(/<body[^>]*?>([^]*?)<\/body>/.exec(body)[1].trim())
        var name = dom.find('input#rplc0').val()
        var domItems = dom.find('tr[id^="journeyRow_"]')
        var d = new Date()
        var items = domItems.dom.map(function(tr) {
            return {
                time: new Date(d.toDateString() + ' ' + $(tr).find('.time').text().trim()),
                id: $(tr).find('.train + .train a').text().trim(),
                destination: $(tr).find('.route .bold a').text().trim()
            }
        })

        callback({ name: name, items: items })
    })
}
