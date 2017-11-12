const {h, Component} = require('preact')
const os = require('os-utils')

module.exports = class SystemModule extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cpu: null,
            memory: null
        }
    }

    componentDidMount() {
        this.update()
        setInterval(() => this.update(), this.props.interval)
    }

    update() {
        os.cpuUsage(value => this.setState({
            cpu: Math.round(value * 100),
            memory: Math.round(100 - os.freememPercentage() * 100)
        }))
    }

    render(_, {cpu, memory}) {
        return h('li', {id: 'system'},
            cpu != null && h('p', {}, 
                cpu, '% ', h('strong', {}, 'CPU')
            ),
            memory != null && h('p', {}, 
                memory, '% ', h('strong', {}, 'RAM')
            )
        )
    }
}
