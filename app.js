document.addEventListener('mousemove', (event) => {
    const data = {
        x: event.clientX,  // X coordinate of the mouse pointer
        y: event.clientY,  // Y coordinate of the mouse pointer
        timestamp: Date.now()
    };

    // Throttling the amount of data sent over by only sending data every 100 movements
    if (!window.sendDataCount || window.sendDataCount === 100) {
        fetch('http://localhost:3000/capture', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

        window.sendDataCount = 1;
    } else {
        window.sendDataCount += 1;
    }
});
