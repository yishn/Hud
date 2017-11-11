const {screen, remote} = require('electron')
const {h, render, Component} = require('preact')

const settings = require('./settings')

class App extends Component {
    constructor(props) {
        super(props)

        this.window = remote.getCurrentWindow()
    }

    componentDidMount() {
        let {width, height} = screen.getPrimaryDisplay().workAreaSize

        this.window.setBounds({x: 0, y: 0, width, height})
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
