// --- Bread Calculator ---

const flourInput = document.querySelector("#flour");
const hydrationInput = document.querySelector("#hydratation");
const waterInput = document.querySelector("#water");
const saltInput = document.querySelector("#salt");

// Advanced-page-only elements (absent on the basic page).
const effectiveHydrationInput = document.querySelector("#effective_hydratation");
const flourTypeSelect = document.querySelector("#flours");
const waterUnitSelect = document.querySelector("#gpw"); // grams (gw) or % (pw)
const saltUnitSelect = document.querySelector("#gps");  // grams (gs) or % (ps)

const calculateBtn = document.querySelector(".btn button");

// Extra water (%) absorbed by the flour's bran, lowering effective hydration.
const FLOUR_ABSORPTION = {
    white: 0,
    bread: 2,
    wheat: 7,
};

const SALT_PERCENT = 2; // salt is always 2% of flour weight

function calculate() {
    const flour = parseFloat(flourInput.value);
    const hydration = parseFloat(hydrationInput.value);

    if (isNaN(flour) || isNaN(hydration)) {
        alert("Please enter flour and hydration");
        return;
    }

    const waterGrams = Math.round(flour * (hydration / 100));
    const saltGrams = flour * (SALT_PERCENT / 100);

    // Water output: grams or the hydration percentage.
    if (waterUnitSelect && waterUnitSelect.value === "pw") {
        waterInput.value = hydration;
    } else {
        waterInput.value = waterGrams;
    }

    // Salt output: grams or percentage.
    if (saltUnitSelect && saltUnitSelect.value === "ps") {
        saltInput.value = SALT_PERCENT;
    } else {
        saltInput.value = saltGrams.toFixed(1);
    }

    // Effective hydration (advanced page only).
    if (effectiveHydrationInput) {
        const flourType = flourTypeSelect ? flourTypeSelect.value : "white";
        const absorption = FLOUR_ABSORPTION[flourType] ?? 0;
        effectiveHydrationInput.value = hydration - absorption;
    }
}

calculateBtn.addEventListener("click", calculate);

// Recalculate live when a unit/flour-type dropdown changes (advanced page).
[flourTypeSelect, waterUnitSelect, saltUnitSelect].forEach((select) => {
    if (select) {
        select.addEventListener("change", () => {
            if (waterInput.value !== "") calculate();
        });
    }
});

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

    if (timeLeft <= 0) return; // nothing to count down

    endTime = Date.now() + timeLeft * 1000;

    timer = setInterval(() => {
        const remaining = Math.ceil((endTime - Date.now()) / 1000);

        if (remaining <= 0) {
            clearInterval(timer);
            timer = null;
            timeLeft = 0;
            updateDisplay();
            triggerAlarm();
            alert("Time's up! ⏰");
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

// --- Page navigation ---
const extendBtn = document.querySelector(".extend button");
if (extendBtn) {
    extendBtn.addEventListener("click", () => {
        window.location.href = "advanced.html";
    });
}

const backBtn = document.querySelector(".back button");
if (backBtn) {
    backBtn.addEventListener("click", () => {
        window.location.href = "index.html";
    });
}
