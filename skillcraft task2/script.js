let startTime = 0;
let elapsedTime = 0;
let intervalId;
let isRunning = false;
let laps = [];

const display = document.querySelector('.display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapTimes = document.getElementById('lapTimes');

// Function to format time in HH:MM:SS.mmm
function formatTime(ms) {
    const date = new Date(ms);
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
    return `${minutes}:${seconds}.${milliseconds}`;
}

// Update display
function updateDisplay() {
    const currentTime = Date.now() - startTime + elapsedTime;
    display.textContent = formatTime(currentTime);
}

// Start or stop the stopwatch
startStopBtn.addEventListener('click', () => {
    if (!isRunning) {
        startTime = Date.now();
        intervalId = setInterval(updateDisplay, 10); // Update every 10ms
        startStopBtn.textContent = 'Pause';
        lapBtn.disabled = false;
        resetBtn.disabled = false;
    } else {
        clearInterval(intervalId);
        elapsedTime += Date.now() - startTime;
        startStopBtn.textContent = 'Start';
        lapBtn.disabled = true;
    }
    isRunning = !isRunning;
});

// Reset the stopwatch
resetBtn.addEventListener('click', () => {
    clearInterval(intervalId);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    laps = [];
    display.textContent = '00:00.000';
    startStopBtn.textContent = 'Start';
    lapBtn.disabled = true;
    resetBtn.disabled = true;
    lapTimes.innerHTML = '';
});

// Record lap times
lapBtn.addEventListener('click', () => {
    const currentTime = Date.now() - startTime + elapsedTime;
    laps.push(currentTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${laps.length}: ${formatTime(currentTime)}`;
    lapTimes.appendChild(lapItem);
});
