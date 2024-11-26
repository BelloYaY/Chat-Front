// DOM Elements
const chatBox = document.getElementById('chat-box');
const chatInput = document.getElementById('chat-input');
const sendButton = document.getElementById('send-btn');

// Utility function to add a message
function addMessage(content, isSent = true) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', isSent ? 'sent' : 'received');
    messageDiv.textContent = content;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to bottom
}

// Handle sending a message
function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
        addMessage(message, true); // User's message
        chatInput.value = ''; // Clear input
        // Simulate a response after 1 second
        setTimeout(() => {
            addMessage(" I've received your message!", false);
        }, 1000);
    }
}

// Send message on button click
sendButton.addEventListener('click', sendMessage);

// Send message on Enter key press
chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
