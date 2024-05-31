# Silent Captcha System

## Overview
The Silent Captcha system is a web application designed to differentiate between human and bot users by analyzing mouse movements. The system captures mouse movement data on the client side, sends it to the server for analysis, and uses machine learning algorithms to determine if the user is a human or a bot.

## Features
- Real-time mouse movement capture and logging.
- Server-side analysis of mouse movement data.
- Four different machine learning algorithms for user classification:
  - Decision Tree Classifier
  - Random Forest Classifier
  - Naive Bayes Classifier
  - k-Nearest Neighbors (k-NN) Classifier
- Simple and user-friendly interface.

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Steps
1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/silent-captcha.git
    cd silent-captcha
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Run the server:
    ```sh
    node server.js
    ```

4. Open `index.html` in your browser to access the Silent Captcha demo.

## Project Structure
- `index.html`: The main HTML file for the web interface.
- `app.js`: JavaScript file for capturing mouse movements on the client side.
- `server.js`: Express server setup and mouse movement data analysis.
- `mouseTest.js`: Script for simulating mouse movements using Puppeteer for testing.
- `Algorithms Datasheet.txt`: Descriptions and code for the different machine learning algorithms used.

## Usage
1. Open the `index.html` file in your browser.
2. Start typing in the input field and move your mouse around.
3. The system will capture your mouse movements and send the data to the server for analysis.
4. If the system detects human-like behavior, it will display a message saying "You are not a robot."

## How It Works
1. **Client-Side**:
   - Mouse movements are captured using JavaScript and stored in an array.
   - The data is sent to the server after every 100 movements or every 10 seconds.
   - Example:
     ```javascript
     document.addEventListener('mousemove', (event) => {
         mouseEvents.push({ x: event.clientX, y: event.clientY, time: Date.now() });
         if (mouseEvents.length >= 100) sendDataToServer(mouseEvents);
     });
     ```

2. **Server-Side**:
   - The Express server receives the mouse movement data.
   - The `analyzeMouseData` function analyzes the data to detect human-like behavior.
   - Example:
     ```javascript
     app.post('/capture', (req, res) => {
         const movements = req.body.movements;
         const analysisResults = analyzeMouseData(movements);
         res.status(200).json({ message: analysisResults.isHuman ? 'Human' : 'Bot' });
     });
     ```

3. **Machine Learning Algorithms**:
   - Four different algorithms are implemented to analyze the mouse movement data:
     - Decision Tree
     - Random Forest
     - Naive Bayes
     - k-Nearest Neighbors
   - Example (Decision Tree):
     ```javascript
     const DecisionTree = require('decision-tree');
     const dt = new DecisionTree(features, labels);
     const result = dt.predict([testData.x, testData.y, testData.time]);
     res.status(200).json({ message: result });
     ```

4. **Testing**:
   - The `mouseTest.js` script uses Puppeteer to simulate mouse movements for testing the system.
   - Example:
     ```javascript
     const browser = await puppeteer.launch();
     const page = await browser.newPage();
     await page.goto('http://localhost:3000');
     await page.mouse.move(100, 100);
     ```

## Dependencies
- express
- body-parser
- cors
- puppeteer
- decision-tree
- random-forest
- naivebayes
- ml-knn

## Acknowledgments
- [Express](https://expressjs.com/)
- [Puppeteer](https://github.com/puppeteer/puppeteer)
- [decision-tree](https://www.npmjs.com/package/decision-tree)
- [random-forest](https://www.npmjs.com/package/random-forest)
- [naivebayes](https://www.npmjs.com/package/naivebayes)
- [ml-knn](https://www.npmjs.com/package/ml-knn)
