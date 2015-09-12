var yql = require('yql')

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
    setInterval(exports.update, 1000 * 60 * 60)
}

exports.update = function() {
    var query = new yql('select * from weather.forecast where woeid = 636380 and u="c"');
    // var query = new yql('select * from weather.forecast where woeid = 658421 and u="c"');

    query.exec(function(err, data) {
        var location = data.query.results.channel.location
        var condition = data.query.results.channel.item.condition

        element.html('<i class="wi wi-' + codes[condition.code] + '" title="' + condition.text + '"></i> '
            + location.city + ', ' + condition.temp + '°C')
    })
}
