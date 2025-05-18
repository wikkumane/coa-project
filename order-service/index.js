const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());


const orders = [];

app.post('/orders', async (req, res) => {
    const { user, localId, items } = req.body;

    
    try {
        const response = await axios.get(`http://locals-service:3002/locals/${localId}`);
        const local = response.data;

        const order = {
            id: orders.length + 1,
            user,
            localId,
            items,
            localName: local.name,
            status: 'pending'
        };

        orders.push(order);
        
        await axios.post("http://notification-service:3004/notify", {
            message: `New order placed: ${order.id}`
        });

        res.status(201).json(order);
    } catch (error) {
        console.error("Error creating order:", error.message);
        res.status(400).json({ error: 'Failed to create order' });
    }
});


app.get('/orders', (req, res) => {
    res.json(orders);
});

const port = process.env.PORT || 3003;
app.listen(port, () => {
    console.log(`Order Service is running on port ${port}`);
});