const {h, Component} = require('preact')

function choose() {
    return arguments[Math.floor(Math.random() * arguments.length)]
}

module.exports = class GreeterModule extends Component {
    constructor(props) {
        super(props)

        this.state = {
            show: true
        }
    }

    componentDidMount() {
        setTimeout(() => this.setState({show: false}), this.props.duration)
    }

    render({name}, {show}) {
        let text
        let hour = new Date().getHours()

        if (0 <= hour && hour < 5)
            text = choose(
                'Greetings',
                'Working late?',
                'Still up?'
            )
        else if (5 <= hour && hour < 12)
            text = choose(
                'Good morning',
                'Have a nice day',
                'Did you sleep well?',
                'Need coffee?'
            )
        else if (12 <= hour && hour < 18)
            text = choose(
                'Greetings',
                'Good afternoon',
                'Good day',
                'How are you?'
            )
        else if (18 <= hour && hour <= 23)
            text = choose(
                'Good evening',
                'Did you have a nice day?',
                'How was your day?'
            )

        if (name.trim() != '') {
            let question = text[text.length - 1] == '?'
            if (question) text = text.slice(0, text.length - 1)

            text += ', ' + name
            if (question) text += '?'
        }

        return h('li', {id: 'greeter', class: show && 'show'},
            show && text
        )
    }
}
