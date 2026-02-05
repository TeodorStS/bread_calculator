// --- Bread Calculator ---

const flourInput = document.querySelector("#flour");
const hydrationInput = document.querySelector("#hydratation");
const waterInput = document.querySelector("#water");
const saltInput = document.querySelector("#salt");
const effectiveHydratation=document.querySelector("#effective_hydratation");
const flourtype=document.querySelector("#flours");
const button = document.querySelector(".btn");
const gramswater = document.querySelector("#gw");
const percentagewater = document.querySelector("#pw");
const percentageflour = document.querySelector("#pf");
const percentageSalt = document.querySelector("#ps");
const gpwater = document.querySelector("#gpw");

function calculate() {
    const flour = parseFloat(flourInput.value);
    const hydration = parseFloat(hydrationInput.value);

    if (isNaN(flour) || isNaN(hydration)) {
        alert("Please enter flour and hydration");
        return;
    }


    waterInput.value = Math.round(flour * (hydration / 100));
    saltInput.value = (flour * 0.02).toFixed(1);
    
    switch (flourtype.value) {
    case "white":
        effectiveHydratation.value = Number(hydrationInput.value) + 0;
        break;

    case "bread":
        effectiveHydratation.value = Number(hydrationInput.value) + 2;
        break;

    case "wheat":
        effectiveHydratation.value = Number(hydrationInput.value) + 7;
        break;

    default:
        effectiveHydratation.value = Number(hydrationInput.value);
    }
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
let endTime = 0;

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

    endTime = Date.now() + timeLeft * 1000;

    timer = setInterval(() => {
        const remaining = Math.ceil((endTime - Date.now()) / 1000);

        if (remaining <= 0) {
            clearInterval(timer);
            timer = null;
            timeLeft = 0;
            updateDisplay();
            triggerAlarm();
            alert("Time’s up! ⏰");
            return;
        }

        timeLeft = remaining;
        updateDisplay();
    }, 1000);
}

function pauseTimer() {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
    stopAlarm();
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

//extend the calc
const extendBtn = document.querySelector(".extend button");
if (extendBtn) {
    extendBtn.addEventListener("click", function () {
        window.location.href = "advanced.html";
    });
}

//go back
const backBtn = document.querySelector(".back button");
if (backBtn) {
    backBtn.addEventListener("click", function () {
        window.location.href = "index.html";
    });
}





