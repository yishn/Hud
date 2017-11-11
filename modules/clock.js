const {h, Component} = require('preact')

module.exports = class ClockModule extends Component {
    constructor(props) {
        super(props)

        this.state = {
            date: new Date()
        }
    }

    componentDidMount() {
        this.componentDidUpdate()
    }

    componentDidUpdate() {
        let seconds = this.state.date.getSeconds()

        setTimeout(() => {
            this.setState({date: new Date()})
        }, (60 - seconds) * 1000)
    }

    render(_, {date}) {
        let hours = date.getHours()
        let minutes = date.getMinutes()

        if (minutes < 10) minutes = `0${minutes}`
        let text = hours + ':' + minutes

        return h('li', {id: 'clock'}, text)
    }
}
