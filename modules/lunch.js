const {h, Component} = require('preact')
const request = require('request')
const {JSDOM} = require('jsdom')

module.exports = class LunchModule extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: null,
            show: false
        }
    }

    componentDidMount() {
        this.update()
    }

    update() {
        let url = 'http://sap-lunch-menu.appspot.com'

        JSDOM.fromURL(url).then(({window: {document: dom}}) => {
            let items = [...dom.querySelectorAll([
                'body', 'table', 'tbody', 'tr:nth-child(1)', 'td.Stage', 
                'table', 'tbody', 'tr:nth-child(6)', 'td', 
                'table', 'tbody', 'tr', 'td', 'div:nth-child(1)', 'p'
            ].join('>'))].filter(p => p.textContent.trim() !== '').map(p => ({
                date: p.querySelector('b').textContent.trim(),
                content: [...p.querySelectorAll('table tr')].map(tr => ({
                    category: tr.querySelector('td:first-child').textContent
                        .trim().slice(0, -1),
                    value: tr.querySelector('td:last-child').textContent
                        .replace(/\([^()]*\)/g, '').trim()
                }))
            }))

            this.setState({data: {items}})
        })
    }

    render(_, {data, show}) {
        console.log(data)
        return h('li', {id: 'lunch', class: data != null && show && 'show'})
    }
}
