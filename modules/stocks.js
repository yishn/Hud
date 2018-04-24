const {h, Component} = require('preact')
const xmljs = require('xml-js')

module.exports = class Stocks extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: null,
            prices: null
        }
    }

    componentDidMount() {
        this.update()
        setInterval(() => this.update(), this.props.interval)
    }

    async update() {
        let res = await fetch(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${this.props.symbols.join(',')}&types=quote`)
        if (!res.ok) throw new Error()

        let data = await res.json()
        let prices = {}

        try {
            let res = await fetch('http://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml')
            if (!res.ok) throw new Error()

            let rateData = xmljs.xml2js(await res.text(), {compact: true})
            rateData = rateData['gesmes:Envelope'].Cube.Cube.Cube.map(x => x._attributes)

            let eurUsd = +rateData.find(x => x.currency === 'USD').rate
            let eurCurrency = this.props.currency.toUpperCase() !== 'EUR'
                ? +rateData.find(x => x.currency === this.props.currency.toUpperCase()).rate
                : 1

            for (let symbol in data) {
                prices[symbol] = {
                    value: Math.round(data[symbol].quote.latestPrice * eurCurrency * 100 / eurUsd) / 100,
                    currency: this.props.currency.toUpperCase()
                }
            }
        } catch (err) {
            for (let symbol in data) {
                prices[symbol] = {
                    value: data[symbol].quote.latestPrice,
                    currency: 'USD'
                }
            }
        }

        this.setState({data, prices})
    }

    render() {
        let show = this.state.data != null

        return h('li', {id: 'stocks', class: show && 'show'},
            this.state.data && this.props.symbols.map(symbol =>
                h('p', {},
                    h('strong', {}, symbol.toUpperCase()), ' ',
                    h('span', {}, this.state.prices[symbol].value, ' ', this.state.prices[symbol].currency), ' ',
                    h('span', {class: 'change'},
                        '(', h('img', {src: `./node_modules/octicons/build/svg/arrow-small-${
                            this.state.data[symbol].quote.changePercent > 0 ? 'up' : 'down'
                        }.svg`}), ' ',
                        Math.round(this.state.data[symbol].quote.changePercent * 10000) / 100, '%)'
                    )
                )
            )
        )
    }
}
