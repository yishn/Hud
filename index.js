const {screen, remote} = require('electron')
const {h, render, Component} = require('preact')

const settings = require('./settings')

class App extends Component {
    constructor(props) {
        super(props)

        this.window = remote.getCurrentWindow()
    }

    componentDidMount() {
        let screensize = screen.getPrimaryDisplay().workAreaSize
        let width = Math.round(screensize.width / 3)

        this.window.setBounds({
            width,
            height: screensize.height,
            x: screensize.width - width,
            y: 0
        })

        this.window.show()
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
