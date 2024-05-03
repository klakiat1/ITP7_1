let mouseEvents = [];
document.addEventListener('mousemove', (event) => {
    mouseEvents.push({
        x: event.clientX,
        y: event.clientY,
        time: Date.now()
    });

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
        console.log('Success:', data);
        if (data.message === 'Human') {
            document.getElementById('message').style.display = 'block'; // Show message if human
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// Show message after 5 seconds of the first mouse move
document.addEventListener('mousemove', () => {
    setTimeout(() => {
        const messageElement = document.getElementById('message');
        messageElement.style.display = 'block';  // Show the message
    }, 5000);  // Delay of 5000 milliseconds (5 seconds)
}, { once: true });
