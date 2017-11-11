const {h, Component} = require('preact')
const {JSDOM} = require('jsdom')

module.exports = class TrainModule extends Component {
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
        let url = [
            'http://reiseauskunft.bahn.de/bin/bhftafel.exe/dn',
            '?ld=9646&rt=1&boardType=dep&time=actual&productsFilter=111111111&start=yes&input=',
            encodeURIComponent(this.props.station)
        ].join('')

        JSDOM.fromURL(url).then(({window: {document: dom}}) => {
            let name = dom.querySelector('input#rplc0').value
            let dateString = new Date().toDateString()
            let items = [...dom.querySelectorAll('tr[id^="journeyRow_"]')].map(tr => ({
                time: new Date(`${dateString} ${tr.querySelector('.time').textContent.trim()}`),
                id: tr.querySelector('.train + .train a').textContent.trim(),
                destination: tr.querySelector('.route .bold a').textContent.trim()
            }))

            this.setState({data: {name, items}})
        })
    }

    render({threshold, maxcount, replace, fadeout}, {data}) {
        return h('li', {id: 'train', class: data != null && 'show'},
            data != null && data.items.filter((x, i) => {
                x.time = Math.round((x.time - new Date()) / 1000 / 60)
                return i >= data.items.length - maxcount - 1 && x.time <= threshold && x.time > 0
            }).map((item, i) => {
                let destination = item.destination.split(',')[0].trim()

                for (let key in replace) {
                    destination = destination.replace(key, replace[key])
                }

                return h('p', {},
                    h(item.time <= fadeout ? 'em' : 'span', {}, [
                        item.time, 'm ',

                        h('strong', {}, item.id.split(/\s+/).map(x =>
                            isNaN(x) ? (x.length === 0 ? '' : x[0].toUpperCase()) : x
                        ).join('')), ' ', 

                        destination
                    ])
                )
            })
        )
    }
}
