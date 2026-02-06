const express = require('express');
const app = express();

const notes = [];

app.use(express.json())


app.post('/notes', (req, res) => {
    console.log(req.body);
    notes.push(req.body)
    res.send('note created');
    console.log(notes);
    

})
// get notes api
app.get('/notes', (req, res) => {
    res.send(notes)
});
// delete notes
app.delete('/notes/:index', (req, res) => { /// use delete for delete any data
   delete notes[req.params.index]
   console.log('note delete');
   res.send('note delete')
}) // delelte notes with indexses

// update notes
app.patch('/notes/:index', (req, res) => { // use patch for update any data
    notes[req.params.index].description = req.body.description;/// we make new description in postman body and after we save this description in notes[req.params.index].description
    notes[req.params.index].title = req.body.title;
    res.send('update note')
})

module.exports = app;