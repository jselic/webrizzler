function callOpenAI() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://openai-proxy.sellestial.com/api/completions', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer bufeh5byo4y5'); // Replace with your actual API token

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            var response = JSON.parse(xhr.responseText);
            var ai_content = response.choices[0].message.content;
            console.log("AI:");
            console.log(ai_content);
        } else {
            console.error('Request failed with status:', xhr.status);
        }
    };

    xhr.onerror = function () {
        console.error('Request failed');
    };

    var messages = [
        {
            "role": "system",
            "content": "You are a helpful assistant."
        }
    ];

    var user_message = "generate me an interesting story about oranges"; // Set the desired prompt here
    messages.push({
        "role": "user",
        "content": user_message
    });

    var params = JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: messages
    });

    xhr.send(params);
}

callOpenAI();