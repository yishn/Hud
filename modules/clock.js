const {h, Component} = require('preact')

module.exports = class ClockModule extends Component {
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
        let hours = date.getHours()
        let minutes = date.getMinutes()

        if (minutes < 10) minutes = `0${minutes}`

        return h('li', {id: 'clock'},
            hours, h('span', {class: 'colon'}, ':'), minutes
        )
    }
}
