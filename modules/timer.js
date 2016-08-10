let timer = 0
let remainingSeconds = 0

exports.init = function(el, settings, annyang) {
    exports.element = el
    exports.settings = settings

    annyang.addCommands({
        'computer remind me in :number minute(s)': number => {
            if (number == 'one') number = 1
            exports.startTimer(+number)
        },
        'computer remind me in :number hour(s)': number => {
            if (number == 'one') number = 1
            exports.startTimer(+number * 60)
        },
        'computer remind me in half an hour': () => exports.startTimer(30),
        'computer stop timer': () => exports.stopTimer()
    })
}

exports.startTimer = function(minutes) {
    exports.stopTimer()
    remainingSeconds = minutes * 60

    timer = setInterval(() => {
        remainingSeconds--
        exports.display()

        if (remainingSeconds == 0) {
            exports.alert()
            exports.stopTimer()
        }
    }, 1000)
}

exports.display = function() {
    let minutes = Math.floor(remainingSeconds / 60)
    let seconds = remainingSeconds - minutes * 60
    if (seconds < 10) seconds = '0' + seconds

    exports.element.text(`Timer ${minutes}:${seconds}`)
}

exports.stopTimer = function() {
    clearInterval(timer)
    exports.element.text('')
}

exports.alert = function() {
    new Notification('Timer', { body: 'Your time is up!' })
}
