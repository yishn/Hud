const {h, Component} = require('preact')

const yql = require('yql')
const codes = [
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

module.exports = class WeatherModule extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: null
        }
    }

    componentDidMount() {
        this.update()
        setInterval(() => this.update(), this.props.interval)
    }
    
    update() {
        let query = new yql([
            'select * from weather.forecast',
            'where u="c" and woeid in',
            '(select woeid from geo.places(1)',
            `where text="${this.props.location}")`
        ].join(' '))

        query.exec((err, data) => {
            if (err) return this.setState({data: null})

            let location = data.query.results.channel.location
            let condition = data.query.results.channel.item.condition

            this.setState({data: {location, condition}})
        })
    }

    render({location}, {data}) {
        return h('li', {id: 'weather'},
            data == null 
            ? location
            : [
                h('i', {
                    class: `wi wi-${codes[data.condition.code]}`,
                    title: data.condition.text
                }),
                ` ${data.location.city}, ${data.condition.temp}°C`
            ]
        )
    }
}
