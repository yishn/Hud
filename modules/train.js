var $ = require('sprint-js')
var request = require('request')

exports.init = function(el, settings) {
    exports.element = el
    exports.settings = settings

    exports.update()
    setInterval(exports.update, settings.interval)
}

exports.update = function() {
    exports.request(function(data) {
        if (!data) return

        var items = data.items.filter(function(x) {
            x.time = Math.round((x.time - new Date()) / 1000 / 60)
            return x.time <= exports.settings.threshold && x.time > 0
        })

        var display = []

        items.forEach(function(item) {
            var destination = item.destination.split(',')[0].trim()
            for (key in exports.settings.replace) {
                destination = destination.replace(key, exports.settings.replace[key])
            }

            var id = item.id.split(' ').map(function(x) {
                if (isNaN(parseInt(x))) return x.length == 0 ? '' : x[0].toUpperCase()
                else return x
            }).join('')

            var string = item.time + 'm <strong>' + id + '</strong> ' + destination
            if (item.time <= exports.settings.fadeout) string = '<em>' + string + '</em>'

            display.push(string)
        })

        exports.element.html(display.join('<br>')).addClass('show')
    })
}

exports.request = function(callback) {
    var url = 'http://reiseauskunft.bahn.de/bin/bhftafel.exe/dn?ld=9646&rt=1&boardType=dep&time=actual&productsFilter=111111111&start=yes&input=' + encodeURIComponent(exports.settings.station)

    request(url, function(error, response, body) {
        if (error) {
            callback(null)
            return
        }

        var dom = $(/<body[^>]*?>([^]*?)<\/body>/.exec(body)[1].trim())
        var name = dom.find('input#rplc0').val()
        var d = new Date()
        var items = dom.find('tr[id^="journeyRow_"]').dom.map(function(item) {
            return {
                time: new Date(d.toDateString() + ' ' + $(item).find('.time').text().trim()),
                id: $(item).find('.train + .train a').text().trim(),
                destination: $(item).find('.route .bold a').text().trim()
            }
        })

        callback({ name: name, items: items })
    })
}
