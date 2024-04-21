// Send message to background script to toggle extension state
window.addEventListener("load", (event) => {
    document.getElementById('switch').addEventListener('click', function() {
        console.log("sending");
        var currentState = getState();

    });
});

function getState(){
    chrome.storage.local.get(["state"], function(result) {
        return result.state;
    });
}

function setState(state){
    chrome.storage.local.set({state:state}).then(()=>{
    /*do something once the value is saved*/
    });
}




