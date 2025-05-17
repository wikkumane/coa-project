const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const orders = [];

app.post('/order', (req, res) => {
    const { user, localId, items } = req.body;
    const order = {
        user,
        localId,
        items,
        status: 'pending',
    }

    orders.push(order);
    res.status(201).json(order);
});

app.get('/orders', (req, res) => {
    res.json(orders);
});

const port = process.env.PORT || 3003;
app.listen(port, () => {
    console.log(`Order Service is running on port ${port}`);
});