var yql = require('yql')
var settings = require('../settings')

var element
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
    'night-cloudy',
    'day-cloudy',
    'night-cloudy',
    'day-cloudy',
    'night-clear',
    'day-sunny',
    'night-partly-cloudy',
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

exports.init = function(el) {
    element = el.html('Loading weather&hellip;')

    exports.update()
    setInterval(exports.update, settings.weather.interval)
}

exports.update = function() {
    var query = new yql([
        'select * from weather.forecast',
        'where u="c" and woeid in',
        '(select woeid from geo.places(1)',
        'where text="' + settings.weather.location + '")'
    ].join(' '))

    query.exec(function(err, data) {
        var location = data.query.results.channel.location
        var condition = data.query.results.channel.item.condition

        element.text(location.city + ', ' + condition.temp + '°C')
            .prepend('<i class="wi wi-' + codes[condition.code] + '" title="' + condition.text + '"></i> ')
            .addClass('show')
    })
}
