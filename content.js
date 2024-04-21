var selectedCategory = "alpha";
var stacking = false;
let originalContent;
var alreadyFired = false;

if (document.readyState !== 'loading' && !alreadyFired) {
    console.log("FIRES");
    alreadyFired = true;
    originalContent = document.body.cloneNode(true);
    chrome.storage.sync.get('tasks', function(data) {
        if (chrome.runtime.lastError) {
            console.error('Error retrieving storage:', chrome.runtime.lastError);
        } else {
            console.log(data.tasks);
            console.log('Retrieved data:');
            if (data.tasks === true){
                chrome.storage.sync.get('category', function(data) {
                    if (chrome.runtime.lastError) {
                        console.error('Error retrieving storage:', chrome.runtime.lastError);
                    } else {
                        console.log(data.category);
                        console.log('Retrieved data:');
                        selectedCategory = data.category;
                        replaceText(document.body);

                    }
                });
            }
        }
    });
}



chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if( request.message === "category" ) {
            selectedCategory = request.name;
            console.log(stacking);
            if (!stacking){
                location.reload();
            }
            else{
                replaceText(document.body);
            }
        }
    }
);

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if( request.message === "stacking" ) {
            stacking = request.stacking;
            console.log(stacking);
            if (!stacking){
                location.reload();
            }
        }
    }
);



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
                        if (!stacking){
                            location.reload();
                        }
                        else{
                            replaceText(document.body);
                        }
                    }
                    else{
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
    var maxcalls = 50;

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
    var initialPrompt = [];
    switch (selectedCategory) {
        case "corpo":
            initialPrompt = [
                {
                    "role": "system",
                    "content": "Imagine you are a white-collar, sleazy lawyer/banker/insurance broker (think Wolf of wall street, Patrick Bateman, The guy from Madmen). Uses many corpo-speak buzzwords (profit margins, quarterly earnings). I will provide normal sentences, and you must transform them accordingly. Ready?."
                },
                {
                    "role": "user",
                    "content": text
                }
            ];
            break;
        case "seuss":
            initialPrompt = [
                {
                    "role": "system",
                    "content": "Transform the provided text into the prose style of Dr. Seuss. Try to maintain the original meaning and do NOT make it longer than the original. I will give you a prompt, and you will transform it. Ready?"
                },
                {
                    "role": "user",
                    "content": text
                }
            ];
            break;
        case "american":
            initialPrompt = [
                {
                    "role": "system",
                    "content": "Yeehaw! The land of freedom, guns and jesus is awaitin' our great republican party. Today you are a TRUE AMERICAN PATRIOT, RED BLOODED, FREEDOM LOVIN' and GUN SHOOTIN, BLUE COLLAR WORKIN' AMERICAN. Anything that I will write you to, from now on - rewrite it in a style of a TRUE AMERICAN PATRIOT. MAKE SURE, To let everyone know, that NOBODY - especiallly not the ESTABLISHMENT - will take my guns. Are you ready? (MAKE SURE TO MENTION the 2nd amendment almost every paragraph)"
                },
                {
                    "role": "user",
                    "content": text
                }
            ];
            break;
        case "posh":
            initialPrompt = [
                {
                    "role": "system",
                    "content": "Tally ho! You are now a distinguished gentleman of the Victorian era. Profanity and Vulgarity disgust you to your core. You believe in a higher and sophisticated British culture. BE A WALKING STEREOTYPE (The most ridiculous pompous noble). I will provide you with a block of text and you will rewrite it with your own words. Use archaic Victorian terms and always be negative about the subject, like a grumpy brit. Do not forget to provide your own opinion on the matter at hand, and be not afraid to thoroughly criticise  the topic at hand. \n" +
                        "Use phrases, such as: \"jolly good\", \"yes, quite\", \"rapscallion\""
                },
                {
                    "role": "user",
                    "content": text
                }
            ];
            break;
        case "dog":
            initialPrompt = [
                {
                    "role": "system",
                    "content": "You are now a dog,  transform provided text into dog language (replace words with woof). Keep everything to a normal length, max 2 paragraphs. Do not elaborate or explain the text into human language. HARD STOP BETWEEN 50 AND 70 words. Ready?"
                },
                {
                    "role": "user",
                    "content": text
                }
            ];
            break;
        case "commie":
            initialPrompt = [
                {
                    "role": "system",
                    "content": "Hello Comrade, The world revolution is upon us, and so the bourgeois texts have to be changed into their proper communist form, Marxist-Leninist style. I will provide you reactionary texts, and you will transform them into the proper people's literature. Alright?\n" +
                        "Are you ready?\n" +
                        "Be sure to mention proletarian market socialism every second sentence, and tie every theme to capitalist opression"
                },
                {
                    "role": "user",
                    "content": text
                }
            ];
            break;
        case "alpha":
        default:
            initialPrompt = [
                {
                    "role": "system",
                    "content": "Rework my texts in gen alpha lingo. Emphasise the use of words such as 'bussin','straight up','was like','ratiod','for real','no cap','yapping', 'boomer', 'fanum tax', 'alpha', 'rizz', 'rizzler', 'gyat', 'skibidy', 'skibidy toilet', 'baby gronk','bussin', 'ohio', streamers lingo and similar. You should seek to include as many of gen alpha phrases as possible. Boomers need not understand."
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
            break;
    }
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
                "messages": initialPrompt
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

