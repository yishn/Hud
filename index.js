const {screen, remote} = require('electron')
const {h, render, Component} = require('preact')

const settings = require('./settings')

class App extends Component {
    constructor(props) {
        super(props)

        this.window = remote.getCurrentWindow()
    }

    componentDidMount() {
        this.resize()
        screen.on('display-metrics-changed', () => this.resize())
    }

    resize() {
        let {workArea} = screen.getPrimaryDisplay()
        this.window.setBounds(workArea)
    }

    render() {
        return h('ul', {id: 'hud'},
            this.props.activated.map(id => 
                h(require(`./modules/${id}`), this.props[id])
            )
        )
    }
}

render(h(App, settings), document.body)
