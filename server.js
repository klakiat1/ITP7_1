const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/capture', (req, res) => {
    const movements = req.body.movements;
    const analysisResults = analyzeMouseData(movements);
    console.log(analysisResults);  // Log analysis for now

    // Send back analysis result, could be more detailed
    res.status(200).json({ message: analysisResults.isHuman ? 'Human' : 'Bot' });
});

function analyzeMouseData(data) {
    if (data.length < 2) {
        return { isHuman: false, reason: "Insufficient data" };
    }

    let speedChanges = 0;
    let lastDistance = 0;
    let lastTime = data[0].time;
    let directionChanges = 0;
    let lastDirection = null;
    let dwellTimes = 0;

    // Initialize the first speed calculation
    let speed = 0; // Define speed here to ensure it is accessible throughout

    for (let i = 1; i < data.length; i++) {
        const dx = data[i].x - data[i-1].x;
        const dy = data[i].y - data[i-1].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const timeDiff = data[i].time - lastTime;

        if (timeDiff > 0) {  // Avoid division by zero
            speed = distance / timeDiff; // Calculate speed and update it here
            if (Math.abs(speed - lastDistance) > 5) { // Use a practical threshold
                speedChanges++;
            }
            lastDistance = speed;
            lastTime = data[i].time;
        }

        // Calculate direction
        const direction = Math.atan2(dy, dx);
        if (lastDirection !== null && Math.abs(direction - lastDirection) > 0.1) { // Set a threshold for direction change
            directionChanges++;
        }
        lastDirection = direction;

        // Calculate dwell times if speed is very low
        if (speed < 0.1) { dwellTimes++; }
    }

    return {
        isHuman: true, // Placeholder value, implement your own logic here
        speedChanges: speedChanges,
        directionChanges: directionChanges,
        dwellTimes: dwellTimes
    };
}


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
