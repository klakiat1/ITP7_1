let mouseEvents = [];
document.addEventListener('mousemove', (event) => {
    mouseEvents.push({
        x: event.clientX,
        y: event.clientY,
        time: Date.now()
    });
    console.log("Mouse event captured:", event.clientX, event.clientY); // Log each mouse move coordinates
    // Send data every 100 movements or every 10 seconds
    if (mouseEvents.length >= 100) {
        sendDataToServer(mouseEvents);
        mouseEvents = []; // Reset the array after sending
    }
});

function sendDataToServer(data) {
    fetch('http://localhost:3000/capture', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ movements: data })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Response from server:", data); // Log the response from the server
        if (data.message === 'Human') {
            document.getElementById('message').style.display = 'block'; // Show message if human
        }
    })
    .catch((error) => {
        console.error("Error sending data:", error); // Log any errors in the fetch operation
    });
}


// Show message after 5 seconds of the first mouse move
document.addEventListener('mousemove', () => {
    setTimeout(() => {
        const messageElement = document.getElementById('message');
        messageElement.style.display = 'block';  // Show the message
    }, 2000);  // Delay of 2000 milliseconds (1 seconds)
}, { once: true });
