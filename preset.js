// Function to set the inputMinutes field with a preset value
function setPreset(preset) {
    const selectedPreset = preset;
    if (!preset) {
        alert("Please select a preset value.");
        return;
    }

    inputMinutes.value = preset;
}