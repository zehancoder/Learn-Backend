const express = require("express");
const app = express();
app.use(express.json()); // middleware for accessing reading the req.body notes from postman
const notes = [];
app.post("/notes", (req, res) => {
  res.send("note created");
  console.log(req.body); // postman send a request ;
  notes.push(req.body)
});
app.get("/notes", (req, res) => {
  res.send(notes);
});

// start postman for sending and receive data
/// select method (Post)
// set url link localhost:3000
/// select body and select raw for make body object


app.listen(3000, () => {
  console.log("server is running");
});
