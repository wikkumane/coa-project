const express = require('express');
const cors = require('cors');


const app = express(); 
app.use(express.json());
app.use(cors());

const locals = [
    {
        id: 1,
        name: 'Dukat',
        menu: [
            { id: 1, name: 'Corba', price: 250 },
            { id: 2, name: 'Tikvicki', price: 150 }
        ]
    },
    {
        id: 2,
        name: 'Destan',
        menu: [
            { id: 1, name: 'Kebapi', price: 12 },
            { id: 2, name: 'Sharska', price: 350 }
        ]
    },
    {
        id: 3,
        name: 'Sushico',
        menu: [
            { id: 1, name: 'Rakcinja', price: 600 },
            { id: 2, name: 'Patka', price: 900 }
        ]
    }
]; 

app.get('/locals', (req, res) => {
    res.json(locals);
}); 

app.get('/locals/:id', (req, res) => {
    const local = locals.find(l => l.id === parseInt(req.params.id));
    if (!local) {
        return res.status(404).send('Local not found');
    }
    res.json(local);
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Locals Service is running on port ${PORT}`);
});