const express = require('express');
const noteModel = require('./model/notes.model')
const app = express();
app.use(express.json())
app.post('/notes',async (req, res) => {
    const {title, description} = req.body;
    const newNotes = await noteModel.create({title, description})// creating new notes
    res.status(201).json({
        message: "note create succesfuly",
        newNotes
    })
});

app.get('/notes',async (req, res) => {
    const notes = await noteModel.find();// find method always return data in array of object
    res.status(200).json({
        message: "note fetch",
        notes
    })
})
// app.get('/notes', (req, res) => {
//     res.send(notes)
// })
module.exports = app;