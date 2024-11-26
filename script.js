// Initialize socket connection to the backend
const socket = io("https://chat-back-04cv.onrender.com");  // Make sure this matches your backend URL

// Wait for the connection to be established
socket.on('connect', () => {
    console.log('Connected to the backend!');
});

// Listen for incoming messages and update the chat window
socket.on('receive-message', (message) => {
    console.log('Message received:', message);

    // Get the chat window where the messages will be displayed
    const chatBox = document.getElementById('chatBox');
    
    // Create a new message element and append it to the chat box
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.textContent = message;

    chatBox.appendChild(messageElement);
    
    // Scroll the chat box to the bottom so the latest message is visible
    chatBox.scrollTop = chatBox.scrollHeight;
});

// Function to send a message when the "Send" button is clicked
function sendMessage() {
    // Get the message input field
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value;

    // If the message isn't empty, send it via Socket.IO
    if (message.trim() !== "") {
        // Emit the message to the backend
        socket.emit('send-message', message);
        
        // Display the message in the chat window
        const chatBox = document.getElementById('chatBox');
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'sent');
        messageElement.textContent = message;
        chatBox.appendChild(messageElement);
        
        // Scroll the chat box to the bottom
        chatBox.scrollTop = chatBox.scrollHeight;

        // Clear the input field after sending the message
        messageInput.value = "";
    }
}

// Optional: Listen for pressing "Enter" to send the message
document.getElementById('messageInput').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});
