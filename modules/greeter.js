function choose() {
    return arguments[Math.floor(Math.random() * arguments.length)]
}

exports.init = function(el, settings) {
    exports.element = el
    exports.settings = settings

    exports.show()
}

exports.hide = function() {
    exports.element.css('display', 'none')
}

exports.show = function() {
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

    if (exports.settings.name.trim() != '') {
        let question = text[text.length - 1] == '?'
        if (question) text = text.slice(0, text.length - 1)

        text += ', ' + exports.settings.name
        if (question) text += '?'
    }

    exports.element.text(text).css('display', 'block')
    setTimeout(exports.hide, exports.settings.duration)
}
