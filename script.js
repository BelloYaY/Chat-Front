// Connect to the backend using Socket.IO
const socket = io("https://chat-back-04cv.onrender.com"); // Replace with your backend URL

const chatBox = document.getElementById('chat-box');
const chatInput = document.getElementById('chat-input');
const sendButton = document.getElementById('send-btn');

// Add messages to the chat box
function addMessage(content, isSent = true) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', isSent ? 'sent' : 'received');
    messageDiv.textContent = content;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to bottom
}

// Send message to the server
function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
        addMessage(message, true); // Show the sent message
        socket.emit("send-message", message); // Send message to the server
        chatInput.value = ''; // Clear input
    }
}

// Listen for messages from the server
socket.on("receive-message", (message) => {
    addMessage(message, false); // Display received message
});

// Send message on button click
sendButton.addEventListener('click', sendMessage);

// Send message on Enter key press
chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
