// Function to replace all occurrences of a string in text
function replaceText(node) {
    if (node.nodeType === Node.TEXT_NODE) {
        node.nodeValue = node.nodeValue.replace(/\band\b/g, 'rizz');
    } else if (node.nodeType === Node.ELEMENT_NODE) {
        // Recursively call replaceText on child nodes
        node.childNodes.forEach(replaceText);
    }
}

// Replace 'and' with 'rizz' in the entire document
replaceText(document.body);