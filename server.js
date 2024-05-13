const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;
app.get('/favicon.ico', (req, res) => res.status(204).end());

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
    let directionChanges = 0;
    let lastPosition = data[0];
    let speeds = [];
    let angles = [];

    for (let i = 1; i < data.length; i++) {
        const dx = data[i].x - lastPosition.x;
        const dy = data[i].y - lastPosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const timeDiff = (data[i].time - lastPosition.time) / 1000; // Time in seconds

        if (timeDiff > 0) {
            const speed = distance / timeDiff;
            speeds.push(speed);
            // Calculate direction change in degrees
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);
            angles.push(angle);

            // Detecting speed change
            if (i > 1 && Math.abs(speed - speeds[i - 2]) > 1) { // More sensitive threshold
                speedChanges++;
            }

            // Detecting direction change
            if (i > 1 && Math.abs(angle - angles[i - 2]) > 10) { // More sensitive threshold
                directionChanges++;
            }
        }

        lastPosition = data[i];
    }

    // Analyze overall speed and angle variances
    const avgSpeed = speeds.reduce((a, b) => a + b, 0) / speeds.length;
    const speedVariance = speeds.reduce((a, b) => a + (b - avgSpeed) ** 2, 0) / speeds.length;
    const isHuman = speedVariance > 1 && directionChanges > 5; // Example logic for determining human-like behavior

    return {
        isHuman,
        speedChanges,
        directionChanges,
        avgSpeed,
        speedVariance
    };
}


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
