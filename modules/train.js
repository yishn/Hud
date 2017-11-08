const {h, Component} = require('preact')
const request = require('request')

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

        request(url, (err, response, body) => {
            if (err) return this.setState({data: null})

            let html = /<body[^>]*?>([^]*?)<\/body>/.exec(body)[1].trim()
            this.dataElement.innerHTML = html

            let name = this.dataElement.querySelector('input#rplc0').value
            let d = new Date()
            let items = [...this.dataElement.querySelectorAll('tr[id^="journeyRow_"]')].map(item => ({
                time: new Date(d.toDateString() + ' ' + item.querySelector('.time').innerText.trim()),
                id: item.querySelector('.train + .train a').innerText.trim(),
                destination: item.querySelector('.route .bold a').innerText.trim()
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

                let id = item.id.split(/\s+/).map(x =>
                    isNaN(x) ? (x.length === 0 ? '' : x[0].toUpperCase()) : x
                ).join('')

                return [
                    i > 0 && h('br'),
                    h(item.time <= fadeout ? 'em' : 'span', {}, [
                        item.time, 'm ',
                        h('strong', {}, id), ' ', destination
                    ])
                ]
            }),

            h('div', {
                ref: el => this.dataElement = el, 
                class: 'hide',
                dangerouslySetInnerHTML: {__html: ''}
            })
        )
    }
}
