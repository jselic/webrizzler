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

replaceText(document.body);
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
                        "content": "look at this example:\n" +
                            "\"Yo, did you peep Jake's vibe at the party last night? That dude's on some next-level sigma energy, just moving through the crowd like he owns the place. And his fit was straight rizz, like he stepped outta a fashion mag. I swear, he's got that fanum tax on lock, making everyone else look basic in comparison. It's like he's living in his own dimension, no cap.\"\n" +
                            "\n" +
                            "Now generate each prompt that you are provided from now on using the same style"
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

