const express = require("express");
const app = express();
app.use(express.json());/// use this for accessing data
const noteModel = require("./model/notes.model");
const cors = require("cors");
app.use(cors());// use it for accessing apis from another website like I wnat to get api from locahost:3000 in frontend localhost:5173
// it's give me solution for accessing api from 1 website to another website
/// create new notes using noteModel.create({});

app.post("/notes", async (req, res) => {
  const { title, description } = req.body;
  const note = await noteModel.create({
    title,
    description,
  });
  res.status(201).json({
    message: "new note create",
    note,
  });
});
// geeting notes using noteModle.find()
// find always return a array
app.get("/notes", async (req, res) => {
  const noteFromdb = await noteModel.find();
  res.status(200).json({
    message: "all notes from db",
    noteFromdb,
  });
});
/// delete notes using id from params findByIdAndDelete(id)
app.delete("/notes/:id", async (req, res) => {
  const id = req.params.id; // geeting params id
  console.log(id);
  const newModel = await noteModel.findByIdAndDelete(id); // use findByIdAndDelete(id) for delete any single data from database using id
  res.status(200).json({
    message: id,
    newModel,
  });
});
// update notes using id from findByIdAndUpdate(id, {description}); description is new description
app.patch("/notes/:id", async (req, res) => {
  const id = req.params.id;
  const { description } = req.body;
  const updateNotes = await noteModel.findByIdAndUpdate(id, { description });
  res.status(200).json({
    message: "update succes",
    updateNotes,
  });
  console.log(updateNotes);
});
module.exports = app;
