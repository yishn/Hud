var yql = require('yql')
var element

exports.init = function(el) {
    element = el.text('Loading weather...')

    exports.update()
    setInterval(exports.update, 1000 * 60 * 60)
}

exports.update = function() {
    var query = new yql('select * from weather.forecast where woeid = 658421 and u="c"');

    query.exec(function(err, data) {
        var location = data.query.results.channel.location
        var condition = data.query.results.channel.item.condition

        element.text(location.city + ', ' + condition.temp + '°C')
    })
}
