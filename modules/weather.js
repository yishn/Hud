var yql = require('yql')
var codes = [
    'tornado',
    'day-storm-showers',
    'hurricane',
    'thunderstorm',
    'thunderstorm',
    'rain-mix',
    'rain-mix',
    'rain-mix',
    'hail',
    'showers',
    'hail',
    'showers',
    'showers',
    'snow',
    'day-snow',
    'snow-wind',
    'snow',
    'hail',
    'rain-mix',
    'dust',
    'fog',
    'windy',
    'smoke',
    'strong-wind',
    'strong-wind',
    'snowflake-cold',
    'cloudy',
    'night-alt-cloudy',
    'day-cloudy',
    'night-alt-cloudy',
    'day-cloudy',
    'night-clear',
    'day-sunny',
    'night-alt-partly-cloudy',
    'day-sunny-overcast',
    'rain-mix',
    'hot',
    'day-storm-showers',
    'day-storm-showers',
    'day-storm-showers',
    'showers',
    'snow-wind',
    'snow',
    'snow-wind',
    'day-sunny-overcast',
    'day-storm-showers',
    'snow',
    'day-storm-showers',
    'stars'
]

exports.init = function(el, settings) {
    exports.element = el.text('Loading weather…')
    exports.settings = settings

    exports.update()
    setInterval(exports.update, settings.interval)
}

exports.update = function() {
    var query = new yql([
        'select * from weather.forecast',
        'where u="c" and woeid in',
        '(select woeid from geo.places(1)',
        'where text="' + exports.settings.location + '")'
    ].join(' '))

    query.exec(function(err, data) {
        if (err) {
            exports.element.text(exports.settings.location)
            return
        }

        var location = data.query.results.channel.location
        var condition = data.query.results.channel.item.condition

        exports.element.text(location.city + ', ' + condition.temp + '°C')
            .prepend('<i class="wi wi-' + codes[condition.code] + '" title="' + condition.text + '"></i> ')
            .addClass('show')
    })
}
