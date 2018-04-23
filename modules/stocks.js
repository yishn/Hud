const {h, Component} = require('preact')

module.exports = class Stocks extends Component {
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
        fetch(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${this.props.symbols.join(',')}&types=quote`)
        .then(res => res.ok ? res.json() : Promise.reject(new Error()))
        .then(data => this.setState({data}))
        .catch(() => {})
    }

    render() {
        let show = this.state.data != null

        return h('li', {id: 'stocks', class: show && 'show'},
            this.state.data && this.props.symbols.map(symbol =>
                h('p', {},
                    h('strong', {}, symbol.toUpperCase()), ' ',
                    h('span', {}, this.state.data[symbol].quote.latestPrice, ' USD')
                )
            )
        )
    }
}
