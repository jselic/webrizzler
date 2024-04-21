// Function to set the extension state
function setExtensionState(enabled) {
    chrome.storage.sync.set({ enabled: enabled });
}

// Function to retrieve the extension state
function getExtensionState(callback) {
    chrome.storage.sync.get('enabled', function(data) {
        console.log("haha");
        const isEnabled = data.enabled !== undefined ? data.enabled : true; // Default to true if not set
        callback(isEnabled);
    });
}

// Listen for messages from the popup to toggle the extension state
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'toggle') {
        getExtensionState(function(enabled) {
            setExtensionState(!enabled);
            sendResponse({ enabled: !enabled });
            console.log("AAAAAA UUUUUUUU");
        });
    }
    return true;
});

// Listen for messages from content scripts to retrieve the extension state
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'toggle') {
        getExtensionState(function(enabled) {
            setExtensionState(!enabled);
            sendResponse({ enabled: !enabled });
        });
    }
    return true;
});