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

// Preset messages object
const presets = {
    "Break Time": "Break Time",
    "Next Session": "Next Session",
    "Time's Up!": "Time's Up!"
};

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

    if (remainingTime > 0) {
        remainingTime--;
    } else {
        clearInterval(countdown);
        alert("Time's up!");
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

// Function to send a preset message to the speaker
function sendPresetMessage() {
    const selectedPreset = presetMessages.value;
    if (!selectedPreset) {
        alert("Please select a preset message.");
        return;
    }

    const message = presets[selectedPreset];
    if (countdownWindow && !countdownWindow.closed) {
        displayMessageInCountdownWindow(message);
    } else {
        sendMessageToWindow(message);
    }
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
                            background-color: #fff;
                            color: #333;
                        }
                        h1 {
                            color: #333;
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
                    #timerDisplay {
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
                <div id="timerDisplay">
                    <span id="minutes">00</span>:<span id="seconds">00</span>
                </div>
                <div id="speakerMessage"></div>
            </body>
            </html>
        `);
    } else {
        alert("Failed to open new window. Please allow pop-ups for this site.");
    }
}

// Function to update font size
function updateFontSize(size) {
    document.getElementById('fontSizeValue').textContent = size;
    if (countdownWindow && !countdownWindow.closed) {
        countdownWindow.document.getElementById('timerDisplay').style.fontSize = `${size}px`;
    }
}

// Function to update font type
function updateFontType(type) {
    if (countdownWindow && !countdownWindow.closed) {
        countdownWindow.document.body.style.fontFamily = type;
    }
}

// Function to update font weight
function updateFontWeight(weight) {
    if (countdownWindow && !countdownWindow.closed) {
        countdownWindow.document.body.style.fontWeight = weight;
    }
}

// Function to update font color
function updateFontColor(color) {
    if (countdownWindow && !countdownWindow.closed) {
        countdownWindow.document.body.style.color = color;
    }
}

// Function to display message in the countdown window for 10 seconds
function displayMessageInCountdownWindow(message) {
    const messageElement = countdownWindow.document.getElementById('speakerMessage');
    messageElement.textContent = message;
    messageElement.style.display = 'block';

    setTimeout(() => {
        messageElement.style.display = 'none';
    }, 10000); // 10 seconds
}
