// WORKING FILES FIRST VERSION

let countdown;
let minutesDisplay = document.getElementById('minutes');
let secondsDisplay = document.getElementById('seconds');
let inputMinutes = document.getElementById('inputMinutes');
let messageInput = document.getElementById('messageInput');
let presetMessages = document.getElementById('presetMessages');
let remainingTime = 0;
let startTime = 0;
let isPaused = false;
let messageWindow;
let countdownWindow;
let isDragging = false;
let startX, startY, initialX, initialY;
let countUpMode = false;

// Function to start or resume the timer
function startTimer() {
    let time = inputMinutes.value * 60;
    if (isNaN(time) || time <= 0) {
        alert("Please enter a valid number of minutes.");
        return;
    }

    if (isPaused) {
        remainingTime = remainingTime;
    } else {
        remainingTime = time;
        startTime = time;
    }

    if (!countdownWindow || countdownWindow.closed) {
        openCountdownWindow();
    }

    clearInterval(countdown);
    isPaused = false;

    countdown = setInterval(updateTimer, 1000);
}

// Function to update the timer display
function updateTimer() {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    minutesDisplay.textContent = String(minutes).padStart(2, '0');
    secondsDisplay.textContent = String(seconds).padStart(2, '0');

    if (countdownWindow && !countdownWindow.closed) {
        countdownWindow.document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        countdownWindow.document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }
    if (countUpMode) {
        remainingTime++;
    } else {
        if (remainingTime > 0) {
            remainingTime--;
        } else {
            clearInterval(countdown);
            alert("Time's up!");
        }
    }
}

// Function to stop the timer
function stopTimer() {
    clearInterval(countdown);
    isPaused = true;
}

// Function to reset the timer
function resetTimer() {
    clearInterval(countdown);
    minutesDisplay.textContent = '00';
    secondsDisplay.textContent = '00';
    inputMinutes.value = '';
    remainingTime = 0;
    startTime = 0;
    isPaused = false;

    if (countdownWindow && !countdownWindow.closed) {
        countdownWindow.document.getElementById('minutes').textContent = '00';
        countdownWindow.document.getElementById('seconds').textContent = '00';
    }
}

// Function to add 1 minute to the timer
function addMinute() {
    remainingTime += 60;
    updateTimer();
}

// Function to subtract 1 minute from the timer
function subtractMinute() {
    if (remainingTime >= 60) {
        remainingTime -= 60;
        updateTimer();
    }
}

// Function to set the inputMinutes field with a preset value
function setPreset(preset) {
    const selectedPreset = preset;
    if (!preset) {
        alert("Please select a preset value.");
        return;
    }

    inputMinutes.value = preset;
}

// Function to open a new window with the countdown timer and message
function openCountdownWindow() {
    countdownWindow = window.open('', '_blank', 'fullscreen=yes');
    if (countdownWindow) {
        const fontSize = document.getElementById('fontSize').value;
        const fontType = document.getElementById('fontType').value;
        const fontWeight = document.getElementById('fontWeight').value;
        const fontColor = document.getElementById('fontColor').value;

        countdownWindow.document.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Countdown Timer</title>
                <style>
                    body {
                        font-family: ${fontType}, sans-serif;
                        font-weight: ${fontWeight};
                        color: ${fontColor};
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                        background-color: #000;
                        color: #333;
                    }
                    #timerDisplayMonitor {
                        font-size: ${fontSize}px;
                        margin-bottom: 20px;
                    }
                    #speakerMessage {
                        font-size: 2em;
                        text-align: center;
                        margin: 20px 0;
                    }
                </style>
            </head>
            <body>
                <div id="timerDisplayMonitor">
                    <span id="minutes">00</span>:<span id="seconds">00</span>
                </div>
                <div id="speakerMessage"></div>
                <script src="settings.js"></script>
            </body>
            </html>
        `);
    } else {
        alert("Failed to open new window. Please allow pop-ups for this site.");
    }
}

// Function to send a message to the speaker
function sendMessage() {
    const message = messageInput.value.trim();
    if (message === '') {
        alert("Please enter a message.");
        return;
    }

    if (countdownWindow && !countdownWindow.closed) {
        displayMessageInCountdownWindow(message);
    } else {
        sendMessageToWindow(message);
    }
}

// Function to send a preset message to the message input
function setPresetMessageToMessage() {
    const selectedPreset = presetMessages.value;
    messageInput.value = selectedPreset;
}

// Function to send message to speaker window
function sendMessageToWindow(message) {
    if (messageWindow && !messageWindow.closed) {
        messageWindow.document.body.innerHTML = `
            <h1>Message for Speakers</h1>
            <p>${message}</p>
        `;
    } else {
        messageWindow = window.open('', '_blank', 'fullscreen=yes');
        if (messageWindow) {
            messageWindow.document.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Message for Speakers</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            text-align: center;
                            padding: 20px;
                            background-color: #000;
                            color: #fff;
                        }
                        h1 {
                            color: #fff;
                        }
                        p {
                            font-size: 1.2em;
                        }
                    </style>
                </head>
                <body>
                    <h1>Message for Speakers</h1>
                    <p>${message}</p>
                </body>
                </html>
            `);
        } else {
            alert("Failed to open new window. Please allow pop-ups for this site.");
        }
    }
}

