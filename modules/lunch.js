const {h, Component} = require('preact')
const {JSDOM} = require('jsdom')

const dayDuration = 24 * 60 * 60 * 1000

module.exports = class LunchModule extends Component {
    constructor(props) {
        super(props)

        this.state = {
            date: new Date(),
            data: null
        }
    }

    componentDidMount() {
        this.update()

        setInterval(() => {
            let date = new Date()

            this.setState({date})

            if (this.props.start <= date.getHours() && date.getHours() <= this.props.end) {
                this.update()
            }
        }, (60 - new Date().getMinutes()) * 60000)
    }

    update() {
        let {date} = this.state
        let day = (date.getDay() || 7) - 1

        let url = 'http://sap-lunch-menu.appspot.com'

        JSDOM.fromURL(url).then(({window: {document: dom}}) => {
            let items = [...dom.querySelectorAll([
                'body', 'table', 'tbody', 'tr:nth-child(1)', 'td.Stage', 
                'table', 'tbody', 'tr:nth-child(6)', 'td', 
                'table', 'tbody', 'tr', 'td', 'div:nth-child(1)', 'p'
            ].join('>'))].filter(p => p.textContent.trim() !== '').map((p, i) => ({
                date: new Date(date.getTime() + (i - day) * dayDuration),
                content: [...p.querySelectorAll('table tr')].map(tr => ({
                    category: tr.querySelector('td:first-child').textContent
                        .trim().slice(0, -1),
                    value: tr.querySelector('td:last-child').textContent
                        .replace(/\s*\([^)]*\)/g, '').trim()
                })).filter(item => item.category.indexOf('Hauptgang') === 0)
            }))

            this.setState({data: {items}})
        })
    }

    render({start, end, maxlength}, {date, data}) {
        let lunch = null

        if (data != null) {
            lunch = data.items.find(x => x.date.toDateString() === date.toDateString())
        }

        let show = lunch != null && start <= date.getHours() && date.getHours() <= end

        return h('li', {id: 'lunch', class: show && 'show'},
            show && lunch.content.map((item, i) => h('p', {},
                h('strong', {}, item.category.split(/\s+/).map(x =>
                    isNaN(x) ? (x.length === 0 ? '' : x[0].toUpperCase()) : x
                ).join('')), ' ',

                item.value.length < maxlength 
                ? item.value 
                : item.value.slice(0, Math.max(maxlength - 3, 0)).trim() + '…'
            ))
        )
    }
}