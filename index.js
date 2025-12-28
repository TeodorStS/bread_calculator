// --- Bread Calculator ---

const flourInput = document.querySelector("#flour");
const hydrationInput = document.querySelector("#hydratation");
const waterInput = document.querySelector("#water");
const saltInput = document.querySelector("#salt");
const button = document.querySelector(".btn");

function calculate() {
    const flour = parseFloat(flourInput.value);
    const hydration = parseFloat(hydrationInput.value);

    if (isNaN(flour) || isNaN(hydration)) {
        alert("Please enter flour and hydration");
        return;
    }

    waterInput.value = Math.round(flour * (hydration / 100));
    saltInput.value = (flour * 0.02).toFixed(1);
}

button.addEventListener("click", calculate);

// --- Timer ---

const timeDisplay = document.querySelector("#timeDisplay");
const minutesInput = document.querySelector("#timerMinutes");
const startBtn = document.querySelector(".timer-btn.start");
const pauseBtn = document.querySelector(".timer-btn.pause");
const resetBtn = document.querySelector(".timer-btn.reset");

let timer = null;
let timeLeft = 0; // seconds

const alarmSound = document.getElementById("alarmSound");

// --- Alarm functions ---
function triggerAlarm() {
    alarmSound.currentTime = 0;
    alarmSound.loop = true;
    alarmSound.play().catch(err => console.log("Audio playback failed:", err));
}

function stopAlarm() {
    alarmSound.loop = false;
    alarmSound.pause();
    alarmSound.currentTime = 0;
}

// --- Timer display ---
function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timeDisplay.textContent =
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0");
}

// --- Timer control ---
function startTimer() {
    if (timer) return;

    if (timeLeft === 0) {
        timeLeft = Number(minutesInput.value) * 60;
    }

    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            timer = null;
            alert("Time’s up! ⏰");
            triggerAlarm();
            return;
        }
        timeLeft--;
        updateDisplay();
    }, 1000);
}

function pauseTimer() {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
    stopAlarm(); // Stop alarm if it is ringing
}

function resetTimer() {
    pauseTimer();
    timeLeft = Number(minutesInput.value) * 60;
    updateDisplay();
}

// --- Initialize display ---
resetTimer();

// --- Button events ---
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);




