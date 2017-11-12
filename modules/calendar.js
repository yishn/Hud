const {h, Component} = require('preact')
const parseICS = require('ics-parser')
const request = require('request')

module.exports = class CalendarModule extends Component {
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
        if (this.props.url.length == 0) return

        let data = []
        let counter = 0

        let listener = (err, _, body) => {
            if (err) return this.setState({data: null})

            let d = new Date()

            let response = parseICS(body).filter(x => {
                let startDate = x.startDate ? new Date(x.startDate.getTime() + this.props.offset) : null
                let endDate = x.endDate ? new Date(x.endDate.getTime() + this.props.offset) : null

                if (!startDate) return false

                return x.type == 'VEVENT' && (
                    d - startDate > 0
                    && endDate && endDate - d > 0
                    ||
                    startDate - d > 0
                    && startDate.toDateString() === d.toDateString()
                )
            })

            data = data.concat(response)

            if (++counter === this.props.url.length) {
                data.sort((x, y) => y.startDate - x.startDate)
                this.setState({data})
            }
        }

        this.props.url.forEach(url => request(url, listener))
    }

    render({offset}, {data}) {
        return h('li', {id: 'calendar', class: data != null && 'show'},
            data != null && data.map(item => {
                let startDate = new Date(item.startDate.getTime() + offset)
                let time = ''

                if (startDate.getHours() !== 0 || startDate.getMinutes() !== 0)
                    time = startDate.getHours() + ':' + (startDate.getMinutes() < 10 ? '0' : '') + startDate.getMinutes()

                return h('p', {}, 
                    h('strong', {}, time), ' ', item.name
                )
            })
        )
    }
}
