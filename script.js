let startTime, interval;
let running = false;
let elapsedTime = 0;

const display = document.getElementById('display');
const lapsList = document.getElementById('laps');

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  const centiseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
  return `${minutes}:${seconds}:${centiseconds}`;
}

function updateDisplay() {
  const now = Date.now();
  elapsedTime = now - startTime;
  display.textContent = formatTime(elapsedTime);
}

document.getElementById('startBtn').addEventListener('click', () => {
  if (!running) {
    startTime = Date.now() - elapsedTime;
    interval = setInterval(updateDisplay, 10);
    running = true;
  }
});

document.getElementById('pauseBtn').addEventListener('click', () => {
  if (running) {
    clearInterval(interval);
    running = false;
  }
});

document.getElementById('resetBtn').addEventListener('click', () => {
  clearInterval(interval);
  running = false;
  elapsedTime = 0;
  display.textContent = "00:00:00";
  lapsList.innerHTML = '';
});

document.getElementById('lapBtn').addEventListener('click', () => {
  if (running) {
    const lapTime = formatTime(elapsedTime);
    const li = document.createElement('li');
    li.textContent = `Lap: ${lapTime}`;
    lapsList.appendChild(li);
  }
});