// Function to display message in the countdown window for 10 seconds
function displayMessageInCountdownWindow(message) {
    const messageElement = countdownWindow.document.getElementById('speakerMessage');
    messageElement.textContent = message;
    messageElement.style.display = 'block';
    messageElement.style.color = 'yellow';

    setTimeout(() => {
        messageElement.style.display = 'none';
    }, 10000); // 10 seconds
}





function toggleMode() {
    countUpMode = !countUpMode;
    const button = document.getElementById('toggleModeButton');
    button.textContent = countUpMode ? "Switch to Count Down" : "Switch to Count Up";
}






// Function to update font size
function updateFontSize(size) {
    document.getElementById('fontSizeValue').textContent = size;
    if (countdownWindow && !countdownWindow.closed) {
        countdownWindow.document.getElementById('timerDisplayMonitor').style.fontSize = `${size}px`;
        saveSettings();
    }
}

// Function to update font type
function updateFontType(type) {
    if (countdownWindow && !countdownWindow.closed) {
        countdownWindow.document.body.style.fontFamily = type;
        saveSettings();
    }
}

// Function to update font weight
function updateFontWeight(weight) {
    if (countdownWindow && !countdownWindow.closed) {
        countdownWindow.document.body.style.fontWeight = weight;
        saveSettings();
    }
}

// Function to update font color
function updateFontColor(color) {
    if (countdownWindow && !countdownWindow.closed) {
        countdownWindow.document.body.style.color = color;
        saveSettings();
    }
}

// Save settings to localStorage
function saveSettings() {
    const fontSize = document.getElementById('fontSize').value;
    const fontType = document.getElementById('fontType').value;
    const fontWeight = document.getElementById('fontWeight').value;
    const fontColor = document.getElementById('fontColor').value;

    const settings = {
        fontSize,
        fontType,
        fontWeight,
        fontColor
    };

    localStorage.setItem('timerSettings', JSON.stringify(settings));
    applySettings();
}

// Load and apply settings from localStorage
function loadSettings() {
    const savedSettings = localStorage.getItem('timerSettings');
    if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        document.getElementById('fontSize').value = settings.fontSize;
        document.getElementById('fontType').value = settings.fontType;
        document.getElementById('fontWeight').value = settings.fontWeight;
        document.getElementById('fontColor').value = settings.fontColor;

        applySettings();
    }
}

// Apply settings to the timer display
function applySettings() {
    
    if (countdownWindow && !countdownWindow.closed) {
        
        const fontSize = document.getElementById('fontSize').value;
        const fontType = document.getElementById('fontType').value;
        const fontWeight = document.getElementById('fontWeight').value;
        const fontColor = document.getElementById('fontColor').value;

        const timerDisplay = countdownWindow.document.getElementById('timerDisplayMonitor');

        if (fontSize) timerDisplay.style.fontSize = `${fontSize}px`;
        if (fontType) timerDisplay.style.fontFamily = fontType;
        if (fontWeight) timerDisplay.style.fontWeight = fontWeight;
        if (fontColor) timerDisplay.style.color = fontColor;
    }
}

// Example: Start countdown on page load
window.onload = function() {
    loadSettings();
    //startCountdown();
};