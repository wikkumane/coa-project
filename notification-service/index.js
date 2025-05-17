const express = require('express');
const app = express();

app.use(express.json());

app.post('/notify', (req, res) => {
    const { message } = req.body;
    console.log(`Notification: ${message}`);
    res.sendStatus(200);
});

app.listen(3004, () => {
    console.log('Notification Service is running on port 3004');
});