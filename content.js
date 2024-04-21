



chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if( request.message === "activate" ) {
            chrome.storage.sync.get('tasks', function(data) {
                if (chrome.runtime.lastError) {
                    console.error('Error retrieving storage:', chrome.runtime.lastError);
                } else {
                    console.log(data.tasks);
                    console.log('Retrieved data:');
                    if (data.tasks === true){
                        console.log("TRUEEE");
                        replaceText(document.body);
                    }else{
                        location.reload();
                    }
                }
            });
        }
    }
);


function countWords(str) {
    // Remove leading and trailing whitespace
    str = str.trim();
    // Split the string by whitespace characters
    var words = str.split(/\s+/);
    // Return the number of words
    return words.length;
}


function replaceText(node) {
    var maxcalls = 10;

    var paragraphs = document.querySelectorAll('p');
// Get all header elements (h1 to h6)
    var headers = document.querySelectorAll('h1, h2, h3, h4, h5, h6');

// Function to extract text content from elements

    async function changeTextContent(element) {
        //let data = await callOpenAI(element.textContent);
        console.log("hihi");
        let words = countWords(element.textContent);
        console.log(words);
        callOpenAI(element.textContent,words+10).then(data => {
            console.log(data);
            element.textContent = data;
        });
        //
    }

    paragraphs.forEach(function(paragraph) {
        if (maxcalls>0){
            changeTextContent(paragraph);
            maxcalls--;
        }
    });

    headers.forEach(function(header) {
        if (maxcalls>0) {
            changeTextContent(header);
            maxcalls--;
        }
    });
}


function callOpenAI(text,len) {
    return new Promise((resolve, reject) => {
        fetch('https://openai-proxy.sellestial.com/api/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer bufeh5byo4y5',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "model": "gpt-3.5-turbo",
                "max_tokens": len,
                "messages": [
                    {
                        "role": "system",
                        "content": "Rework my texts in gen alpha lingo. Emphasise the use of words such as 'bussin','straight up','was like','ratiod','for real','no cap','yapping', 'boomer', 'fanum tax', 'alpha', 'rizz', 'rizzler', 'gyat', 'skibidy', 'skibidy toilet', 'showing meat', 'ohio', streamers lingo and similar. You should seek to include as many of gen alpha phrases as possible. Boomers need not understand."
                    },
                    {
                        "role": "system",
                        "content": "If given a very short text or a name you can keep it as is or give it a short gen alpha nickname."
                    },
                    {
                        "role": "user",
                        "content": text
                    }
                ]
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Handle successful response here
                resolve(data.choices[0].message.content);
            })
            .catch(error => {
                // Handle error here
                reject(error);
            });
    });
}

