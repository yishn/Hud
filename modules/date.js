const {h, Component} = require('preact')

const days = ['Sunday', 'Monday', 'Tuesday',
    'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December']

module.exports = class DateModule extends Component {
    constructor(props) {
        super(props)

        this.state = {
            date: new Date()
        }
    }

    componentDidMount() {
        this.update()
    }

    update() {
        this.setState({date: new Date()})

        let seconds = this.state.date.getSeconds()

        setTimeout(() => this.update(), (60 - seconds) * 1000)
    }

    render(_, {date}) {
        let day = date.getDate()
        let th = 'th'

        if (day < 10 || day >= 20) {
            th = day % 10 == 1 ? 'st' : (day % 10 == 2 ? 'nd' : (day % 10 == 3 ? 'rd' : 'th'))
        }

        let text = days[date.getDay()] + ', ' + day + th + ' ' + months[date.getMonth()]

        return h('li', {id: 'date'}, text)
    }
}
