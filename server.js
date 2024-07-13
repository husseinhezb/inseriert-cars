const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const dataFilePath = path.join(__dirname, 'data.json');

function readData() {
    if (!fs.existsSync(dataFilePath)) {
        return { cars: [], newCars: [], periods: [], totalEarnings: 0, currentPeriodIndex: null };
    }
    const data = fs.readFileSync(dataFilePath);
    return JSON.parse(data);
}

function writeData(data) {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

app.get('/api/data', (req, res) => {
    const data = readData();
    res.json(data);
});

app.post('/api/data', (req, res) => {
    const data = req.body;
    writeData(data);
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
