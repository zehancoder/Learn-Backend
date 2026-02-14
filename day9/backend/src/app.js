const express = require("express");
const connectTodb = require("./config/database");
const cors = require("cors");
const noteModel = require("./model/notes.model");
const path = require('path')
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('./public'))
connectTodb();
app.post("/notes", async (req, res) => {
  const { title, description } = req.body;
  const newNote = await noteModel.create({ title, description });
  noteModel;
  res.status(201).json({
    message: "new note crate success",
    newNote,
  });
});

app.get("/notes", async (req, res) => {
  const note = await noteModel.find();
  res.send(note);
});
app.patch("/notes/:id",async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;
  const afterUpdate = await noteModel.findByIdAndUpdate(id, {title, description});
  res.status(200).json({
    message: "update success",
    afterUpdate
  })
});
app.delete('/notes/:id', async(req, res) => {
    const id = req.params.id;
    const deletedData = await noteModel.findByIdAndDelete(id);
    res.status(200).json({
        message: "delete succes",
        deletedData
    })
})
// make wild card for response index.html in any path like http://localhost:3000/
app.use('*name',  (req, res) => {
  res.sendFile(path.join(__dirname,'..','/public/index.html'))
})

module.exports = app;
