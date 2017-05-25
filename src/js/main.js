var timer = document.getElementById('timer');
var toggle = document.getElementById('toggle');
var reset = document.getElementById('reset');

var watch = new Stopwatch(timer);

function start() {
    watch.start();
    toggle.textContent = 'Stop';
}

function stop() {
    watch.stop();
    toggle.textContent = 'Start';
}

toggle.addEventListener('click', function() {
    (watch.status) ? stop(): start();
});

reset.addEventListener('click', function() {
    watch.reset();
});
