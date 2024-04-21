async function popup(valueHah) {
    console.log("POPUP: "+valueHah);
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "activate", "switched":valueHah});
    });
    await saveTasks(valueHah);
}


async function popupCategory(valueHah) {
    console.log("POPUP: "+valueHah);
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "category", "name":valueHah});
    });
}

async function stacking(valueHah) {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "stacking", "stacking":valueHah});
    });
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("switch").addEventListener("click", function(){ popup(this.checked)});
    document.getElementById("slang-dropdown").addEventListener("change", function(){ popupCategory(this.value)});
    document.getElementById("stacking").addEventListener("click", function(){ stacking(this.checked)});



    chrome.storage.sync.get('tasks', function(data) {
        if (chrome.runtime.lastError) {
            console.error('Error retrieving storage:', chrome.runtime.lastError);
        } else {
            console.log(data.tasks);
            console.log('Retrieved data:');
            document.getElementById("switch").checked = data.tasks;

        }
    });
});

async function saveTasks(valueHah) {
    chrome.storage.sync.set({ tasks: valueHah }, function() {
        if (chrome.runtime.lastError) {
            console.error('Error setting storage:', chrome.runtime.lastError);
        } else {
            console.log('Storage set successfully');
        }
    });

    chrome.storage.sync.get('tasks', function(data) {
        if (chrome.runtime.lastError) {
            console.error('Error retrieving storage:', chrome.runtime.lastError);
        } else {
            console.log(data.tasks);
            console.log('Retrieved data:');
        }
    });


}