const express = require('express');
const app = express();

app.use(express.json())
const notes = [];
app.get('/', (req, res) => {
    res.send('hello world')
});

app.post('/notes', (req, res) => {
    notes.push(req.body)
    res.status(201).json({
        notes: notes
    })
})
app.get('/notes', (req, res) => {
    res.send(notes);
});

app.patch('/notes/:index', (req, res) => {
    notes[req.params.index].description = req.body.description;
    res.status(200)
})
app.delete('/notes/:index', (req, res) => {
    delete notes[req.params.index]
    res.status(204);
    
})

module.exports = app;