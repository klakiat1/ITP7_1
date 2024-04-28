const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/capture', (req, res) => {
    console.log('Mouse position at:', req.body.x, req.body.y, 'Timestamp:', req.body.timestamp);
    res.status(200).send('Data received');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
