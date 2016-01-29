var timer = 0
var remainingSeconds = 0

exports.init = function(el, settings, annyang) {
    exports.element = el
    exports.settings = settings

    annyang.addCommands({
        'computer remind me in :number minutes': function(number) {
            exports.startTimer(+number)
        },
        'computer stop timer': function() {
            exports.stopTimer()
        }
    })
}

exports.startTimer = function(minutes) {
    exports.stopTimer()
    remainingSeconds = minutes * 60

    timer = setInterval(function() {
        remainingSeconds--
        exports.display()

        if (remainingSeconds == 0) {
            exports.alert()
            exports.stopTimer()
        }
    }, 1000)
}

exports.display = function() {
    var minutes = Math.floor(remainingSeconds / 60)
    var seconds = remainingSeconds - minutes * 60
    if (seconds < 10) seconds = '0' + seconds

    exports.element.text('Timer: ' + minutes + ':' + seconds)
}

exports.stopTimer = function() {
    clearInterval(timer)
    exports.element.text('')
}

exports.alert = function() {
    new Audio('./sound/timer.mp3').play()
}
