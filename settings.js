
const savedSettings = localStorage.getItem('timerSettings');

if (savedSettings) {
    const settings = JSON.parse(savedSettings);

    const timerDisplay = document.getElementById('timerDisplayMonitor');
    
    timerDisplay.style.fontSize = `${settings.fontSize}px`;
    timerDisplay.style.fontFamily =  settings.fontType;
    timerDisplay.style.fontWeight = settings.fontWeight;
    timerDisplay.style.color = settings.fontColor;
}


