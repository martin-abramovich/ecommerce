const express = require('express');
const path = require('path');

const app = express();

const publicPaht = path.resolve(__dirname, './public');
app.use(express.static(publicPaht));

app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000');
});

app.get('/', (req,res) => {
res.sendFile(path.resolve(__dirname, './views/home.html'));})
