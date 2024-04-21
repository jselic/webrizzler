async function popup(valueHah) {
    console.log("POPUP: "+valueHah);
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "start", "switched":valueHah});
    });
    await saveTasks(valueHah);


    chrome.storage.local.get('tasks', function(data) {
        if (chrome.runtime.lastError) {
            console.error('Error retrieving storage:', chrome.runtime.lastError);
        } else {
            console(data);
            console(data.tasks);
            tasks = data.tasks ? data.tasks : [];
            console.log(tasks);
            if (tasks != null){
                console.log("notnull")
                document.getElementById("switch").value = tasks;
                console.log("switch");
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("switch").addEventListener("click", function(){ popup(this.checked)});
    console.log(chrome.storage.sync);
    chrome.storage.local.get(['tasks'], (res) => {
        tasks = res.tasks ? res.tasks : [];
        console.log(tasks);
        if (tasks != null){
            console.log("notnull")
            document.getElementById("switch").value = tasks;
            console.log("switch");
        }
    });
});

async function saveTasks(valueHah) {
    chrome.storage.local.set({ tasks: valueHah }, function() {
        if (chrome.runtime.lastError) {
            console.error('Error setting storage:', chrome.runtime.lastError);
        } else {
            console.log('Storage set successfully');
        }
    });
}