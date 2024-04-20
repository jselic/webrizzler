function replaceText(node) {
    function replaceInChunk(text) {
        //TUKI SE KLIČE NA API
        return text.replace(/\bkilled\b/g, 'fanum taxed').replace(/\bworkers\b/g, 'sigmas');
    }

    function processChunk(text) {
        const tokens = text.split(/\s+/);
        let result = '';
        let chunk = '';

        for (let i = 0; i < tokens.length; i++) {
            chunk += tokens[i] + ' ';
            if (i % 50 === 49 || i === tokens.length - 1) {
                result += replaceInChunk(chunk);
                chunk = '';
            }
        }
        return result;
    }

    if (node.nodeType === Node.TEXT_NODE) {
        node.nodeValue = processChunk(node.nodeValue);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
        node.childNodes.forEach(replaceText);
    }
}

replaceText(document.body);