const express = require('express');
const app = express()

app.use(express.json())

const notes = []
app.get('/', (req, res) => {
    res.send('home page')
});


module.exports = app;