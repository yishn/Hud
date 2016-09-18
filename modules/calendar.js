const parseICS = require('ics-parser')
const request = require('request')

exports.init = function(el, settings) {
    exports.element = el
    exports.settings = settings

    exports.update()
    setInterval(exports.update, settings.interval)
}

exports.update = function() {
    exports.request(data => {
        if (!data || data.length == 0) return

        let item = data[0]
        let startDate = new Date(item.startDate.getTime() + exports.settings.offset)
        let time = ''

        if (startDate.getHours() != 0 || startDate.getMinutes() != 0)
            time = startDate.getHours() + ':' + (startDate.getMinutes() < 10 ? '0' : '') + startDate.getMinutes()

        exports.element.text(item.name).prepend('<strong></strong>').find('strong').text(time + ' ')
    })
}

exports.request = function(callback) {
    if (exports.settings.url.length == 0) return

    let data = []
    let counter = 0

    let listener = (error, _, body) => {
        if (error) {
            callback(null)
            return
        }

        let d = new Date()

        let response = parseICS(body).filter(x => {
            let startDate = x.startDate ? new Date(x.startDate.getTime() + exports.settings.offset) : null
            let endDate = x.endDate ? new Date(x.endDate.getTime() + exports.settings.offset) : null

            if (!startDate) return false

            return x.type == 'VEVENT'
            && (d - startDate > 0
                && endDate && endDate - d > 0
                ||
                startDate - d > 0
                && startDate.getFullYear() == d.getFullYear()
                && startDate.getMonth() == d.getMonth()
                && startDate.getDate() == d.getDate())
        })

        data = data.concat(response)

        if (++counter == exports.settings.url.length) {
            data.sort((x, y) => y.startDate - x.startDate)
            callback(data)
        }
    }

    exports.settings.url.forEach(url => request(url, listener))
}
