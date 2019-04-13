let running = false;
let millis = 0;

updateButtons();

function handleStartStopClicked() {
    running = !running;
    updateButtons();
}

function handleResetClicked() {
    millis = 0;
    updateTimer();
}

function updateButtons() {
    const text = (running != false) ? "Stop" : "Start";
    let buttonStartStop = document.getElementById("buttonStartStop");
    buttonStartStop.innerHTML = text;
    buttonStartStop.text = text;
    document.getElementById("buttonReset").disabled = running;
    updateTimer();
}

async function updateTimer() {
    if (running) {
        millis = await increaseTimer();
    }
    const timer = new Date(millis);
    const h = prefixWithZeros(timer.getUTCHours(), 2);
    const m = prefixWithZeros(timer.getUTCMinutes(), 2);
    const s = prefixWithZeros(timer.getUTCSeconds(), 2);
    const ms = prefixWithZeros(timer.getUTCMilliseconds(), 4);
    const text = `${h}:${m}:${s}:${ms}`;
    document.getElementById("timer").innerHTML = text;
}

function prefixWithZeros(number, digits) {
    return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
}


function increaseTimer() {
    const duration = 43 + Math.floor(Math.random() * 100);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            updateTimer();
            resolve(millis + duration);
        }, duration);
    });
}